/* ============================================================
   article-render.js — Rendu HTML des articles (module partagé)

   Ce module contient UNIQUEMENT des fonctions pures de génération
   de HTML (pas d'accès au DOM). Il est chargé :
   - côté navigateur, via <script> classique (expose window.ArticleRender)
   - côté Node, via require() (scripts/generate-static-pages.js),
     pour pré-générer les pages statiques /pages/blog/articles/*.html

   Objectif : une seule source de vérité pour le rendu d'un article,
   utilisée à la fois pour le pré-rendu SEO (build) et pour le rendu
   dynamique de la route historique article.html?id=...
   ============================================================ */

(function (root, factory) {
    if (typeof module === 'object' && module.exports) {
        module.exports = factory();
    } else {
        root.ArticleRender = factory();
    }
}(typeof self !== 'undefined' ? self : this, function () {
    'use strict';

    // ─── Helpers génériques ─────────────────────────────────────

    function escapeHtml(text) {
        if (text === null || text === undefined) return '';
        return String(text)
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#39;');
    }

    // Transforme un id d'article (parfois saisi à la main, avec espaces/accents/
    // majuscules — ex: "Changement de carrière") en slug propre pour les URLs :
    // "changement-de-carriere". Les ids déjà propres ("mon-article") ne changent pas.
    function slugify(str) {
        return String(str || '')
            .normalize('NFD').replace(/[\u0300-\u036f]/g, '') // enlève les accents
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/^-+|-+$/g, '') || 'article';
    }

    function formatDate(dateStr) {
        if (!dateStr) return '';
        const d = new Date(dateStr);
        return isNaN(d.getTime()) ? '' : d.toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' });
    }

    function readingTime(content) {
        if (!content) return '1 min';
        const words = content.replace(/<[^>]+>/g, ' ').trim().split(/\s+/).filter(Boolean).length;
        return Math.max(1, Math.round(words / 230)) + ' min';
    }

    function sortedArticles(list) {
        if (!Array.isArray(list)) return [];
        return [...list].sort((a, b) => {
            if (!a.date) return 1;
            if (!b.date) return -1;
            return new Date(b.date) - new Date(a.date);
        });
    }

    function getPrevNext(articleId, articles) {
        const idx = articles.findIndex(a => a.id === articleId);
        return {
            prev: idx > 0 ? articles[idx - 1] : null,                          // plus récent
            next: (idx > -1 && idx < articles.length - 1) ? articles[idx + 1] : null  // plus ancien
        };
    }

    const INSTAGRAM_PROFILE_URL = 'https://www.instagram.com/pilou2506?igsh=aTA0dGJvc2lmZGZ4';

    // ─── Factory : lie le rendu à un contexte de chemins (dépend
    //     de la profondeur de la page qui l'utilise) ──────────────

    function create(ctx) {
        ctx = ctx || {};
        const baseUrl  = ctx.baseUrl || '.';          // pour résoudre les chemins d'images relatifs
        const hrefFor  = ctx.hrefFor || function (id) { return encodeURIComponent(id) + '.html'; };
        const blogHref = ctx.blogHref || 'blog.html';
        // Optionnel : fourni côté Node (build) par scripts/generate-static-pages.js pour
        // lire les dimensions réelles des fichiers et éviter le CLS (layout shift) au
        // chargement. Absent côté navigateur (rendu dynamique) -> pas de width/height, sans risque.
        const getImageDimensions = typeof ctx.getImageDimensions === 'function' ? ctx.getImageDimensions : null;
        // Optionnel : fourni côté Node (build) pour injecter srcset/sizes sur les <img>.
        // Retourne une chaîne srcset (ex. "assets/img/foo-500w.jpg 500w, assets/img/foo.jpg 1000w")
        // ou null si non disponible. Absent côté navigateur : pas de srcset, sans risque.
        const getSrcset = typeof ctx.getSrcset === 'function' ? ctx.getSrcset : null;

        function imageSrc(path) {
            if (!path) return '';
            if (path.startsWith('http') || path.startsWith('//')) return path;
            return baseUrl + '/' + path.replace(/^\//, '');
        }

        // Retourne ' width="…" height="…"' (avec l'espace en tête) si les dimensions
        // sont connues, sinon une chaîne vide — à insérer directement dans le template.
        function dimAttrs(path) {
            if (!getImageDimensions || !path) return '';
            const dim = getImageDimensions(path);
            return dim && dim.width && dim.height ? ` width="${dim.width}" height="${dim.height}"` : '';
        }

        // Retourne ' srcset="…" sizes="…"' si les variantes sont disponibles (build only).
        function srcsetAttrs(relPath) {
            if (!getSrcset || !relPath) return '';
            const raw = getSrcset(relPath);
            if (!raw) return '';
            // Chaque entrée du srcset a la forme "relPath Xw" ; on y applique imageSrc()
            // pour résoudre le chemin relatif à la profondeur de la page courante.
            const resolved = raw.split(', ').map(entry => {
                const spaceIdx = entry.lastIndexOf(' ');
                return imageSrc(entry.slice(0, spaceIdx)) + entry.slice(spaceIdx);
            }).join(', ');
            return ` srcset="${escapeHtml(resolved)}" sizes="(max-width:640px) 100vw, (max-width:1024px) 80vw, 1000px"`;
        }

        function renderCarousel(gallery, title) {
            const slides = gallery.map((src, i) => `
        <div class="carousel-slide">
            <img src="${imageSrc(src)}" alt="${escapeHtml(title)} — photo ${i + 1}/${gallery.length}"
                 data-lightbox="${imageSrc(src)}" data-lightbox-index="${i}"
                 loading="${i === 0 ? 'eager' : 'lazy'}"${srcsetAttrs(src)}${dimAttrs(src)}>
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

        function renderShare(title, url) {
            const encodedUrl   = encodeURIComponent(url || '');
            const encodedTitle = encodeURIComponent(title || '');
            return `
    <div class="mt-10 pt-8 border-t border-slate-800">
        <p class="text-xs text-slate-400 uppercase font-bold tracking-widest mb-4">Partager</p>
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

        function renderRelated(currentId, category, articles) {
            const related = articles
                .filter(a => a.id !== currentId && a.category === category)
                .slice(0, 3);

            if (related.length === 0) return '';

            const cards = related.map(a => {
                const img = imageSrc(a.image);
                return `
        <a href="${hrefFor(a.id)}"
           class="hud-card group flex flex-col overflow-hidden hover:border-neonCyan transition">
            ${img ? `<div class="h-32 overflow-hidden">
                <img src="${img}" alt="${escapeHtml(a.title)}"${dimAttrs(a.image)} class="w-full h-full object-cover group-hover:scale-110 transition duration-500" loading="lazy">
            </div>` : ''}
            <div class="p-4">
                <p class="text-sm font-bold leading-snug group-hover:text-neonCyan transition">${escapeHtml(a.title)}</p>
                <p class="text-xs text-slate-400 mt-1">${formatDate(a.date)}</p>
            </div>
        </a>`;
            }).join('');

            return `
    <section class="mt-16 pt-10 border-t border-slate-800">
        <p class="text-xs text-slate-400 uppercase font-bold tracking-widest mb-6">Dans la même catégorie</p>
        <div class="grid sm:grid-cols-3 gap-4">${cards}</div>
    </section>`;
        }

        function renderPrevNext(articleId, articles) {
            const { prev, next } = getPrevNext(articleId, articles);
            if (!prev && !next) return '';

            const card = (a, direction) => {
                if (!a) return `<div></div>`;
                const label = direction === 'prev' ? '← Plus récent' : 'Plus ancien →';
                const align = direction === 'prev' ? 'text-left' : 'text-right';
                return `
        <a href="${hrefFor(a.id)}"
           class="hud-card p-4 flex-1 min-w-0 hover:border-neonCyan transition group block ${align}">
            <p class="text-xs text-slate-400 mb-1">${label}</p>
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

        function renderArticleBody(article, articles, canonicalUrl) {
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
                 data-lightbox="${img}"${srcsetAttrs(article.image)}${dimAttrs(article.image)} fetchpriority="high" loading="eager" decoding="async">
        </div>` : '');

            return `
        <!-- Fil d'Ariane -->
        <div class="flex items-center gap-2 text-sm text-slate-400 mb-10">
            <a href="${blogHref}" class="hover:text-neonCyan transition">Blog</a>
            <span>/</span>
            ${cat ? `<span style="color:#00d4ff">${escapeHtml(cat)}</span><span>/</span>` : ''}
            <span class="text-slate-400 truncate max-w-xs">${escapeHtml(article.title)}</span>
        </div>

        <!-- Image hero ou carrousel photo : affichée en entier (jamais recadrée), cliquable pour l'agrandir -->
        ${heroBlock}

        <!-- En-tête article -->
        <header class="mb-6">
            ${cat ? `<span class="inline-block px-3 py-1 text-xs font-bold rounded mb-4"
                style="background:rgba(0,212,255,0.15);border:1px solid rgba(0,212,255,0.4);color:#00d4ff">${escapeHtml(cat)}</span>` : ''}
            <h1 class="text-3xl md:text-4xl font-bold leading-tight mb-4">${escapeHtml(article.title)}</h1>
            <div class="flex flex-wrap items-center gap-4 text-sm text-slate-400">
                ${date ? `<span>📅 ${date}</span>` : ''}
                <span>⏱ ${time} de lecture</span>
                <a href="${blogHref}" class="ml-auto text-hibiscus hover:underline font-medium">← Retour au blog</a>
            </div>
        </header>

        <!-- Réagir sur Instagram (juste sous l'en-tête = visible sans scroll) -->
        <div class="mb-8 flex justify-center">
            <a href="${escapeHtml(article.instagramUrl || INSTAGRAM_PROFILE_URL)}"
               target="_blank" rel="noopener noreferrer"
               class="hud-btn hud-btn-primary inline-flex items-center justify-center gap-2" style="width:auto;padding:0.65rem 1.5rem;">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
                Réagir sur Instagram
            </a>
        </div>

        <!-- Contenu -->
        <div class="article-content prose-pilou">${content}</div>

        <!-- Partage -->
        ${renderShare(article.title, canonicalUrl || '')}

        <!-- Articles similaires -->
        ${renderRelated(article.id, cat, articles)}

        <!-- Prev / Next -->
        ${renderPrevNext(article.id, articles)}
    `;
        }

        return {
            imageSrc,
            renderCarousel,
            renderShare,
            renderRelated,
            renderPrevNext,
            renderArticleBody,
            hrefFor
        };
    }

    return {
        escapeHtml,
        slugify,
        formatDate,
        readingTime,
        sortedArticles,
        getPrevNext,
        create
    };
}));
