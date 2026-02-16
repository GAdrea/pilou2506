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

// --- PARTICULES ---
const canvas = document.getElementById('particles-canvas');
if (canvas) {
    const ctx = canvas.getContext('2d');
    let particles = [];

    function getColors() {
        return html.classList.contains('dark') 
            ? ['#ff4d6d', '#bc002d', '#475569', '#1e293b']
            : ['#ffb7c5', '#ff4d6d', '#002395', '#ff8c00'];
    }

    function resize() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    window.addEventListener('resize', resize);
    resize();

    class Particle {
        constructor() {
            this.reset();
        }
        reset() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 4 + 1;
            this.speedX = Math.random() * 1 - 0.5;
            this.speedY = Math.random() * 1 + 0.2;
            this.color = getColors()[Math.floor(Math.random() * 4)];
            this.opacity = Math.random() * 0.5 + 0.2;
        }
        update() {
            this.y += this.speedY;
            this.x += this.speedX;
            if (this.y > canvas.height) this.y = -10;
            if (this.x > canvas.width) this.x = 0;
            if (this.x < 0) this.x = canvas.width;
        }
        draw() {
            ctx.globalAlpha = this.opacity;
            ctx.fillStyle = this.color;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    for (let i = 0; i < 60; i++) particles.push(new Particle());

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach(p => {
            p.update();
            p.draw();
        });
        requestAnimationFrame(animate);
    }
    animate();
}

// --- HOME CAROUSELS (blog / web / vidéo) ---
function buildCarousel({ items, maxItems, slidesId, dotsId, renderSlide, intervalMs = 6000 }) {
    const slidesRoot = document.getElementById(slidesId);
    const dotsRoot = document.getElementById(dotsId);
    if (!slidesRoot || !Array.isArray(items) || items.length === 0) return;

    const limited = items.slice(0, maxItems);
    slidesRoot.innerHTML = '';
    if (dotsRoot) dotsRoot.innerHTML = '';

    limited.forEach((item, idx) => {
        const slide = document.createElement('div');
        slide.className = 'transition-opacity duration-500 ' + (idx === 0 ? 'opacity-100' : 'opacity-0 absolute inset-0');
        slide.innerHTML = renderSlide(item);
        slidesRoot.appendChild(slide);

        if (dotsRoot) {
            const dot = document.createElement('button');
            dot.className = 'w-2 h-2 rounded-full ' + (idx === 0 ? 'bg-hibiscus' : 'bg-slate-400/60');
            dot.setAttribute('aria-label', 'Aller à l’élément ' + (idx + 1));
            dot.addEventListener('click', () => setActive(idx));
            dotsRoot.appendChild(dot);
        }
    });

    const slides = Array.from(slidesRoot.children);
    const dots = dotsRoot ? Array.from(dotsRoot.children) : [];
    let current = 0;

    function setActive(index) {
        slides.forEach((s, i) => {
            if (i === index) {
                s.classList.remove('opacity-0', 'absolute');
                s.classList.add('opacity-100', 'relative');
            } else {
                s.classList.remove('opacity-100', 'relative');
                s.classList.add('opacity-0', 'absolute');
            }
        });
        dots.forEach((d, i) => {
            d.className = 'w-2 h-2 rounded-full ' + (i === index ? 'bg-hibiscus' : 'bg-slate-400/60');
        });
        current = index;
    }

    setInterval(() => {
        const next = (current + 1) % slides.length;
        setActive(next);
    }, intervalMs);
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
    // Ne construire les carrousels que sur la page d’accueil
    if (document.getElementById('homeBlogCarousel') && window.BLOG_ARTICLES) {
        const articles = sortByDateDesc(window.BLOG_ARTICLES);
        buildCarousel({
            items: articles,
            maxItems: 3,
            slidesId: 'homeBlogSlides',
            dotsId: 'homeBlogDots',
            renderSlide: (article) => {
                const imgSrc = resolveHomeImage(article.image || '');
                const link = 'pages/blog/article.html?id=' + encodeURIComponent(article.id);
                const desc = article.description || '';
                return `
                    <div class="flex justify-center">
                      <div class="glass rounded-3xl w-full max-w-xs flex flex-col items-stretch overflow-hidden">
                        <div class="h-64 bg-slate-200 dark:bg-slate-800 flex items-center justify-center">
                            ${imgSrc ? `<img src="${imgSrc}" alt="${article.title || ''}" class="max-h-full max-w-full object-contain" loading="lazy">` : ''}
                        </div>
                        <div class="p-6 flex-1 flex flex-col">
                            <h3 class="text-xl font-bold mb-2">${article.title}</h3>
                            ${desc ? `<p class="text-slate-600 dark:text-slate-400 text-sm mb-4">${desc}</p>` : ''}
                            <div class="mt-auto pt-2">
                                <a href="${link}" class="w-full inline-flex justify-center items-center bg-hibiscus text-white font-bold py-2.5 px-4 rounded-xl text-sm hover:brightness-110 transition">
                                    Consulter
                                </a>
                            </div>
                        </div>
                      </div>
                    </div>
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
                        <div class="h-64 bg-slate-200 dark:bg-slate-800 flex items-center justify-center">
                            ${imgSrc ? `<img src="${imgSrc}" alt="${project.title || ''}" class="max-h-full max-w-full object-contain" loading="lazy">` : `<div class="text-hibiscus text-4xl">💻</div>`}
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
                        <div class="h-64 bg-slate-800 flex items-center justify-center relative">
                            ${imgSrc ? `<img src="${imgSrc}" alt="${title}" class="max-h-full max-w-full object-contain" loading="lazy">` : ''}
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

