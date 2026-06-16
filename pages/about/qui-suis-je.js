/* ============================================================
   qui-suis-je.js — Animations : compteurs, barres langues,
                    révélations au scroll (IntersectionObserver)
   ============================================================ */

// ─── Menu mobile ─────────────────────────────────────────────
const burgerBtn  = document.getElementById('burgerBtn');
const closeMenu  = document.getElementById('closeMenu');
const mobileMenu = document.getElementById('mobileMenu');
const mobileLinks = document.querySelectorAll('.mobile-nav-link');

function toggleMenu() {
    mobileMenu.classList.toggle('open');
    document.body.classList.toggle('overflow-hidden');
}
if (burgerBtn)  burgerBtn.addEventListener('click', toggleMenu);
if (closeMenu)  closeMenu.addEventListener('click', toggleMenu);
mobileLinks.forEach(l => l.addEventListener('click', toggleMenu));

// ─── IntersectionObserver — révélations au scroll ────────────
const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        // Décalage en cascade pour les enfants d'une même section
        const delay = el.dataset.delay || 0;
        setTimeout(() => el.classList.add('visible'), delay);
        observer.unobserve(el);
    });
}, { threshold: 0.15 });

document.querySelectorAll('.reveal').forEach((el, i) => {
    el.dataset.delay = (i % 4) * 80; // cascade légère
    observer.observe(el);
});

// ─── Compteurs animés ─────────────────────────────────────────
function animateCount(el, target, duration = 1200) {
    const start = performance.now();
    function step(now) {
        const progress = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
        el.textContent = Math.round(eased * target);
        if (progress < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
}

const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        const target = parseInt(el.dataset.count, 10);
        if (!isNaN(target)) animateCount(el, target);
        counterObserver.unobserve(el);
    });
}, { threshold: 0.5 });

document.querySelectorAll('[data-count]').forEach(el => counterObserver.observe(el));

// ─── Barres de langues ────────────────────────────────────────
function buildLangBars() {
    const container = document.getElementById('langSkills');
    if (!container) return;

    container.querySelectorAll('[data-lang]').forEach(el => {
        const label = el.dataset.lang;
        const pct   = parseInt(el.dataset.pct, 10);
        const color = el.dataset.color || '#00d4ff';

        el.innerHTML = `
            <div class="flex justify-between items-center mb-1">
                <span class="text-sm font-medium text-slate-300">${label}</span>
                <span class="text-xs text-slate-500 lang-pct-label">0%</span>
            </div>
            <div class="lang-bar-track">
                <div class="lang-bar-fill" style="background:${color}"></div>
            </div>`;
    });
}

const barObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const container = entry.target;
        container.querySelectorAll('[data-lang]').forEach(el => {
            const pct  = parseInt(el.dataset.pct, 10);
            const fill = el.querySelector('.lang-bar-fill');
            const lbl  = el.querySelector('.lang-pct-label');
            if (fill) {
                setTimeout(() => {
                    fill.style.width = pct + '%';
                    // Animer le chiffre en parallèle
                    let current = 0;
                    const step = () => {
                        current = Math.min(current + 2, pct);
                        if (lbl) lbl.textContent = current + '%';
                        if (current < pct) requestAnimationFrame(step);
                    };
                    requestAnimationFrame(step);
                }, 200);
            }
        });
        barObserver.unobserve(container);
    });
}, { threshold: 0.3 });

buildLangBars();
const langSection = document.getElementById('langSkills');
if (langSection) barObserver.observe(langSection);
