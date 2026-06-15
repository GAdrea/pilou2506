// --- GESTION DARK MODE ---
const themeToggle = document.getElementById('themeToggle');
const themeToggleMobile = document.getElementById('themeToggleMobile');
const html = document.documentElement;
const themeIcon = document.getElementById('themeIcon');
const themeIconMobile = document.getElementById('themeIconMobile');

function toggleTheme() {
    if (html.classList.contains('dark')) {
        html.classList.remove('dark');
        if (themeIcon) themeIcon.innerText = '🌞';
        if (themeIconMobile) themeIconMobile.innerText = '🌞';
        localStorage.theme = 'light';
    } else {
        html.classList.add('dark');
        if (themeIcon) themeIcon.innerText = '🌙';
        if (themeIconMobile) themeIconMobile.innerText = '🌙';
        localStorage.theme = 'dark';
    }
}

if (themeToggle) themeToggle.addEventListener('click', toggleTheme);
if (themeToggleMobile) themeToggleMobile.addEventListener('click', toggleTheme);

// Check local storage
if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    html.classList.add('dark');
    if (themeIcon) themeIcon.innerText = '🌙';
    if (themeIconMobile) themeIconMobile.innerText = '🌙';
}

// --- MENU MOBILE ---
const burgerBtn = document.getElementById('burgerBtn');
const closeMenu = document.getElementById('closeMenu');
const mobileMenu = document.getElementById('mobileMenu');
const mobileLinks = document.querySelectorAll('.mobile-nav-link');

function toggleMenu() {
    if (!mobileMenu) return;
    mobileMenu.classList.toggle('open');
    document.body.classList.toggle('overflow-hidden');
}

if (burgerBtn) burgerBtn.addEventListener('click', toggleMenu);
if (closeMenu) closeMenu.addEventListener('click', toggleMenu);
mobileLinks.forEach(link => link.addEventListener('click', toggleMenu));

// --- SCROLL TOP BUTTON ---
const scrollTopBtn = document.getElementById('scrollTopBtn');
if (scrollTopBtn) {
    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            scrollTopBtn.classList.add('visible');
        } else {
            scrollTopBtn.classList.remove('visible');
        }
    });

    scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

