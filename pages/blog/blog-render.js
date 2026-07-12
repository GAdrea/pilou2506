/* ============================================================
   blog-render.js — Rendu HTML de la liste du blog (module partagé)

   Même principe qu'article-render.js / project-render.js : fonctions
   pures, utilisées à la fois côté navigateur (blog.js, pour la
   recherche/filtres/pagination interactifs) et côté Node
   (scripts/generate-static-pages.js, qui pré-remplit blog.html avec
   la page 1 / catégorie "Tout" / sans recherche — l'état par défaut
   au chargement, pour que Google voie du contenu et des liens réels
   sans exécuter de JS).
   ============================================================ */

(function (root, factory) {
    if (typeof module === 'object' && module.exports) {
        module.exports = factory();
    } else {
        root.BlogRender = factory();
    }
}(typeof self !== 'undefined' ? self : this, function () {
    'use strict';

    const ARTICLES_PER_PAGE = 6;

    function escapeHtml(text) {
        if (text === null || text === undefined) return '';
        return String(text)
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#39;');
    }

    function formatDate(dateStr) {
        if (!dateStr) return '';
        const d = new Date(dateStr);
        return isNaN(d.getTime()) ? '' : d.toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' });
    }

    function readingTime(content) {
        if (!content) return '';
        const words = content.replace(/<[^>]+>/g, ' ').trim().split(/\s+/).filter(Boolean).length;
        return Math.max(1, Math.round(words / 200)) + ' min';
    }

    function sortedArticles(list) {
        if (!Array.isArray(list)) return [];
        return [...list].sort((a, b) => {
            if (!a.date) return 1;
            if (!b.date) return -1;
            return new Date(b.date) - new Date(a.date);
        });
    }

    function getCategories(articles) {
        const set = new Set();
        articles.forEach(a => { if (a.category) set.add(a.category); });
        return ['Tout', ...Array.from(set).sort()];
    }

    function filterArticles(articles, activeCategory, searchQuery) {
        const q = (searchQuery || '').toLowerCase();
        return articles.filter(a => {
            const matchCat = !activeCategory || activeCategory === 'Tout' || a.category === activeCategory;
            const matchSearch = !q
                || a.title.toLowerCase().includes(q)
                || (a.description || '').toLowerCase().includes(q);
            return matchCat && matchSearch;
        });
    }

    function create(ctx) {
        ctx = ctx || {};
        const baseUrl = ctx.baseUrl || '.';
        const hrefFor = ctx.hrefFor || function (id) { return encodeURIComponent(id) + '.html'; };

        function imageSrc(path) {
            if (!path) return '';
            if (path.startsWith('http') || path.startsWith('//')) return path;
            return baseUrl + '/' + path.replace(/^\//, '');
        }

        function renderFilterButton(cat, active) {
            const cls = active
                ? 'border-neonCyan text-neonCyan bg-neonCyan/10'
                : 'border-slate-700 text-slate-400 hover:border-neonCyan hover:text-neonCyan';
            return `<button type="button" data-category="${escapeHtml(cat)}" class="px-4 py-1.5 rounded text-sm font-medium border transition ${cls}">${escapeHtml(cat)}</button>`;
        }

        function renderFilters(articles, activeCategory) {
            return getCategories(articles)
                .map(cat => renderFilterButton(cat, cat === activeCategory))
                .join('');
        }

        function renderCard(article) {
            const imgSrc = imageSrc(article.image);
            const url = hrefFor(article.id);
            const date = formatDate(article.date);
            const time = readingTime(article.content);
            const cat = article.category || '';
            return `
        <article class="hud-card group flex flex-col">
            <a href="${url}" class="block flex-1 flex flex-col">
                <div class="h-48 overflow-hidden relative">
                    <img src="${imgSrc}" alt="${escapeHtml(article.title)}"
                         class="w-full h-full object-cover group-hover:scale-110 transition duration-500" loading="lazy">
                    ${cat ? `<span class="absolute top-3 left-3 px-2 py-0.5 text-xs font-bold rounded"
                        style="background:rgba(0,212,255,0.15);border:1px solid rgba(0,212,255,0.4);color:#00d4ff">${escapeHtml(cat)}</span>` : ''}
                </div>
                <div class="p-6 flex flex-col flex-1">
                    <h3 class="text-lg font-bold leading-snug mb-2">${escapeHtml(article.title)}</h3>
                    ${article.description ? `<p class="text-slate-400 text-sm flex-1 mb-4">${escapeHtml(article.description)}</p>` : ''}
                    <div class="flex items-center justify-between text-xs text-slate-400 mt-auto pt-3 border-t border-slate-800">
                        <span>${date}</span>
                        <span>${time} de lecture</span>
                    </div>
                </div>
            </a>
        </article>`;
        }

        function renderCards(pageArticles) {
            return pageArticles.map(renderCard).join('');
        }

        function renderPaginationButton(label, page, active, disabled) {
            const cls = active
                ? 'border-neonCyan text-neonCyan bg-neonCyan/10 cursor-default'
                : 'border-slate-700 text-slate-400 hover:border-neonCyan hover:text-neonCyan';
            const disabledCls = disabled ? ' opacity-30 pointer-events-none' : '';
            return `<button type="button" data-page="${page}" class="px-3 py-1.5 rounded text-sm font-medium border transition ${cls}${disabledCls}">${label}</button>`;
        }

        function renderPagination(totalArticles, currentPage) {
            const totalPages = Math.ceil(totalArticles / ARTICLES_PER_PAGE);
            if (totalPages <= 1) return { html: '', hidden: true };
            let html = renderPaginationButton('&#8592;', currentPage - 1, false, currentPage === 1);
            for (let i = 1; i <= totalPages; i++) {
                html += renderPaginationButton(String(i), i, i === currentPage, false);
            }
            html += renderPaginationButton('&#8594;', currentPage + 1, false, currentPage === totalPages);
            return { html, hidden: false };
        }

        function renderPage(articles, { activeCategory = 'Tout', searchQuery = '', page = 1 } = {}) {
            const filtered = filterArticles(articles, activeCategory, searchQuery);
            const start = (page - 1) * ARTICLES_PER_PAGE;
            const pageArticles = filtered.slice(start, start + ARTICLES_PER_PAGE);
            const pagination = renderPagination(filtered.length, page);
            return {
                count: `${filtered.length} article${filtered.length > 1 ? 's' : ''}`,
                filtersHtml: renderFilters(articles, activeCategory),
                cardsHtml: renderCards(pageArticles),
                paginationHtml: pagination.html,
                paginationHidden: pagination.hidden,
                isEmpty: filtered.length === 0
            };
        }

        return { imageSrc, renderFilters, renderCards, renderPagination, renderPage };
    }

    return {
        ARTICLES_PER_PAGE,
        escapeHtml,
        formatDate,
        readingTime,
        sortedArticles,
        getCategories,
        filterArticles,
        create
    };
}));
