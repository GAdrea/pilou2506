/* ============================================================
   article.js — Page article : orchestration DOM + interactivité
   Inclut : prev/next, partage, temps de lecture,
            barre de progression, articles similaires, carrousel, lightbox

   Le rendu HTML est délégué à article-render.js (module partagé
   avec scripts/generate-static-pages.js, qui pré-génère les pages
   statiques /pages/blog/articles/{id}.html pour le SEO).

   Sur ces pages statiques, le contenu est déjà présent dans le HTML
   au chargement : ce script se contente d'attacher l'interactivité
   (barre de progression, lightbox, carrousel, copier le lien).

   La route historique article.html?id=... reste fonctionnelle et
   continue de tout rendre dynamiquement côté client via
   window.ArticleRender.
   ============================================================ */

const IS_STATIC_PAGE = /\/pages\/blog\/articles\//.test(window.location.pathname);
const BASE_URL  = '../..';
const BLOG_HREF = 'blog.html';

// ─── Helpers (route historique uniquement) ─────────────────────

function getArticleId() {
    return new URLSearchParams(window.location.search).get('id') || '';
}

function getArticles() {
    return window.ArticleRender.sortedArticles(window.BLOG_ARTICLES);
}

function findArticle(id) {
    return getArticles().find(a => a.id === id) || null;
}

function getRenderer() {
    return window.ArticleRender.create({
        baseUrl: BASE_URL,
        blogHref: BLOG_HREF,
        hrefFor: (id) => 'articles/' + window.ArticleRender.slugify(id) + '.html'
    });
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

// ─── Partage : natif sur mobile, copie en fallback ─────────────

function initCopyLink() {
    const btn   = document.getElementById('btnCopyLink');
    const label = document.getElementById('copyLinkLabel');
    if (!btn || !label) return;

    if (navigator.share) {
        btn.addEventListener('click', () => {
            navigator.share({ title: document.title, url: window.location.href }).catch(() => {});
        });
    } else {
        btn.addEventListener('click', () => {
            navigator.clipboard.writeText(window.location.href).then(() => {
                label.textContent = '✅ Lien copié !';
                setTimeout(() => { label.textContent = 'Copier le lien'; }, 2000);
            });
        });
    }
}

// ─── Table des matières (générée depuis les <h2> de l'article) ─

function buildToc() {
    const articleEl = document.querySelector('.article-content');
    if (!articleEl) return;
    const headings = Array.from(articleEl.querySelectorAll('h2'));
    if (headings.length < 2) return;

    headings.forEach((h, i) => { if (!h.id) h.id = 'section-' + i; });

    const nav = document.createElement('nav');
    nav.setAttribute('aria-label', 'Table des matières');
    nav.className = 'toc-nav hud-card p-4 mb-8';
    nav.innerHTML =
        '<p class="text-xs uppercase tracking-widest mb-3" style="color:#00d4ff">Sommaire</p>' +
        '<ul>' +
        headings.map(h => `<li><a href="#${h.id}" class="toc-link">${h.textContent}</a></li>`).join('') +
        '</ul>';

    articleEl.insertBefore(nav, articleEl.firstChild);
}

// ─── Rendu (route historique article.html?id=...) ──────────────

function renderArticle(article) {
    const container = document.getElementById('articleContainer');
    if (!container) return;

    document.title = article.title + ' | Pilou - Portfolio';
    container.innerHTML = getRenderer().renderArticleBody(article, getArticles(), window.location.href);

    initCarousel();
    initCopyLink();
    buildToc();
}

function renderNotFound() {
    const container = document.getElementById('articleContainer');
    if (!container) return;
    document.title = 'Article non trouvé | Pilou - Portfolio';
    container.innerHTML = `
        <div class="text-center py-24">
            <p class="text-6xl mb-6">404</p>
            <h1 class="text-2xl font-bold mb-4">Article introuvable</h1>
            <p class="text-slate-400 mb-8">L'article demandé n'existe pas.</p>
            <a href="blog.html" class="hud-btn hud-btn-primary">Retour au blog</a>
        </div>`;
}

// ─── Carrousel photos (galerie multi-images) ───────────────────

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

    if (IS_STATIC_PAGE) {
        // Page pré-rendue au build (SEO) : le contenu est déjà là,
        // on attache juste l'interactivité.
        initCarousel();
        initCopyLink();
        buildToc();
        return;
    }

    const id = getArticleId();
    const article = id ? findArticle(id) : null;
    article ? renderArticle(article) : renderNotFound();
});