// --- FOND DIGITAL : LIGNES CIRCUITS ---
// Palette : Martinique (hibiscus #ff4d6d), France (#3b82f6), Japon (#bc002d), Gamer (#00d4ff)
const canvas = document.getElementById('particles-canvas');
if (canvas) {
    const ctx = canvas.getContext('2d');
    const LINE_COUNT = 45;
    const GRID_SPACING = 40;

    const DARK_PALETTE  = ['#00d4ff','#00d4ff','#00d4ff','#00b4d8','#ff4d6d','#ff4d6d','#3b82f6','#bc002d','#f59e0b'];
    const LIGHT_PALETTE = ['#0066cc','#0066cc','#3b82f6','#cc0033','#1a3a8f','#bc002d','#e08000'];

    const isDark = () => html.classList.contains('dark');
    let bgGrad = null;

    function resize() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        bgGrad = null;
    }
    window.addEventListener('resize', resize);
    resize();

    class DigitalLine {
        constructor() { this.reset(); }

        reset() {
            const w = canvas.width;
            const h = canvas.height;
            this.startX = Math.random() * w;
            this.startY = Math.random() * h;

            // 8 directions : esthétique circuit imprimé
            const angle = Math.floor(Math.random() * 8) * (Math.PI / 4);
            this.dx = Math.cos(angle);
            this.dy = Math.sin(angle);

            this.speed = 1.5 + Math.random() * 3.5;
            this.segmentLength = 60 + Math.random() * 200;
            this.maxTravel = this.segmentLength + Math.sqrt(w * w + h * h);
            this.headDist = Math.random() * this.segmentLength * 0.8;
            this.done = false;

            const palette = isDark() ? DARK_PALETTE : LIGHT_PALETTE;
            this.color = palette[Math.floor(Math.random() * palette.length)];
            this.width = 0.5 + Math.random() * 1.5;
            this.glow = isDark() ? 8 + Math.random() * 12 : 2 + Math.random() * 4;
        }

        get tailDist() { return Math.max(0, this.headDist - this.segmentLength); }

        update() {
            this.headDist += this.speed;
            if (this.tailDist >= this.maxTravel) this.done = true;
        }

        draw() {
            const hx = this.startX + this.dx * this.headDist;
            const hy = this.startY + this.dy * this.headDist;
            const tx = this.startX + this.dx * this.tailDist;
            const ty = this.startY + this.dy * this.tailDist;

            if (hx === tx && hy === ty) return;

            ctx.save();
            ctx.lineWidth = this.width;
            ctx.shadowBlur = this.glow;
            ctx.shadowColor = this.color;

            try {
                const grad = ctx.createLinearGradient(tx, ty, hx, hy);
                grad.addColorStop(0, 'rgba(0,0,0,0)');
                grad.addColorStop(0.4, this.color + '55');
                grad.addColorStop(1, this.color);
                ctx.strokeStyle = grad;
            } catch (e) {
                ctx.strokeStyle = this.color;
            }

            ctx.beginPath();
            ctx.moveTo(tx, ty);
            ctx.lineTo(hx, hy);
            ctx.stroke();

            // Nœud lumineux en tête de ligne
            ctx.beginPath();
            ctx.fillStyle = '#ffffff';
            ctx.globalAlpha = 0.9;
            ctx.shadowBlur = 14;
            ctx.shadowColor = this.color;
            ctx.arc(hx, hy, this.width + 0.8, 0, Math.PI * 2);
            ctx.fill();

            ctx.restore();
        }
    }

    let lines = Array.from({ length: LINE_COUNT }, () => new DigitalLine());

    function drawBackground() {
        if (isDark()) {
            if (!bgGrad) {
                bgGrad = ctx.createRadialGradient(
                    canvas.width * 0.5, canvas.height * 0.4, 0,
                    canvas.width * 0.5, canvas.height * 0.5,
                    Math.max(canvas.width, canvas.height) * 0.85
                );
                bgGrad.addColorStop(0, '#0d1525');
                bgGrad.addColorStop(1, '#050a12');
            }
            ctx.fillStyle = bgGrad;
        } else {
            ctx.fillStyle = '#f0f5ff';
        }
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    }

    function drawGrid() {
        if (!isDark()) return;
        ctx.save();
        ctx.strokeStyle = 'rgba(0, 212, 255, 0.04)';
        ctx.lineWidth = 0.5;
        ctx.beginPath();
        for (let x = 0; x <= canvas.width; x += GRID_SPACING) {
            ctx.moveTo(x, 0); ctx.lineTo(x, canvas.height);
        }
        for (let y = 0; y <= canvas.height; y += GRID_SPACING) {
            ctx.moveTo(0, y); ctx.lineTo(canvas.width, y);
        }
        ctx.stroke();
        ctx.restore();
    }

    function animate() {
        drawBackground();
        drawGrid();
        lines.forEach((line, i) => {
            line.update();
            line.draw();
            if (line.done) lines[i] = new DigitalLine();
        });
        requestAnimationFrame(animate);
    }
    animate();
}

