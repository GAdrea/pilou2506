/* ============================================================
   article.js — Page article complète
   Inclut : prev/next, partage, temps de lecture,
            barre de progression, articles similaires, HUD comments
   ============================================================ */

const BASE_URL = '../..';

// ─── Helpers ─────────────────────────────────────────────────

function getArticleId() {
    return new URLSearchParams(window.location.search).get('id') || '';
}

function getArticles() {
    const list = window.BLOG_ARTICLES;
    if (!Array.isArray(list)) return [];
    return [...list].sort((a, b) => {
        if (!a.date) return 1;
        if (!b.date) return -1;
        return new Date(b.date) - new Date(a.date);
    });
}

function findArticle(id) {
    return getArticles().find(a => a.id === id) || null;
}

function imageSrc(path) {
    if (!path) return '';
    if (path.startsWith('http') || path.startsWith('//')) return path;
    return BASE_URL + '/' + path.replace(/^\//, '');
}

function escapeHtml(text) {
    const d = document.createElement('div');
    d.textContent = text;
    return d.innerHTML;
}

function formatDate(dateStr) {
    if (!dateStr) return '';
    const d = new Date(dateStr);
    return isNaN(d.getTime()) ? '' : d.toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' });
}

function readingTime(content) {
    if (!content) return '1 min';
    const words = content.replace(/<[^>]+>/g, ' ').trim().split(/\s+/).length;
    return Math.max(1, Math.round(words / 200)) + ' min';
}

// ─── Barre de progression ─────────────────────────────────────

function initProgressBar() {
    const bar = document.createElement('div');
    bar.id = 'readProgress';
    bar.style.cssText = 'position:fixed;top:0;left:0;height:3px;width:0%;z-index:9999;background:linear-gradient(90deg,#00d4ff,#ff4d6d);transition:width 0.1s linear;';
    document.body.prepend(bar);

    window.addEventListener('scroll', () => {
        const doc = document.documentElement;
        const scrolled = doc.scrollTop;
        const total = doc.scrollHeight - doc.clientHeight;
        bar.style.width = total > 0 ? (scrolled / total * 100) + '%' : '0%';
    }, { passive: true });
}

// ─── Navigation prev / next ───────────────────────────────────

function getPrevNext(articleId) {
    const articles = getArticles();
    const idx = articles.findIndex(a => a.id === articleId);
    return {
        prev: idx > 0 ? articles[idx - 1] : null,           // plus récent
        next: idx < articles.length - 1 ? articles[idx + 1] : null  // plus ancien
    };
}

function renderPrevNext(articleId) {
    const { prev, next } = getPrevNext(articleId);
    if (!prev && !next) return '';

    const card = (a, direction) => {
        if (!a) return `<div></div>`;
        const label = direction === 'prev' ? '← Plus récent' : 'Plus ancien →';
        const align = direction === 'prev' ? 'text-left' : 'text-right';
        return `
        <a href="article.html?id=${encodeURIComponent(a.id)}"
           class="hud-card p-4 flex-1 min-w-0 hover:border-neonCyan transition group block ${align}">
            <p class="text-xs text-slate-500 mb-1">${label}</p>
            <p class="text-sm font-bold text-slate-200 group-hover:text-neonCyan transition line-clamp-2">${escapeHtml(a.title)}</p>
        </a>`;
    };

    return `
    <nav class="mt-16 pt-10 border-t border-slate-800">
        <div class="flex gap-4">
            ${card(prev, 'prev')}
            ${card(next, 'next')}
        </div>
    </nav>`;
}

// ─── Partage ──────────────────────────────────────────────────

function renderShare(title) {
    const encodedUrl   = encodeURIComponent(window.location.href);
    const encodedTitle = encodeURIComponent(title);
    return `
    <div class="mt-10 pt-8 border-t border-slate-800">
        <p class="text-xs text-slate-500 uppercase font-bold tracking-widest mb-4">Partager</p>
        <div class="flex flex-wrap gap-3">
            <a href="https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}"
               target="_blank" rel="noopener"
               class="inline-flex items-center gap-2 px-4 py-2 rounded text-sm font-medium border border-slate-700 text-slate-400 hover:border-neonCyan hover:text-neonCyan transition">
                <svg class="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.748l7.73-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
                Partager sur X
            </a>
            <button id="btnCopyLink"
               class="inline-flex items-center gap-2 px-4 py-2 rounded text-sm font-medium border border-slate-700 text-slate-400 hover:border-neonCyan hover:text-neonCyan transition">
                <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"/>
                </svg>
                <span id="copyLinkLabel">Copier le lien</span>
            </button>
        </div>
    </div>`;
}

function initCopyLink() {
    const btn   = document.getElementById('btnCopyLink');
    const label = document.getElementById('copyLinkLabel');
    if (!btn || !label) return;
    btn.addEventListener('click', () => {
        navigator.clipboard.writeText(window.location.href).then(() => {
            label.textContent = '✅ Lien copié !';
            setTimeout(() => { label.textContent = 'Copier le lien'; }, 2000);
        });
    });
}

// ─── Articles similaires ──────────────────────────────────────

function renderRelated(currentId, category) {
    const articles = getArticles();
    const related = articles
        .filter(a => a.id !== currentId && a.category === category)
        .slice(0, 3);

    if (related.length === 0) return '';

    const cards = related.map(a => {
        const img = imageSrc(a.image);
        return `
        <a href="article.html?id=${encodeURIComponent(a.id)}"
           class="hud-card group flex flex-col overflow-hidden hover:border-neonCyan transition">
            ${img ? `<div class="h-32 overflow-hidden">
                <img src="${img}" alt="${escapeHtml(a.title)}" class="w-full h-full object-cover group-hover:scale-110 transition duration-500" loading="lazy">
            </div>` : ''}
            <div class="p-4">
                <p class="text-sm font-bold leading-snug group-hover:text-neonCyan transition">${escapeHtml(a.title)}</p>
                <p class="text-xs text-slate-500 mt-1">${formatDate(a.date)}</p>
            </div>
        </a>`;
    }).join('');

    return `
    <section class="mt-16 pt-10 border-t border-slate-800">
        <p class="text-xs text-slate-500 uppercase font-bold tracking-widest mb-6">Dans la même catégorie</p>
        <div class="grid sm:grid-cols-3 gap-4">${cards}</div>
    </section>`;
}

// ─── Commentaires (HUD) ───────────────────────────────────────

const COMMENTS_KEY = 'pilou_blog_comments_';

function getComments(id) {
    try { return JSON.parse(localStorage.getItem(COMMENTS_KEY + id) || '[]'); }
    catch { return []; }
}

function saveComments(id, list) {
    localStorage.setItem(COMMENTS_KEY + id, JSON.stringify(list));
}

function renderCommentsList(id) {
    const el = document.getElementById('commentsList');
    if (!el) return;
    const list = getComments(id);
    if (list.length === 0) {
        el.innerHTML = '<p class="text-sm text-slate-500">Aucun commentaire pour le moment. Sois le premier !</p>';
        return;
    }
    el.innerHTML = list.map(c => `
        <div class="hud-card p-4 mb-3">
            <div class="flex items-center justify-between mb-2">
                <span class="text-sm font-bold" style="color:#00d4ff">${escapeHtml(c.authorName)}</span>
                ${c.date ? `<span class="text-xs text-slate-500">${escapeHtml(formatDate(c.date))}</span>` : ''}
            </div>
            <p class="text-sm text-slate-300 whitespace-pre-wrap">${escapeHtml(c.text)}</p>
        </div>`).join('');
}

function initComments(id) {
    renderCommentsList(id);
    const form = document.getElementById('commentForm');
    if (!form) return;
    form.addEventListener('submit', e => {
        e.preventDefault();
        const name = (document.getElementById('commentAuthorName')?.value || '').trim();
        const text = (document.getElementById('commentText')?.value || '').trim();
        if (!name || !text) return;
        const list = getComments(id);
        list.unshift({ id: Date.now(), authorName: name, text, date: new Date().toISOString().slice(0, 10) });
        saveComments(id, list);
        form.reset();
        renderCommentsList(id);
    });
}

// ─── Render principal ─────────────────────────────────────────

function renderArticle(article) {
    const container = document.getElementById('articleContainer');
    if (!container) return;

    document.title = article.title + ' | Pilou - Portfolio';

    const img       = imageSrc(article.image);
    const date      = formatDate(article.date);
    const time      = readingTime(article.content);
    const cat       = article.category || '';
    const content   = (article.content || '').trim();

    container.innerHTML = `
        <!-- Fil d'Ariane -->
        <div class="flex items-center gap-2 text-sm text-slate-500 mb-10">
            <a href="blog.html" class="hover:text-neonCyan transition">Blog</a>
            <span>/</span>
            ${cat ? `<span style="color:#00d4ff">${escapeHtml(cat)}</span><span>/</span>` : ''}
            <span class="text-slate-400 truncate max-w-xs">${escapeHtml(article.title)}</span>
        </div>

        <!-- Image hero -->
        ${img ? `<div class="rounded-xl overflow-hidden mb-8 aspect-video">
            <img src="${img}" alt="${escapeHtml(article.title)}" class="w-full h-full object-cover">
        </div>` : ''}

        <!-- En-tête article -->
        <header class="mb-8">
            ${cat ? `<span class="inline-block px-3 py-1 text-xs font-bold rounded mb-4"
                style="background:rgba(0,212,255,0.15);border:1px solid rgba(0,212,255,0.4);color:#00d4ff">${escapeHtml(cat)}</span>` : ''}
            <h1 class="text-3xl md:text-4xl font-bold leading-tight mb-4">${escapeHtml(article.title)}</h1>
            <div class="flex flex-wrap items-center gap-4 text-sm text-slate-500">
                ${date ? `<span>📅 ${date}</span>` : ''}
                <span>⏱ ${time} de lecture</span>
                <a href="blog.html" class="ml-auto text-hibiscus hover:underline font-medium">← Retour au blog</a>
            </div>
        </header>

        <!-- Contenu -->
        <div class="article-content prose-pilou">${content}</div>

        <!-- Partage -->
        ${renderShare(article.title)}

        <!-- Articles similaires -->
        ${renderRelated(article.id, cat)}

        <!-- Prev / Next -->
        ${renderPrevNext(article.id)}

        <!-- Commentaires -->
        <section class="mt-16 pt-10 border-t border-slate-800" id="commentsSection">
            <p class="text-xs text-slate-500 uppercase font-bold tracking-widest mb-6">Commentaires</p>
            <form id="commentForm" class="hud-card p-6 mb-8 space-y-4">
                <div class="grid md:grid-cols-2 gap-4">
                    <div>
                        <label class="hud-label" for="commentAuthorName">Nom</label>
                        <input type="text" id="commentAuthorName" required placeholder="Votre nom" class="hud-input" />
                    </div>
                </div>
                <div>
                    <label class="hud-label" for="commentText">Commentaire</label>
                    <textarea id="commentText" rows="4" required placeholder="Votre réaction..." class="hud-input"></textarea>
                </div>
                <button type="submit" class="hud-btn hud-btn-primary">Publier</button>
            </form>
            <div id="commentsList"></div>
        </section>
    `;

    initComments(article.id);
    initCopyLink();
}

function renderNotFound() {
    const container = document.getElementById('articleContainer');
    if (!container) return;
    document.title = 'Article non trouvé | Pilou - Portfolio';
    container.innerHTML = `
        <div class="text-center py-24">
            <p class="text-6xl mb-6">404</p>
            <h1 class="text-2xl font-bold mb-4">Article introuvable</h1>
            <p class="text-slate-500 mb-8">L'article demandé n'existe pas.</p>
            <a href="blog.html" class="hud-btn hud-btn-primary">Retour au blog</a>
        </div>`;
}

// ─── Init ─────────────────────────────────────────────────────

document.addEventListener('DOMContentLoaded', () => {
    initProgressBar();
    const id = getArticleId();
    const article = id ? findArticle(id) : null;
    article ? renderArticle(article) : renderNotFound();
});
