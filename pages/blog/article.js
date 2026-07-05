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
// La logique complète (Firestore + modération) vit dans
// assets/js/comments.js, chargé avant ce fichier → window.PilouComments

// ─── Carrousel photos (galerie multi-images) ───────────────────

function renderCarousel(gallery, title) {
    const slides = gallery.map((src, i) => `
        <div class="carousel-slide">
            <img src="${imageSrc(src)}" alt="${escapeHtml(title)} — photo ${i + 1}/${gallery.length}"
                 data-lightbox="${imageSrc(src)}" data-lightbox-index="${i}"
                 loading="${i === 0 ? 'eager' : 'lazy'}">
        </div>`).join('');

    const dots = gallery.map((_, i) => `
        <button type="button" class="carousel-dot ${i === 0 ? 'active' : ''}" data-index="${i}"
                aria-label="Aller à la photo ${i + 1}"></button>`).join('');

    return `
    <div class="article-carousel mb-8" id="articleCarousel" data-count="${gallery.length}">
        <div class="carousel-track-wrap rounded-xl overflow-hidden">
            <div class="carousel-track" id="carouselTrack">${slides}</div>
            <button type="button" class="carousel-arrow carousel-arrow-prev" id="carouselPrev" aria-label="Photo précédente">‹</button>
            <button type="button" class="carousel-arrow carousel-arrow-next" id="carouselNext" aria-label="Photo suivante">›</button>
            <div class="carousel-counter" id="carouselCounter">1 / ${gallery.length}</div>
        </div>
        <div class="carousel-dots" id="carouselDots">${dots}</div>
    </div>`;
}