// --- CAROUSEL INFINI À DÉFILEMENT AUTOMATIQUE ---
function buildInfiniteScroll({ items, trackId, renderCard, pxPerSec = 60 }) {
    const trackEl = document.getElementById(trackId);
    if (!trackEl || !Array.isArray(items) || items.length === 0) return;

    const CARD_W = 280;
    const GAP = 20;
    const STEP = CARD_W + GAP;

    trackEl.innerHTML = '';
    trackEl.style.cssText = 'display:flex;gap:' + GAP + 'px;will-change:transform;';

    // Dupliquer les articles pour la boucle transparente
    [...items, ...items].forEach(item => {
        const el = document.createElement('div');
        el.style.cssText = 'flex-shrink:0;width:' + CARD_W + 'px;';
        el.innerHTML = renderCard(item);
        trackEl.appendChild(el);
    });

    const loopWidth = items.length * STEP; // largeur d'un seul set
    let offset = 0;
    let lastTime = null;
    let paused = false;

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
    const dotsRoot = document.getElementById(dotsId);
    if (!slidesRoot || !Array.isArray(items) || items.length === 0) return;

    const limited = items.slice(0, maxItems);
    slidesRoot.innerHTML = '';
    if (dotsRoot) dotsRoot.innerHTML = '';

    // Grille d'empilement : tous les slides occupent la même cellule,
    // seule l'opacité change — pas de switch absolute/relative qui casse la hauteur.
    slidesRoot.style.display = 'grid';

    limited.forEach((item, idx) => {
        const slide = document.createElement('div');
        slide.style.gridArea = '1 / 1';
        slide.style.transition = 'opacity 0.5s ease';
        slide.style.opacity = idx === 0 ? '1' : '0';
        slide.style.pointerEvents = idx === 0 ? '' : 'none';
        slide.innerHTML = renderSlide(item);
        slidesRoot.appendChild(slide);

        if (dotsRoot) {
            const dot = document.createElement('button');
            dot.style.cssText = 'width:10px;height:10px;border-radius:50%;border:none;cursor:pointer;transition:opacity 0.3s,background 0.3s;background:' + (idx === 0 ? '#ff4d6d' : '#94a3b8') + ';opacity:' + (idx === 0 ? '1' : '0.4');
            dot.setAttribute('aria-label', 'Aller à l\'élément ' + (idx + 1));
            dot.addEventListener('click', () => setActive(idx));
            dotsRoot.appendChild(dot);
        }
    });

    const slides = Array.from(slidesRoot.children);
    const dots = dotsRoot ? Array.from(dotsRoot.children) : [];
    let current = 0;

    function setActive(index) {
        slides.forEach((s, i) => {
            s.style.opacity = i === index ? '1' : '0';
            s.style.pointerEvents = i === index ? '' : 'none';
        });
        dots.forEach((d, i) => {
            d.style.background = i === index ? '#ff4d6d' : '';
            d.style.opacity = i === index ? '1' : '0.4';
        });
        current = index;
    }

    let timer = setInterval(() => {
        const next = (current + 1) % slides.length;
        setActive(next);
    }, intervalMs);

    // Pause l'autoplay si l'utilisateur interagit avec les dots
    if (dotsRoot) {
        dotsRoot.addEventListener('click', () => {
            clearInterval(timer);
            timer = setInterval(() => {
                const next = (current + 1) % slides.length;
                setActive(next);
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
    // Sur la page d'accueil, les chemins relatifs partent de la racine du projet
    return path;
}

document.addEventListener('DOMContentLoaded', () => {
    // Ne construire les carrousels que sur la page d'accueil
    if (document.getElementById('homeBlogCarousel') && window.BLOG_ARTICLES) {
        const articles = sortByDateDesc(window.BLOG_ARTICLES);
        buildInfiniteScroll({
            items: articles,
            trackId: 'homeBlogSlides',
            renderCard: (article) => {
                const imgSrc = resolveHomeImage(article.image || '');
                const link = 'pages/blog/article.html?id=' + encodeURIComponent(article.id);
                const desc = article.description || '';
                return `
                    <a href="${link}" class="glass rounded-2xl flex flex-col overflow-hidden hover:scale-[1.02] transition-transform duration-300 block">
                        <div class="h-44 bg-slate-200 dark:bg-slate-800 overflow-hidden flex-shrink-0">
                            ${imgSrc ? `<img src="${imgSrc}" alt="${article.title || ''}" class="w-full h-full object-cover object-center" loading="lazy">` : '<div class="w-full h-full flex items-center justify-center text-4xl">📝</div>'}
                        </div>
                        <div class="p-4 flex flex-col flex-1">
                            <h3 class="font-bold text-sm leading-snug mb-1">${article.title}</h3>
                            ${desc ? `<p class="text-slate-500 dark:text-slate-400 text-xs line-clamp-2">${desc}</p>` : ''}
                        </div>
                    </a>
                `;
            }
        });
    }

    if (document.getElementById('homeWebCarousel') && window.WEB_PROJECTS) {
        const projects = sortByDateDesc(window.WEB_PROJECTS);
        buildCarousel({
            items: projects,
            maxItems: 3,
            slidesId: 'homeWebSlides',
            dotsId: 'homeWebDots',
            renderSlide: (project) => {
                const imgSrc = resolveHomeImage(project.image || '');
                const tags = Array.isArray(project.tags) ? project.tags : [];
                const demoUrl = project.demoUrl || project.url || '';
                const projectPageUrl = 'pages/web/projets-web.html';
                return `
                    <div class="flex justify-center">
                      <div class="glass rounded-3xl w-full max-w-xs flex flex-col items-stretch overflow-hidden">
                        <div class="h-52 bg-slate-200 dark:bg-slate-800 overflow-hidden">
                            ${imgSrc ? `<img src="${imgSrc}" alt="${project.title || ''}" class="w-full h-full object-cover object-center" loading="lazy">` : `<div class="w-full h-full flex items-center justify-center text-hibiscus text-4xl">💻</div>`}
                        </div>
                        <div class="p-6 flex-1 flex flex-col">
                            <h3 class="text-xl font-bold mb-2">${project.title}</h3>
                            ${project.description ? `<p class="text-slate-600 dark:text-slate-400 text-sm mb-4">${project.description}</p>` : ''}
                            ${tags.length ? `<div class="flex gap-2 flex-wrap mb-4">${tags.map(t => `<span class="px-3 py-1 bg-slate-200 dark:bg-slate-700 rounded-lg text-xs font-bold">${t}</span>`).join('')}</div>` : ''}
                            <div class="mt-auto pt-2 flex flex-col gap-2">
                                <a href="${projectPageUrl}" class="w-full inline-flex justify-center items-center bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900 font-bold py-2.5 px-4 rounded-xl text-sm hover:brightness-110 transition">
                                    Consulter le projet
                                </a>
                                ${demoUrl ? `<a href="${demoUrl}" target="_blank" rel="noopener" class="w-full inline-flex justify-center items-center bg-hibiscus text-white font-bold py-2.5 px-4 rounded-xl text-sm hover:brightness-110 transition">
                                    Voir la démo
                                </a>` : ''}
                            </div>
                        </div>
                      </div>
                    </div>
                `;
            }
        });
    }

    if (document.getElementById('homeVideoCarousel') && window.VIDEO_PROJECTS) {
        const videos = sortByDateDesc(window.VIDEO_PROJECTS);
        buildCarousel({
            items: videos,
            maxItems: 3,
            slidesId: 'homeVideoSlides',
            dotsId: 'homeVideoDots',
            renderSlide: (video) => {
                const imgSrc = resolveHomeImage(video.image || '');
                const playIconSvg = '<svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10 fill-current" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>';
                const title = video.title || '';
                const desc = video.description || '';
                const demoUrl = video.url || '';
                const projectPageUrl = 'pages/video/projets-video.html';
                return `
                    <div class="flex justify-center">
                      <div class="glass bg-slate-900/80 text-white rounded-3xl w-full max-w-xs flex flex-col items-stretch overflow-hidden">
                        <div class="h-52 bg-slate-800 overflow-hidden relative">
                            ${imgSrc ? `<img src="${imgSrc}" alt="${title}" class="w-full h-full object-cover object-center" loading="lazy">` : ''}
                            <div class="absolute inset-0 bg-black/30 flex items-center justify-center">
                                <div class="w-16 h-16 bg-white/20 backdrop-blur rounded-full flex items-center justify-center group-hover:bg-hibiscus transition">
                                    ${playIconSvg}
                                </div>
                            </div>
                        </div>
                        <div class="p-6 flex-1 flex flex-col">
                            <h3 class="text-xl font-bold mb-2">${title}</h3>
                            ${desc ? `<p class="text-slate-200 text-sm mb-4">${desc}</p>` : ''}
                            <div class="mt-auto pt-2 flex flex-col gap-2">
                                <a href="${projectPageUrl}" class="w-full inline-flex justify-center items-center bg-slate-100 text-slate-900 font-bold py-2.5 px-4 rounded-xl text-sm hover:brightness-110 transition">
                                    Consulter le projet
                                </a>
                                ${demoUrl ? `<a href="${demoUrl}" target="_blank" rel="noopener" class="w-full inline-flex justify-center items-center bg-hibiscus text-white font-bold py-2.5 px-4 rounded-xl text-sm hover:brightness-110 transition">
                                    Voir la démo
                                </a>` : ''}
                            </div>
                        </div>
                      </div>
                    </div>
                `;
            }
        });
    }
});

