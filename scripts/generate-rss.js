#!/usr/bin/env node
/* ============================================================
   generate-rss.js — Génère rss.xml depuis data/blog-data.js

   Utilise le même pattern de chargement que generate-static-pages.js
   (vm sandbox avec window global) pour ne pas avoir à toucher
   la structure de blog-data.js.

   Usage : node scripts/generate-rss.js
   ============================================================ */

'use strict';

const fs   = require('fs');
const path = require('path');
const vm   = require('vm');

const ROOT     = path.resolve(__dirname, '..');
const SITE_URL = 'https://pilou2506.vercel.app';
const MAX_ITEMS = 20;

function loadWindowData(relPath) {
    const code    = fs.readFileSync(path.join(ROOT, relPath), 'utf8');
    const sandbox = { window: {}, console };
    vm.createContext(sandbox);
    vm.runInContext(code, sandbox, { filename: relPath });
    return sandbox.window;
}

function slugify(str) {
    return String(str || '')
        .normalize('NFD').replace(/[̀-ͯ]/g, '')
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '') || 'article';
}

function escapeXml(str) {
    return String(str || '')
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;');
}

const { BLOG_ARTICLES } = loadWindowData('data/blog-data.js');

if (!Array.isArray(BLOG_ARTICLES) || BLOG_ARTICLES.length === 0) {
    console.error('Aucun article trouvé dans blog-data.js');
    process.exit(1);
}

const items = [...BLOG_ARTICLES]
    .filter(a => a.date)
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, MAX_ITEMS);

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Pilou — Blog</title>
    <link>${SITE_URL}/pages/blog/blog.html</link>
    <description>Vibe coding, Japon, hôtellerie de luxe. Par Pilou depuis Fukuoka.</description>
    <language>fr-FR</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${SITE_URL}/rss.xml" rel="self" type="application/rss+xml"/>
${items.map(a => {
    const slug = slugify(a.id);
    const url  = `${SITE_URL}/pages/blog/articles/${slug}.html`;
    return `    <item>
      <title><![CDATA[${a.title || ''}]]></title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <pubDate>${new Date(a.date).toUTCString()}</pubDate>
      <description><![CDATA[${a.description || ''}]]></description>
    </item>`;
}).join('\n')}
  </channel>
</rss>
`;

const outPath = path.join(ROOT, 'rss.xml');
fs.writeFileSync(outPath, xml, 'utf8');
console.log(`✅ rss.xml généré (${items.length} articles) → ${outPath}`);