function initCarousel() {
    const root = document.getElementById('articleCarousel');
    if (!root) return;

    const track   = document.getElementById('carouselTrack');
    const prevBtn = document.getElementById('carouselPrev');
    const nextBtn = document.getElementById('carouselNext');
    const counter = document.getElementById('carouselCounter');
    const dots    = Array.from(root.querySelectorAll('.carousel-dot'));
    const count   = parseInt(root.dataset.count, 10) || 1;
    let index = 0;

    function goTo(i) {
        index = ((i % count) + count) % count;
        track.style.transform = `translateX(-${index * 100}%)`;
        counter.textContent = `${index + 1} / ${count}`;
        dots.forEach((d, di) => d.classList.toggle('active', di === index));
    }

    prevBtn?.addEventListener('click', () => goTo(index - 1));
    nextBtn?.addEventListener('click', () => goTo(index + 1));
    dots.forEach(d => d.addEventListener('click', () => goTo(parseInt(d.dataset.index, 10))));

    // Swipe tactile
    let touchStartX = null;
    track.addEventListener('touchstart', (e) => { touchStartX = e.touches[0].clientX; }, { passive: true });
    track.addEventListener('touchend', (e) => {
        if (touchStartX === null) return;
        const delta = e.changedTouches[0].clientX - touchStartX;
        if (Math.abs(delta) > 40) goTo(delta < 0 ? index + 1 : index - 1);
        touchStartX = null;
    }, { passive: true });

    goTo(0);
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

    const gallery = Array.isArray(article.images) && article.images.length > 0
        ? article.images
        : (article.image ? [article.image] : []);

    const heroBlock = gallery.length > 1
        ? renderCarousel(gallery, article.title)
        : (img ? `<div class="rounded-xl overflow-hidden mb-8 text-center bg-hudSurface">
            <img src="${img}" alt="${escapeHtml(article.title)}"
                 class="max-w-full h-auto mx-auto cursor-zoom-in hover:opacity-90 transition"
                 style="max-height:65vh"
                 data-lightbox="${img}">
        </div>` : '');

    container.innerHTML = `
        <!-- Fil d'Ariane -->
        <div class="flex items-center gap-2 text-sm text-slate-500 mb-10">
            <a href="blog.html" class="hover:text-neonCyan transition">Blog</a>
            <span>/</span>
            ${cat ? `<span style="color:#00d4ff">${escapeHtml(cat)}</span><span>/</span>` : ''}
            <span class="text-slate-400 truncate max-w-xs">${escapeHtml(article.title)}</span>
        </div>

        <!-- Image hero ou carrousel photo : affichée en entier (jamais recadrée), cliquable pour l'agrandir -->
        ${heroBlock}

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
                        <input type="text" id="commentAuthorName" required maxlength="60" placeholder="Votre nom" class="hud-input" />
                    </div>
                </div>
                <div>
                    <label class="hud-label" for="commentText">Commentaire</label>
                    <textarea id="commentText" rows="4" required maxlength="1000" placeholder="Votre réaction..." class="hud-input"></textarea>
                </div>
                <!-- Piège à bots : invisible pour un humain, souvent rempli par un script -->
                <div style="position:absolute;left:-9999px;" aria-hidden="true">
                    <label for="commentWebsite">Ne pas remplir</label>
                    <input type="text" id="commentWebsite" name="website" tabindex="-1" autocomplete="off">
                </div>
                <button type="submit" class="hud-btn hud-btn-primary">Publier</button>
                <p id="commentFormFeedback" class="text-sm hidden"></p>
            </form>
            <div id="commentsList"></div>
        </section>
    `;

    initCarousel();
    window.PilouComments?.init(article.id, article.title);
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

// ─── Lightbox — agrandir une image au clic, navigable si galerie ──

function initLightbox() {
    const overlay  = document.getElementById('lightboxOverlay');
    const imgEl    = document.getElementById('lightboxImage');
    const closeBtn = document.getElementById('lightboxClose');
    const prevBtn  = document.getElementById('lightboxPrev');
    const nextBtn  = document.getElementById('lightboxNext');
    const counter  = document.getElementById('lightboxCounter');
    if (!overlay || !imgEl) return;

    let gallery = [];   // [{src, alt}, ...] du groupe courant
    let index   = 0;

    function updateNav() {
        const multi = gallery.length > 1;
        [prevBtn, nextBtn, counter].forEach(el => { if (el) el.hidden = !multi; });
        if (multi && counter) counter.textContent = `${index + 1} / ${gallery.length}`;
    }

    function show(i) {
        index = ((i % gallery.length) + gallery.length) % gallery.length;
        const item = gallery[index];
        imgEl.src = item.src;
        imgEl.alt = item.alt || '';
        updateNav();
    }

    function openLightbox(triggerEl) {
        const carousel = triggerEl.closest('#articleCarousel');
        if (carousel) {
            gallery = Array.from(carousel.querySelectorAll('[data-lightbox]')).map(el => ({
                src: el.getAttribute('data-lightbox'),
                alt: el.alt || ''
            }));
            index = parseInt(triggerEl.dataset.lightboxIndex, 10) || 0;
        } else {
            gallery = [{ src: triggerEl.getAttribute('data-lightbox'), alt: triggerEl.alt || '' }];
            index = 0;
        }
        show(index);
        overlay.classList.add('open');
        overlay.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
    }

    function closeLightbox() {
        overlay.classList.remove('open');
        overlay.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
        imgEl.src = '';
        gallery = [];
    }

    document.addEventListener('click', (e) => {
        const trigger = e.target.closest('[data-lightbox]');
        if (trigger) {
            openLightbox(trigger);
            return;
        }
        if (e.target.closest('#lightboxPrev')) { show(index - 1); return; }
        if (e.target.closest('#lightboxNext')) { show(index + 1); return; }
        if (e.target === overlay || (closeBtn && e.target.closest('#lightboxClose'))) {
            closeLightbox();
        }
    });

    document.addEventListener('keydown', (e) => {
        if (!overlay.classList.contains('open')) return;
        if (e.key === 'Escape') closeLightbox();
        if (e.key === 'ArrowLeft' && gallery.length > 1) show(index - 1);
        if (e.key === 'ArrowRight' && gallery.length > 1) show(index + 1);
    });

    // Swipe tactile sur l'image agrandie
    let touchStartX = null;
    overlay.addEventListener('touchstart', (e) => { touchStartX = e.touches[0].clientX; }, { passive: true });
    overlay.addEventListener('touchend', (e) => {
        if (touchStartX === null || gallery.length <= 1) { touchStartX = null; return; }
        const delta = e.changedTouches[0].clientX - touchStartX;
        if (Math.abs(delta) > 40) show(delta < 0 ? index + 1 : index - 1);
        touchStartX = null;
    }, { passive: true });
}

// ─── Init ─────────────────────────────────────────────────────

document.addEventListener('DOMContentLoaded', () => {
    initProgressBar();
    initLightbox();
    const id = getArticleId();
    const article = id ? findArticle(id) : null;
    article ? renderArticle(article) : renderNotFound();
});
