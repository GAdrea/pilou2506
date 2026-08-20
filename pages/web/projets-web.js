/**
 * Projets Web : affichage depuis data/web-data.js
 * Ajout de projets en éditant le fichier de données.
 */

const BASE_URL = '../..';

function getProjects() {
    const list = window.WEB_PROJECTS;
    return Array.isArray(list) ? list : [];
}

function imageSrc(path) {
    if (!path) return BASE_URL + '/assets/img/web/icons/generic-project.svg';
    if (path.startsWith('http://') || path.startsWith('https://') || path.startsWith('//')) return path;
    return BASE_URL + '/' + path.replace(/^\//, '');
}

function resolveUrl(path) {
    if (!path || path === '#') return '';
    if (path.startsWith('http://') || path.startsWith('https://') || path.startsWith('//')) return path;
    return BASE_URL + '/' + path.replace(/^\//, '');
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

let activeTag = null;

function buildFilters(projects) {
    const filtersEl = document.getElementById('webFilters');
    if (!filtersEl) return;

    const allTags = [...new Set(projects.flatMap(p => Array.isArray(p.tags) ? p.tags : []))].sort();
    if (allTags.length === 0) return;

    const btnBase = 'hud-tag cursor-pointer transition-all';
    filtersEl.innerHTML = '';

    function makeBtn(label, tag) {
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.className = btnBase;
        btn.textContent = label;
        btn.dataset.tag = tag || '';
        btn.setAttribute('aria-pressed', String(activeTag === tag));
        btn.addEventListener('click', () => {
            activeTag = activeTag === tag ? null : tag;
            renderCards();
        });
        return btn;
    }

    filtersEl.appendChild(makeBtn('Tous', null));
    allTags.forEach(t => filtersEl.appendChild(makeBtn(t, t)));
}

function renderCards() {
    const container = document.getElementById('webCards');
    const emptyMsg = document.getElementById('webEmpty');
    if (!container) return;

    const projects = getProjects();

    buildFilters(projects);

    // Mettre à jour aria-pressed sur les boutons filtre
    const filtersEl = document.getElementById('webFilters');
    if (filtersEl) {
        filtersEl.querySelectorAll('button').forEach(btn => {
            const tag = btn.dataset.tag || null;
            btn.setAttribute('aria-pressed', String(activeTag === tag));
            btn.style.opacity = activeTag === null || activeTag === tag ? '1' : '0.5';
        });
    }

    const filtered = activeTag ? projects.filter(p => Array.isArray(p.tags) && p.tags.includes(activeTag)) : projects;

    container.innerHTML = '';

    if (filtered.length === 0) {
        if (emptyMsg) emptyMsg.classList.remove('hidden');
        return;
    }
    if (emptyMsg) emptyMsg.classList.add('hidden');

    filtered.forEach((project) => {
        const card = document.createElement('article');
        card.className = 'hud-card group flex flex-col';
        const imgSrc = imageSrc(project.image);
        const detailUrl = `details/${encodeURIComponent(project.id)}.html`;
        const demoUrl = resolveUrl(project.demoUrl || project.url);
        const tagsHtml = Array.isArray(project.tags) && project.tags.length
            ? `<div class="flex gap-2 mt-3 flex-wrap">${project.tags.map(t => `<span class="hud-tag">${escapeHtml(t)}</span>`).join('')}</div>`
            : '';
        card.innerHTML = `
            <a href="${detailUrl}" class="block">
                <div class="h-48 overflow-hidden bg-hudSurface">
                    <img src="${imgSrc}" alt="${escapeHtml(project.title)}" class="w-full h-full object-contain group-hover:scale-110 transition duration-500" loading="lazy">
                </div>
            </a>
            <div class="p-6 flex flex-col flex-1">
                <a href="${detailUrl}" class="hover:text-neonCyan transition">
                    <h3 class="text-xl font-bold">${escapeHtml(project.title)}</h3>
                </a>
                ${project.description ? `<p class="text-slate-400 dark:text-slate-400 mt-2 text-sm">${escapeHtml(project.description)}</p>` : ''}
                ${tagsHtml}
                <div class="mt-4 flex flex-col gap-2">
                    <a href="${detailUrl}" class="hud-btn-inline">Voir le projet</a>
                    ${demoUrl ? `<a href="${demoUrl}" target="_blank" rel="noopener" class="hud-btn-inline hud-btn-inline-pink">Voir la démo</a>` : ''}
                </div>
            </div>
        `;
        container.appendChild(card);
    });
}

document.addEventListener('DOMContentLoaded', renderCards);
