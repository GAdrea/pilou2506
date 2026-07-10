#!/usr/bin/env node
/* ============================================================
   notify-discord.js — Notifie un webhook Discord à chaque
   nouvel article détecté dans data/blog-data.js.

   Déclenché par .github/workflows/notify-discord-new-article.yml
   à chaque push sur main qui touche data/blog-data.js.

   Logique :
   1. Charge la version ACTUELLE de data/blog-data.js (après le push)
   2. Charge la version AVANT le push (via `git show <BASE_SHA>:...`)
   3. Compare les `id` d'articles entre les deux
   4. Envoie un embed Discord pour chaque id apparu (= nouvel article)

   Variables d'environnement attendues :
   - DISCORD_WEBHOOK_URL : URL du webhook (secret GitHub, obligatoire)
   - BASE_SHA            : commit avant le push (github.event.before)
   - SITE_URL            : domaine du site (optionnel, valeur par défaut ci-dessous)
   - DRY_RUN             : si "1", affiche le payload au lieu de l'envoyer
                            (utile pour tester sans webhook réel)
   ============================================================ */

'use strict';

const fs = require('fs');
const path = require('path');
const vm = require('vm');
const https = require('https');
const { execSync } = require('child_process');

const ROOT = path.resolve(__dirname, '..');
const SITE_URL = (process.env.SITE_URL || 'https://pilou2506.vercel.app').replace(/\/$/, '');
const WEBHOOK_URL = process.env.DISCORD_WEBHOOK_URL;
const BASE_SHA = process.env.BASE_SHA;
const DRY_RUN = process.env.DRY_RUN === '1';

const ArticleRender = require(path.join(ROOT, 'pages/blog/article-render.js'));

if (!WEBHOOK_URL && !DRY_RUN) {
    console.error('❌ DISCORD_WEBHOOK_URL manquant. Configure le secret GitHub, ou lance avec DRY_RUN=1 pour tester.');
    process.exit(1);
}

// ─── Parsing de data/blog-data.js (window.BLOG_ARTICLES = [...]) ─────────

function parseArticles(code) {
    const sandbox = { window: {}, console };
    vm.createContext(sandbox);
    vm.runInContext(code, sandbox, { filename: 'blog-data.js' });
    return Array.isArray(sandbox.window.BLOG_ARTICLES) ? sandbox.window.BLOG_ARTICLES : [];
}

function getCurrentArticles() {
    const code = fs.readFileSync(path.join(ROOT, 'data/blog-data.js'), 'utf8');
    return parseArticles(code);
}

function getPreviousArticles(baseSha) {
    try {
        const code = execSync(`git show ${baseSha}:data/blog-data.js`, { cwd: ROOT, encoding: 'utf8' });
        return parseArticles(code);
    } catch (err) {
        return null; // fichier absent avant, ou commit de base indisponible
    }
}

// ─── Détection des nouveaux articles ──────────────────────────────────────

if (!BASE_SHA || /^0+$/.test(BASE_SHA)) {
    console.log("ℹ️  Pas de commit de base exploitable (premier push / force-push) — aucune notification, pour éviter de spammer sur tous les articles existants.");
    process.exit(0);
}

const current = getCurrentArticles();
const previous = getPreviousArticles(BASE_SHA);

if (previous === null) {
    console.log("ℹ️  Impossible de lire la version précédente de blog-data.js — aucune notification envoyée par sécurité.");
    process.exit(0);
}

const previousIds = new Set(previous.map(a => a.id));
const newArticles = current.filter(a => !previousIds.has(a.id));

if (newArticles.length === 0) {
    console.log("ℹ️  Aucun nouvel article détecté (modification d'un article existant, probablement).");
    process.exit(0);
}

console.log(`📰 ${newArticles.length} nouvel(aux) article(s) détecté(s) : ${newArticles.map(a => a.id).join(', ')}`);

// ─── Construction du message Discord ──────────────────────────────────────

function articleUrl(article) {
    return `${SITE_URL}/pages/blog/articles/${ArticleRender.slugify(article.id)}.html`;
}

function absoluteImageUrl(article) {
    if (!article.image) return null;
    if (article.image.startsWith('http')) return article.image;
    return `${SITE_URL}/${article.image.replace(/^\//, '')}`;
}

const embeds = newArticles.slice(0, 10).map(article => {
    const embed = {
        title: article.title,
        url: articleUrl(article),
        description: (article.description || '').slice(0, 300),
        color: 0x00d4ff, // neonCyan de la charte graphique
        fields: [],
    };
    if (article.category) {
        embed.fields.push({ name: 'Catégorie', value: article.category, inline: true });
    }
    if (article.date) {
        const d = new Date(article.date);
        if (!isNaN(d.getTime())) embed.timestamp = d.toISOString();
    }
    const img = absoluteImageUrl(article);
    if (img) embed.image = { url: img };
    return embed;
});

const payload = {
    content: newArticles.length === 1
        ? '📰 **Nouvel article en ligne !**'
        : `📰 **${newArticles.length} nouveaux articles en ligne !**`,
    embeds,
};

if (DRY_RUN) {
    console.log('🧪 DRY_RUN=1 — payload qui aurait été envoyé à Discord :');
    console.log(JSON.stringify(payload, null, 2));
    process.exit(0);
}

// ─── Envoi effectif au webhook ─────────────────────────────────────────────

const data = JSON.stringify(payload);
const url = new URL(WEBHOOK_URL);

const req = https.request({
    hostname: url.hostname,
    path: url.pathname + url.search,
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(data),
    },
}, (res) => {
    let body = '';
    res.on('data', chunk => { body += chunk; });
    res.on('end', () => {
        if (res.statusCode >= 200 && res.statusCode < 300) {
            console.log(`✅ Notification Discord envoyée (HTTP ${res.statusCode}).`);
        } else {
            console.error(`❌ Discord a répondu HTTP ${res.statusCode} : ${body}`);
            process.exit(1);
        }
    });
});

req.on('error', (err) => {
    console.error('❌ Erreur réseau vers Discord :', err.message);
    process.exit(1);
});

req.write(data);
req.end();
