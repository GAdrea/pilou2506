// script.js — Carousels de la page d'accueil

// --- CAROUSEL INFINI À DÉFILEMENT AUTOMATIQUE (+ navigation manuelle optionnelle) ---
function buildInfiniteScroll({ items, trackId, renderCard, pxPerSec = 60, cardWidth = 280, gap = 20, prevBtnId, nextBtnId }) {
    const trackEl = document.getElementById(trackId);
    if (!trackEl || !Array.isArray(items) || items.length === 0) return;

    const CARD_W = cardWidth;
    const GAP    = gap;
    const STEP   = CARD_W + GAP;

    trackEl.innerHTML = '';
    trackEl.style.cssText = 'display:flex;gap:' + GAP + 'px;will-change:transform;';

    [...items, ...items].forEach(item => {
        const el = document.createElement('div');
        el.style.cssText = 'flex-shrink:0;width:' + CARD_W + 'px;';
        el.innerHTML = renderCard(item);
        trackEl.appendChild(el);
    });

    const loopWidth = items.length * STEP;
    let offset      = 0;
    let lastTime    = null;
    let paused      = false;
    let resumeTimer = null;

    function tick(ts) {
        if (lastTime !== null && !paused) {
            offset += pxPerSec * (ts - lastTime) / 1000;
            if (offset >= loopWidth) offset -= loopWidth;
            trackEl.style.transform = 'translateX(-' + offset + 'px)';
        }
        lastTime = ts;
        requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);

    const section = trackEl.closest('section') || trackEl.parentElement;
    section.addEventListener('mouseenter', () => { paused = true; });
    section.addEventListener('mouseleave', () => { paused = false; });

    // Navigation manuelle : avancer ou reculer d'une carte, dans les deux sens, à la demande.
    // Fonctionne aussi au clic/tactile (sans survol), donc on met en pause explicitement
    // le défilement auto puis on le relance après un court délai d'inactivité.
    const reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    function goTo(direction) {
        offset = ((offset + direction * STEP) % loopWidth + loopWidth) % loopWidth;
        paused = true;
        trackEl.style.transition = reduceMotion ? 'none' : 'transform 0.4s ease';
        trackEl.style.transform  = 'translateX(-' + offset + 'px)';
        window.clearTimeout(resumeTimer);
        resumeTimer = window.setTimeout(() => {
            trackEl.style.transition = '';
            paused = false;
        }, 2600);
    }

    const prevBtn = prevBtnId && document.getElementById(prevBtnId);
    const nextBtn = nextBtnId && document.getElementById(nextBtnId);
    if (prevBtn) prevBtn.addEventListener('click', () => goTo(-1));
    if (nextBtn) nextBtn.addEventListener('click', () => goTo(1));
}

// --- HOME CAROUSELS (blog / web / vidéo) ---
function buildCarousel({ items, maxItems, slidesId, dotsId, renderSlide, intervalMs = 6000 }) {
    const slidesRoot = document.getElementById(slidesId);
    const dotsRoot   = document.getElementById(dotsId);
    if (!slidesRoot || !Array.isArray(items) || items.length === 0) return;

    const limited = items.slice(0, maxItems);
    slidesRoot.innerHTML = '';
    if (dotsRoot) dotsRoot.innerHTML = '';

    slidesRoot.style.display = 'grid';

    limited.forEach((item, idx) => {
        const slide = document.createElement('div');
        slide.style.gridArea     = '1 / 1';
        slide.style.transition   = 'opacity 0.5s ease';
        slide.style.opacity      = idx === 0 ? '1' : '0';
        slide.style.pointerEvents = idx === 0 ? '' : 'none';
        slide.innerHTML = renderSlide(item);
        slidesRoot.appendChild(slide);

        if (dotsRoot) {
            const dot = document.createElement('button');
            dot.style.cssText = [
                'width:10px',
                'height:10px',
                'border:none',
                'cursor:pointer',
                'transition:all 0.3s',
                'clip-path:polygon(50% 0%,100% 50%,50% 100%,0% 50%)',
                'background:' + (idx === 0 ? '#00d4ff' : 'rgba(0,212,255,0.2)')
            ].join(';');
            dot.setAttribute('aria-label', 'Élément ' + (idx + 1));
            dot.addEventListener('click', () => setActive(idx));
            dotsRoot.appendChild(dot);
        }
    });

    const slides = Array.from(slidesRoot.children);
    const dots   = dotsRoot ? Array.from(dotsRoot.children) : [];
    let current  = 0;

    function setActive(index) {
        slides.forEach((s, i) => {
            s.style.opacity      = i === index ? '1' : '0';
            s.style.pointerEvents = i === index ? '' : 'none';
        });
        dots.forEach((d, i) => {
            d.style.background = i === index ? '#00d4ff' : 'rgba(0,212,255,0.2)';
            d.style.transform  = i === index ? 'scale(1.4)' : 'scale(1)';
            d.style.boxShadow  = i === index ? '0 0 8px rgba(0,212,255,0.7)' : 'none';
        });
        current = index;
    }

    let timer = setInterval(() => {
        setActive((current + 1) % slides.length);
    }, intervalMs);

    if (dotsRoot) {
        dotsRoot.addEventListener('click', () => {
            clearInterval(timer);
            timer = setInterval(() => {
                setActive((current + 1) % slides.length);
            }, intervalMs);
        });
    }
}

