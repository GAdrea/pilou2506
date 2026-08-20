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
let activeYear = '';

function getArticles() {
    // data/blog-meta.js (index léger, sans le contenu complet des articles) —
    // voir buildMeta() dans scripts/generate-static-pages.js.
    return window.BlogRender.sortedArticles(window.BLOG_ARTICLES_META);
}

function getRenderer() {
    return window.BlogRender.create({
        baseUrl: BASE_URL,
        hrefFor: (id) => 'articles/' + window.ArticleRender.slugify(id) + '.html'
    });
}

// ─── Render principal ─────────────────────────────────────────

function getYears(articles) {
    const set = new Set();
    articles.forEach(a => { if (a.date) set.add(a.date.slice(0, 4)); });
    return Array.from(set).sort((a, b) => b - a);
}

function renderYearFilters(articles) {
    const yearFiltersEl = document.getElementById('blogYearFilters');
    if (!yearFiltersEl) return;
    const years = getYears(articles);
    yearFiltersEl.innerHTML = years.map(y => {
        const active = y === activeYear;
        const cls = active
            ? 'border-neonCyan text-neonCyan bg-neonCyan/10'
            : 'border-slate-700 text-slate-400 hover:border-neonCyan hover:text-neonCyan';
        return `<button type="button" data-year="${y}" class="px-4 py-1.5 rounded text-sm font-medium border transition ${cls}">${y}</button>`;
    }).join('');
    yearFiltersEl.querySelectorAll('[data-year]').forEach(btn => {
        btn.addEventListener('click', () => {
            activeYear = activeYear === btn.dataset.year ? '' : btn.dataset.year;
            currentPage = 1;
            render();
        });
    });
}

function render() {
    const articles = getArticles();
    const result = getRenderer().renderPage(articles, { activeCategory, searchQuery, page: currentPage, year: activeYear });

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

    renderYearFilters(articles);

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
