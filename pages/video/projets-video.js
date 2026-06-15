/**
 * Projets Vidéo : affichage depuis data/video-data.js
 * Ajout de vidéos en éditant le fichier de données.
 */

const BASE_URL = '../..';

function getVideos() {
    const list = window.VIDEO_PROJECTS;
    return Array.isArray(list) ? list : [];
}

function imageSrc(path) {
    if (!path) return 'https://via.placeholder.com/400x225?text=Vidéo';
    if (path.startsWith('http://') || path.startsWith('https://') || path.startsWith('//')) return path;
    return BASE_URL + '/' + path.replace(/^\//, '');
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

function renderCards() {
    const container = document.getElementById('videoCards');
    const emptyMsg = document.getElementById('videoEmpty');
    if (!container) return;

    const videos = getVideos();
    container.innerHTML = '';

    if (videos.length === 0) {
        if (emptyMsg) emptyMsg.classList.remove('hidden');
        return;
    }
    if (emptyMsg) emptyMsg.classList.add('hidden');

    const playIconSvg = '<svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10 fill-current" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>';

    videos.forEach((video) => {
        const card = document.createElement('article');
        card.className = 'hud-card group';
        const imgSrc = imageSrc(video.image);
        const thumbBlock = `
            <div class="relative overflow-hidden aspect-video" style="background:#0d1525">
                <img src="${imgSrc}" alt="${escapeHtml(video.title)}" class="w-full h-full object-cover group-hover:scale-105 transition duration-500" loading="lazy">
                <div class="absolute inset-0 flex items-center justify-center" style="background:rgba(0,0,0,0.4)">
                    <div class="w-16 h-16 flex items-center justify-center transition" style="border:2px solid rgba(0,212,255,0.6);color:#00d4ff">
                        ${playIconSvg}
                    </div>
                </div>
            </div>
        `;
        const textBlock = `
            <div class="p-5">
                <h3 class="text-xl font-bold">${escapeHtml(video.title)}</h3>
                ${video.description ? `<p class="mt-2 text-sm" style="color:#64748b">${escapeHtml(video.description)}</p>` : ''}
            </div>
        `;
        if (video.url) {
            card.innerHTML = `<a href="${escapeHtml(video.url)}" target="_blank" rel="noopener" class="block">${thumbBlock}</a>${textBlock}`;
        } else {
            card.innerHTML = thumbBlock + textBlock;
        }
        container.appendChild(card);
    });
}

document.addEventListener('DOMContentLoaded', renderCards);
