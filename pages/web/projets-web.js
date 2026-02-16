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
    if (!path) return 'https://via.placeholder.com/400x240?text=Projet';
    if (path.startsWith('http://') || path.startsWith('https://') || path.startsWith('//')) return path;
    return BASE_URL + '/' + path.replace(/^\//, '');
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

function renderCards() {
    const container = document.getElementById('webCards');
    const emptyMsg = document.getElementById('webEmpty');
    if (!container) return;

    const projects = getProjects();
    container.innerHTML = '';

    if (projects.length === 0) {
        if (emptyMsg) emptyMsg.classList.remove('hidden');
        return;
    }
    if (emptyMsg) emptyMsg.classList.add('hidden');

    projects.forEach((project) => {
        const card = document.createElement('article');
        card.className = 'glass rounded-3xl overflow-hidden group';
        const imgSrc = imageSrc(project.image);
        const tagsHtml = Array.isArray(project.tags) && project.tags.length
            ? `<div class="flex gap-2 mt-3 flex-wrap">${project.tags.map(t => `<span class="px-3 py-1 bg-slate-200 dark:bg-slate-700 rounded-lg text-xs font-bold">${escapeHtml(t)}</span>`).join('')}</div>`
            : '';
        card.innerHTML = `
            <div class="h-48 overflow-hidden">
                <img src="${imgSrc}" alt="${escapeHtml(project.title)}" class="w-full h-full object-cover group-hover:scale-110 transition duration-500" loading="lazy">
            </div>
            <div class="p-6">
                <h3 class="text-xl font-bold">${escapeHtml(project.title)}</h3>
                ${project.description ? `<p class="text-slate-500 dark:text-slate-400 mt-2 text-sm">${escapeHtml(project.description)}</p>` : ''}
                ${tagsHtml}
            </div>
        `;
        container.appendChild(card);
    });
}

document.addEventListener('DOMContentLoaded', renderCards);
