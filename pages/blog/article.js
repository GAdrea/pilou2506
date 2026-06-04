/**
 * Page article : affiche le contenu complet d'un article à partir de ?id=...
 * Le contenu est défini dans data/blog-data.js (champ content).
 */

const BASE_URL = '../..';

function getArticleId() {
    const params = new URLSearchParams(window.location.search);
    return params.get('id') || '';
}

function getArticles() {
    const list = window.BLOG_ARTICLES;
    return Array.isArray(list) ? list : [];
}

function findArticle(id) {
    return getArticles().find((a) => a.id === id);
}

function imageSrc(path) {
    if (!path) return '';
    if (path.startsWith('http://') || path.startsWith('https://') || path.startsWith('//')) return path;
    return BASE_URL + '/' + path.replace(/^\//, '');
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

function formatDate(dateStr) {
    if (!dateStr) return '';
    const d = new Date(dateStr);
    if (isNaN(d.getTime())) return dateStr;
    return d.toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' });
}

const COMMENTS_STORAGE_PREFIX = 'pilou_blog_comments_';

function getComments(articleId) {
    try {
        const raw = localStorage.getItem(COMMENTS_STORAGE_PREFIX + articleId);
        return raw ? JSON.parse(raw) : [];
    } catch {
        return [];
    }
}

function saveComments(articleId, comments) {
    localStorage.setItem(COMMENTS_STORAGE_PREFIX + articleId, JSON.stringify(comments));
}

function renderCommentsList(articleId) {
    const listEl = document.getElementById('commentsList');
    if (!listEl) return;

    const comments = getComments(articleId);
    listEl.innerHTML = '';

    if (comments.length === 0) {
        listEl.innerHTML = '<p class="text-slate-500 dark:text-slate-400 text-sm">Aucun commentaire pour le moment.</p>';
        return;
    }

    comments.forEach((c) => {
        const div = document.createElement('div');
        div.className = 'glass rounded-xl p-4 mb-3';
        const dateStr = c.date ? formatDate(c.date) : '';
        div.innerHTML = `
            <p class="font-bold text-sm">${escapeHtml(c.authorName)}</p>
            ${dateStr ? `<p class="text-xs text-slate-500 dark:text-slate-400 mb-2">${escapeHtml(dateStr)}</p>` : ''}
            <p class="text-slate-700 dark:text-slate-300 text-sm whitespace-pre-wrap">${escapeHtml(c.text)}</p>
        `;
        listEl.appendChild(div);
    });
}

function initComments(articleId) {
    renderCommentsList(articleId);

    const form = document.getElementById('commentForm');
    if (!form) return;

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const nameInput = document.getElementById('commentAuthorName');
        const textInput = document.getElementById('commentText');
        const name = (nameInput && nameInput.value || '').trim();
        const text = (textInput && textInput.value || '').trim();
        if (!name || !text) return;

        const comments = getComments(articleId);
        comments.unshift({
            id: Date.now(),
            authorName: name,
            text: text,
            date: new Date().toISOString().slice(0, 10),
        });
        saveComments(articleId, comments);

        if (nameInput) nameInput.value = '';
        if (textInput) textInput.value = '';
        renderCommentsList(articleId);
    });
}

function renderArticle(article) {
    const container = document.getElementById('articleContainer');
    if (!container) return;

    document.title = article.title + ' | Pilou - Portfolio';

    const imgSrc = imageSrc(article.image);
    const imgBlock = imgSrc
        ? `<div class="rounded-2xl overflow-hidden mb-8 shadow-xl"><img src="${imgSrc}" alt="${escapeHtml(article.title)}" class="w-full h-auto object-cover"></div>`
        : '';

    const dateBlock = article.date
        ? `<p class="text-slate-500 dark:text-slate-400 text-sm mb-6">${escapeHtml(formatDate(article.date))}</p>`
        : '';

    const content = (article.content || '').trim();
    const contentBlock = content ? `<div class="article-content">${content}</div>` : '';

    container.innerHTML = `
        <nav class="flex items-center flex-wrap gap-1 text-sm text-slate-500 dark:text-slate-400 mb-6" aria-label="Fil d'Ariane">
            <a href="../../index.html" class="hover:text-hibiscus transition">Accueil</a>
            <span class="opacity-40 mx-1">/</span>
            <a href="blog.html" class="hover:text-hibiscus transition">Blog</a>
            <span class="opacity-40 mx-1">/</span>
            <span class="text-slate-700 dark:text-slate-300 font-medium">${escapeHtml(article.title)}</span>
        </nav>
        <a href="blog.html" class="inline-flex items-center gap-2 text-hibiscus font-bold mb-8 hover:underline">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
            </svg>
            Retour au blog
        </a>
        ${imgBlock}
        <h1 class="text-4xl md:text-5xl font-bold mb-4">${escapeHtml(article.title)}</h1>
        ${dateBlock}
        ${contentBlock}
        <section class="mt-16 pt-10 border-t border-slate-200 dark:border-slate-700" id="commentsSection">
            <h2 class="text-2xl font-bold mb-6">Commentaires</h2>
            <form id="commentForm" class="glass rounded-2xl p-6 mb-8 space-y-4">
                <div>
                    <label for="commentAuthorName" class="block text-xs font-bold uppercase text-slate-400 mb-2">Nom</label>
                    <input type="text" id="commentAuthorName" required placeholder="Votre nom" class="w-full bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 rounded-xl p-4 focus:border-hibiscus outline-none transition">
                </div>
                <div>
                    <label for="commentText" class="block text-xs font-bold uppercase text-slate-400 mb-2">Commentaire</label>
                    <textarea id="commentText" rows="4" required placeholder="Votre message..." class="w-full bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 rounded-xl p-4 focus:border-hibiscus outline-none transition"></textarea>
                </div>
                <button type="submit" class="bg-hibiscus text-white font-bold py-3 px-8 rounded-xl hover:brightness-110 transition">Publier</button>
            </form>
            <div id="commentsList"></div>
        </section>
    `;

    initComments(article.id);
}

function renderNotFound() {
    const container = document.getElementById('articleContainer');
    if (!container) return;

    document.title = 'Article non trouvé | Pilou - Portfolio';

    container.innerHTML = `
        <div class="text-center py-16">
            <h1 class="text-2xl font-bold mb-4">Article non trouvé</h1>
            <p class="text-slate-500 dark:text-slate-400 mb-8">L'article demandé n'existe pas ou a été supprimé.</p>
            <a href="blog.html" class="inline-block bg-hibiscus text-white font-bold py-3 px-8 rounded-xl hover:brightness-110 transition">Retour au blog</a>
        </div>
    `;
}

document.addEventListener('DOMContentLoaded', () => {
    const id = getArticleId();
    const article = id ? findArticle(id) : null;

    if (article) {
        renderArticle(article);
    } else {
        renderNotFound();
    }
});
