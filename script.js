// script.js — Carousels de la page d'accueil

// --- CAROUSEL INFINI À DÉFILEMENT AUTOMATIQUE ---
function buildInfiniteScroll({ items, trackId, renderCard, pxPerSec = 60, cardWidth = 280, gap = 20 }) {
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
    let offset   = 0;
    let lastTime = null;
    let paused   = false;

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

document.addEventListener('DOMContentLoaded', () => {
    // Carousel blog (défilement infini)
    if (document.getElementById('homeBlogCarousel') && window.BLOG_ARTICLES) {
        const articles = sortByDateDesc(window.BLOG_ARTICLES);
        buildInfiniteScroll({
            items: articles,
            trackId: 'homeBlogSlides',
            renderCard: (article) => {
                const imgSrc = resolveHomeImage(article.image || '');
                const link   = 'pages/blog/article.html?id=' + encodeURIComponent(article.id);
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
                            ${desc ? `<p class="text-xs line-clamp-2" style="color:#64748b">${desc}</p>` : ''}
                        </div>
                    </a>
                `;
            }
        });
    }

    // Carousel projets web (défilement infini, façon blog, cartes plus riches)
    if (document.getElementById('homeWebCarousel') && window.WEB_PROJECTS) {
        const projects = sortByDateDesc(window.WEB_PROJECTS);
        buildInfiniteScroll({
            items: projects,
            trackId: 'homeWebSlides',
            cardWidth: 340,
            renderCard: (project) => {
                const imgSrc = resolveHomeImage(project.image || '');
                const tags   = Array.isArray(project.tags) ? project.tags : [];
                const demoUrl = project.demoUrl || project.url || '';
                return `
                    <div class="hud-card h-full flex flex-col items-stretch">
                        <div class="h-40 overflow-hidden flex-shrink-0" style="background:#0d1525">
                            ${imgSrc
                                ? `<img src="${imgSrc}" alt="${project.title || ''}" class="w-full h-full object-cover object-center" loading="lazy">`
                                : `<div class="w-full h-full flex items-center justify-center text-4xl" style="color:#00d4ff">💻</div>`}
                        </div>
                        <div class="p-6 flex-1 flex flex-col">
                            <h3 class="text-xl font-bold mb-2" style="color:#e2e8f0">${project.title}</h3>
                            ${project.description ? `<p class="text-sm mb-4" style="color:#64748b">${project.description}</p>` : ''}
                            ${tags.length ? `<div class="flex gap-2 flex-wrap mb-4">${tags.map(t => `<span class="hud-tag">${t}</span>`).join('')}</div>` : ''}
                            <div class="mt-auto pt-2 flex flex-col gap-2">
                                <a href="pages/web/projets-web.html" class="hud-btn-inline">Consulter le projet</a>
                                ${demoUrl ? `<a href="${demoUrl}" target="_blank" rel="noopener" class="hud-btn-inline hud-btn-inline-pink">Voir la démo</a>` : ''}
                            </div>
                        </div>
                    </div>
                `;
            }
        });
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
                            ${video.description ? `<p class="text-sm mb-4" style="color:#64748b">${video.description}</p>` : ''}
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
