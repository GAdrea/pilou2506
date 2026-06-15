const BASE_URL = '../..';

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
    if (path.startsWith('http://') || path.startsWith('https://') || path.startsWith('//')) return path;
    return BASE_URL + '/' + path.replace(/^\//, '');
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

function renderCards() {
    const container = document.getElementById('blogCards');
    const emptyMsg = document.getElementById('blogEmpty');
    if (!container) return;

    const articles = getArticles();
    container.innerHTML = '';

    if (articles.length === 0) {
        if (emptyMsg) emptyMsg.classList.remove('hidden');
        return;
    }
    if (emptyMsg) emptyMsg.classList.add('hidden');

    articles.forEach((article) => {
        const card = document.createElement('article');
        card.className = 'glass rounded-3xl overflow-hidden group';
        const imgSrc = imageSrc(article.image);
        const url = `article.html?id=${encodeURIComponent(article.id)}`;
        card.innerHTML = `
            <a href="${url}" class="block">
                <div class="h-48 overflow-hidden">
                    <img src="${imgSrc}" alt="${escapeHtml(article.title)}" class="w-full h-full object-cover group-hover:scale-110 transition duration-500" loading="lazy">
                </div>
                <div class="p-6">
                    <h3 class="text-xl font-bold">${escapeHtml(article.title)}</h3>
                    ${article.description ? `<p class="text-slate-500 dark:text-slate-400 mt-2 text-sm">${escapeHtml(article.description)}</p>` : ''}
                </div>
            </a>
        `;
        container.appendChild(card);
    });
}

document.addEventListener('DOMContentLoaded', renderCards);
