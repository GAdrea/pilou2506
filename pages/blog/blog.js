/* ============================================================
   blog.js — Pagination, recherche, filtre catégories, dates
   ============================================================ */

const BASE_URL = '../..';
const ARTICLES_PER_PAGE = 6;

// — État global
let currentPage = 1;
let activeCategory = 'Tout';
let searchQuery = '';

// ─── Helpers ─────────────────────────────────────────────────

function getArticles() {
    const list = window.BLOG_ARTICLES;
    const arr = Array.isArray(list) ? [...list] : [];
    arr.sort((a, b) => {
        if (!a.date) return 1;
        if (!b.date) return -1;
        return new Date(b.date) - new Date(a.date);
    });
    return arr;
}

function imageSrc(path) {
    if (!path) return 'https://via.placeholder.com/400x240?text=Image';
    if (path.startsWith('http') || path.startsWith('//')) return path;
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
    if (isNaN(d.getTime())) return '';
    return d.toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' });
}

function readingTime(content) {
    if (!content) return '';
    const text = content.replace(/<[^>]+>/g, ' ');
    const words = text.trim().split(/\s+/).length;
    const minutes = Math.max(1, Math.round(words / 200));
    return `${minutes} min`;
}

function getCategories(articles) {
    const set = new Set();
    articles.forEach(a => { if (a.category) set.add(a.category); });
    return ['Tout', ...Array.from(set).sort()];
}

// ─── Filtre ───────────────────────────────────────────────────

function filterArticles(articles) {
    return articles.filter(a => {
        const matchCat = activeCategory === 'Tout' || a.category === activeCategory;
        const q = searchQuery.toLowerCase();
        const matchSearch = !q
            || a.title.toLowerCase().includes(q)
            || (a.description || '').toLowerCase().includes(q);
        return matchCat && matchSearch;
    });
}

// ─── Rendu filtres ────────────────────────────────────────────

function renderFilters(articles) {
    const container = document.getElementById('blogFilters');
    if (!container) return;

    const categories = getCategories(articles);
    container.innerHTML = '';

    categories.forEach(cat => {
        const btn = document.createElement('button');
        btn.textContent = cat;
        btn.className = [
            'px-4 py-1.5 rounded text-sm font-medium border transition',
            cat === activeCategory
                ? 'border-neonCyan text-neonCyan bg-neonCyan/10'
                : 'border-slate-700 text-slate-400 hover:border-neonCyan hover:text-neonCyan'
        ].join(' ');
        btn.addEventListener('click', () => {
            activeCategory = cat;
            currentPage = 1;
            render();
        });
        container.appendChild(btn);
    });
}

// ─── Rendu cartes ─────────────────────────────────────────────

function renderCards(filtered) {
    const container = document.getElementById('blogCards');
    const emptyMsg = document.getElementById('blogEmpty');
    const countEl = document.getElementById('blogCount');
    if (!container) return;

    const total = filtered.length;
    const start = (currentPage - 1) * ARTICLES_PER_PAGE;
    const page = filtered.slice(start, start + ARTICLES_PER_PAGE);

    container.innerHTML = '';

    if (total === 0) {
        if (emptyMsg) emptyMsg.classList.remove('hidden');
        if (countEl) countEl.textContent = '0 article';
        return;
    }
    if (emptyMsg) emptyMsg.classList.add('hidden');
    if (countEl) countEl.textContent = `${total} article${total > 1 ? 's' : ''}`;

    page.forEach(article => {
        const card = document.createElement('article');
        card.className = 'hud-card group flex flex-col';
        const imgSrc = imageSrc(article.image);
        const url = `article.html?id=${encodeURIComponent(article.id)}`;
        const date = formatDate(article.date);
        const time = readingTime(article.content);
        const cat = article.category || '';

        card.innerHTML = `
            <a href="${url}" class="block flex-1 flex flex-col">
                <div class="h-48 overflow-hidden relative bg-hudSurface">
                    <img src="${imgSrc}" alt="${escapeHtml(article.title)}"
                         class="w-full h-full object-contain group-hover:scale-110 transition duration-500" loading="lazy">
                    ${cat ? `<span class="absolute top-3 left-3 px-2 py-0.5 text-xs font-bold rounded"
                        style="background:rgba(0,212,255,0.15);border:1px solid rgba(0,212,255,0.4);color:#00d4ff">${escapeHtml(cat)}</span>` : ''}
                </div>
                <div class="p-6 flex flex-col flex-1">
                    <h3 class="text-lg font-bold leading-snug mb-2">${escapeHtml(article.title)}</h3>
                    ${article.description ? `<p class="text-slate-400 text-sm flex-1 mb-4">${escapeHtml(article.description)}</p>` : ''}
                    <div class="flex items-center justify-between text-xs text-slate-500 mt-auto pt-3 border-t border-slate-800">
                        <span>${date}</span>
                        <span>${time} de lecture</span>
                    </div>
                </div>
            </a>
        `;
        container.appendChild(card);
    });
}

// ─── Pagination ───────────────────────────────────────────────

function renderPagination(total) {
    const nav = document.getElementById('blogPagination');
    if (!nav) return;

    const totalPages = Math.ceil(total / ARTICLES_PER_PAGE);

    if (totalPages <= 1) {
        nav.classList.add('hidden');
        return;
    }
    nav.classList.remove('hidden');
    nav.innerHTML = '';

    const btnClass = (active) => [
        'px-3 py-1.5 rounded text-sm font-medium border transition',
        active
            ? 'border-neonCyan text-neonCyan bg-neonCyan/10 cursor-default'
            : 'border-slate-700 text-slate-400 hover:border-neonCyan hover:text-neonCyan'
    ].join(' ');

    // Précédent
    const prev = document.createElement('button');
    prev.innerHTML = '&#8592;';
    prev.className = btnClass(false) + (currentPage === 1 ? ' opacity-30 pointer-events-none' : '');
    prev.addEventListener('click', () => { currentPage--; render(); window.scrollTo({top: 0, behavior: 'smooth'}); });
    nav.appendChild(prev);

    // Pages
    for (let i = 1; i <= totalPages; i++) {
        const btn = document.createElement('button');
        btn.textContent = i;
        btn.className = btnClass(i === currentPage);
        btn.addEventListener('click', () => { currentPage = i; render(); window.scrollTo({top: 0, behavior: 'smooth'}); });
        nav.appendChild(btn);
    }

    // Suivant
    const next = document.createElement('button');
    next.innerHTML = '&#8594;';
    next.className = btnClass(false) + (currentPage === totalPages ? ' opacity-30 pointer-events-none' : '');
    next.addEventListener('click', () => { currentPage++; render(); window.scrollTo({top: 0, behavior: 'smooth'}); });
    nav.appendChild(next);
}

// ─── Render principal ─────────────────────────────────────────

function render() {
    const articles = getArticles();
    const filtered = filterArticles(articles);
    renderFilters(articles);
    renderCards(filtered);
    renderPagination(filtered.length);
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
