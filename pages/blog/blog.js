/* ============================================================
   blog.js — Pagination, recherche, filtre catégories

   Le rendu HTML est délégué à blog-render.js (module partagé avec
   scripts/generate-static-pages.js, qui pré-remplit blog.html avec
   la page 1 au build, pour le SEO). Ce script réhydrate ensuite
   normalement au chargement (même état par défaut = pas de flash)
   et gère toute l'interactivité (recherche, filtres, pagination).
   ============================================================ */

const BASE_URL = '../..';

// — État global
let currentPage = 1;
let activeCategory = 'Tout';
let searchQuery = '';

function getArticles() {
    return window.BlogRender.sortedArticles(window.BLOG_ARTICLES);
}

function getRenderer() {
    return window.BlogRender.create({
        baseUrl: BASE_URL,
        hrefFor: (id) => 'articles/' + window.ArticleRender.slugify(id) + '.html'
    });
}

// ─── Render principal ─────────────────────────────────────────

function render() {
    const articles = getArticles();
    const result = getRenderer().renderPage(articles, { activeCategory, searchQuery, page: currentPage });

    const filtersEl = document.getElementById('blogFilters');
    const cardsEl = document.getElementById('blogCards');
    const emptyEl = document.getElementById('blogEmpty');
    const countEl = document.getElementById('blogCount');
    const paginationEl = document.getElementById('blogPagination');

    if (filtersEl) {
        filtersEl.innerHTML = result.filtersHtml;
        filtersEl.querySelectorAll('[data-category]').forEach(btn => {
            btn.addEventListener('click', () => {
                activeCategory = btn.dataset.category;
                currentPage = 1;
                render();
            });
        });
    }

    if (cardsEl) cardsEl.innerHTML = result.cardsHtml;
    if (emptyEl) emptyEl.classList.toggle('hidden', !result.isEmpty);
    if (countEl) countEl.textContent = result.count;

    if (paginationEl) {
        paginationEl.classList.toggle('hidden', result.paginationHidden);
        paginationEl.innerHTML = result.paginationHtml;
        paginationEl.querySelectorAll('[data-page]').forEach(btn => {
            btn.addEventListener('click', () => {
                currentPage = parseInt(btn.dataset.page, 10);
                render();
                window.scrollTo({ top: 0, behavior: 'smooth' });
            });
        });
    }
}

// ─── Listeners ───────────────────────────────────────────────

document.addEventListener('DOMContentLoaded', () => {
    render();

    const searchInput = document.getElementById('blogSearch');
    if (searchInput) {
        searchInput.addEventListener('input', () => {
            searchQuery = searchInput.value.trim();
            currentPage = 1;
            render();
        });
    }
});