function parseDateSafe(str) {
    if (!str) return null;
    const d = new Date(str);
    return isNaN(d.getTime()) ? null : d;
}

function sortByDateDesc(list) {
    const arr = Array.isArray(list) ? [...list] : [];
    arr.sort((a, b) => {
        const da = parseDateSafe(a.date);
        const db = parseDateSafe(b.date);
        if (!da && !db) return 0;
        if (!da) return 1;
        if (!db) return -1;
        return db - da;
    });
    return arr;
}

function resolveHomeImage(path) {
    if (!path) return '';
    if (path.startsWith('http://') || path.startsWith('https://') || path.startsWith('//') || path.startsWith('/')) {
        return path;
    }
    return path;
}

// Mélange Fisher-Yates (ne modifie pas le tableau d'origine)
function shuffleArray(list) {
    const arr = Array.isArray(list) ? [...list] : [];
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text == null ? '' : String(text);
    return div.innerHTML;
}

document.addEventListener('DOMContentLoaded', () => {
    // À La Une : spotlight sur LE tout dernier article publié (un seul, en grand format)
    if (document.getElementById('latestArticleSpotlight') && window.BLOG_ARTICLES) {
        const spotlightEl = document.getElementById('latestArticleSpotlight');
        const latest = sortByDateDesc(window.BLOG_ARTICLES)[0];
        if (latest) {
            const imgSrc = resolveHomeImage(latest.image || '');
            const link   = 'pages/blog/articles/' + window.ArticleRender.slugify(latest.id) + '.html';
            const cat    = latest.category || '';
            const desc   = latest.description || '';
            const dateFr = window.ArticleRender.formatDate ? window.ArticleRender.formatDate(latest.date) : '';

            spotlightEl.innerHTML = `
                <a href="${link}" class="hud-card grid lg:grid-cols-2 overflow-hidden group">
                    <div class="h-72 lg:h-full overflow-hidden relative" style="background:rgba(13,21,37,0.6)">
                        ${imgSrc
                            ? `<img src="${imgSrc}" alt="${escapeHtml(latest.title || '')}" class="w-full h-full object-cover object-center group-hover:scale-105 transition duration-500" loading="lazy">`
                            : '<div class="w-full h-full flex items-center justify-center text-6xl">📝</div>'}
                    </div>
                    <div class="p-8 lg:p-10 flex flex-col justify-center gap-4">
                        <div class="hud-badge w-fit">
                            <span class="w-2 h-2 rounded-full blink" style="background:#ff4d6d"></span>
                            Nouvel article
                        </div>
                        ${cat ? `<span class="hud-tag w-fit">${escapeHtml(cat)}</span>` : ''}
                        <h3 class="text-2xl lg:text-3xl font-bold leading-snug" style="color:#e2e8f0">${escapeHtml(latest.title || '')}</h3>
                        ${desc ? `<p class="text-sm lg:text-base" style="color:#94a3b8">${escapeHtml(desc)}</p>` : ''}
                        ${dateFr ? `<p class="text-xs uppercase tracking-wide" style="color:#64748b">${escapeHtml(dateFr)}</p>` : ''}
                        <span class="hud-btn hud-btn-primary w-fit mt-2">Lire l'article →</span>
                    </div>
                </a>
            `;
        }
    }

    // Carousel blog (défilement infini) — les N articles les plus récents
    const latestArticles = window.BLOG_ARTICLES ? sortByDateDesc(window.BLOG_ARTICLES).slice(0, 5) : [];
    if (document.getElementById('homeBlogCarousel') && window.BLOG_ARTICLES) {
        buildInfiniteScroll({
            items: latestArticles,
            trackId: 'homeBlogSlides',
            prevBtnId: 'homeBlogPrev',
            nextBtnId: 'homeBlogNext',
            renderCard: (article) => {
                const imgSrc = resolveHomeImage(article.image || '');
                const link   = 'pages/blog/articles/' + window.ArticleRender.slugify(article.id) + '.html';
                const desc   = article.description || '';
                return `
                    <a href="${link}" class="hud-card flex flex-col hover:scale-[1.02] transition-transform duration-300 block">
                        <div class="h-44 overflow-hidden flex-shrink-0" style="background:rgba(13,21,37,0.6)">
                            ${imgSrc
                                ? `<img src="${imgSrc}" alt="${article.title || ''}" class="w-full h-full object-cover object-center" loading="lazy">`
                                : '<div class="w-full h-full flex items-center justify-center text-4xl">📝</div>'}
                        </div>
                        <div class="p-4 flex flex-col flex-1">
                            <h3 class="font-bold text-sm leading-snug mb-1" style="color:#e2e8f0">${article.title}</h3>
                            ${desc ? `<p class="text-xs line-clamp-2" style="color:#94a3b8">${desc}</p>` : ''}
                        </div>
                    </a>
                `;
            }
        });
    }

    // Galerie d'articles piochés au hasard (remplace l'ancien carousel de projets web sur la home)
    // On exclut les articles déjà visibles dans "Derniers Articles" pour éviter les doublons entre les deux sections.
    if (document.getElementById('homeGalleryGrid') && window.BLOG_ARTICLES) {
        const grid = document.getElementById('homeGalleryGrid');
        const latestIds = new Set(latestArticles.map(a => a.id));
        const pool = window.BLOG_ARTICLES.filter(a => !latestIds.has(a.id));
        const picks = shuffleArray(pool).slice(0, 6);

        grid.innerHTML = picks.map(article => {
            const imgSrc = resolveHomeImage(article.image || '');
            const link   = 'pages/blog/articles/' + window.ArticleRender.slugify(article.id) + '.html';
            const cat    = article.category || '';
            const desc   = article.description || '';
            return `
                <a href="${link}" class="hud-card group flex flex-col">
                    <div class="h-48 overflow-hidden relative flex-shrink-0" style="background:rgba(13,21,37,0.6)">
                        ${imgSrc
                            ? `<img src="${imgSrc}" alt="${escapeHtml(article.title || '')}" class="w-full h-full object-cover object-center group-hover:scale-110 transition duration-500" loading="lazy">`
                            : '<div class="w-full h-full flex items-center justify-center text-4xl">📝</div>'}
                        ${cat ? `<span class="absolute top-3 left-3 px-2 py-0.5 text-xs font-bold rounded" style="background:rgba(0,212,255,0.15);border:1px solid rgba(0,212,255,0.4);color:#00d4ff">${escapeHtml(cat)}</span>` : ''}
                    </div>
                    <div class="p-6 flex flex-col flex-1">
                        <h3 class="text-lg font-bold leading-snug mb-2" style="color:#e2e8f0">${escapeHtml(article.title || '')}</h3>
                        ${desc ? `<p class="text-sm flex-1" style="color:#94a3b8">${escapeHtml(desc)}</p>` : ''}
                    </div>
                </a>
            `;
        }).join('');
    }

    // Carousel projets vidéo
    if (document.getElementById('homeVideoCarousel') && window.VIDEO_PROJECTS) {
        const videos = sortByDateDesc(window.VIDEO_PROJECTS);
        buildCarousel({
            items: videos,
            maxItems: 3,
            slidesId: 'homeVideoSlides',
            dotsId: 'homeVideoDots',
            renderSlide: (video) => {
                const imgSrc     = resolveHomeImage(video.image || '');
                const playIcon   = '<svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10 fill-current" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>';
                const demoUrl    = video.url || '';
                return `
                    <div class="flex justify-center">
                      <div class="hud-card w-full max-w-xs flex flex-col items-stretch">
                        <div class="h-52 overflow-hidden relative" style="background:#0d1525">
                            ${imgSrc ? `<img src="${imgSrc}" alt="${video.title || ''}" class="w-full h-full object-cover object-center" loading="lazy">` : ''}
                            <div class="absolute inset-0 flex items-center justify-center" style="background:rgba(0,0,0,0.35)">
                                <div class="w-16 h-16 flex items-center justify-center" style="background:rgba(0,212,255,0.15);border:1px solid rgba(0,212,255,0.4);color:#00d4ff">
                                    ${playIcon}
                                </div>
                            </div>
                        </div>
                        <div class="p-6 flex-1 flex flex-col">
                            <h3 class="text-xl font-bold mb-2" style="color:#e2e8f0">${video.title}</h3>
                            ${video.description ? `<p class="text-sm mb-4" style="color:#94a3b8">${video.description}</p>` : ''}
                            <div class="mt-auto pt-2 flex flex-col gap-2">
                                <a href="pages/video/projets-video.html" class="hud-btn-inline">Consulter le projet</a>
                                ${demoUrl ? `<a href="${demoUrl}" target="_blank" rel="noopener" class="hud-btn-inline hud-btn-inline-pink">Voir la démo</a>` : ''}
                            </div>
                        </div>
                      </div>
                    </div>
                `;
            }
        });
    }
});
