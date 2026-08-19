/* ============================================================
   qui-suis-je.js — Animations : compteurs, barres langues,
                    révélations au scroll (IntersectionObserver)
   ============================================================ */

// ─── Menu mobile ─────────────────────────────────────────────
const burgerBtn  = document.getElementById('burgerBtn');
const closeMenu  = document.getElementById('closeMenu');
const mobileMenu = document.getElementById('mobileMenu');
const mobileLinks = document.querySelectorAll('.mobile-nav-link');

function handleMenuKeydown(e) {
    if (e.key !== 'Tab') return;
    const focusable = Array.from(mobileMenu.querySelectorAll('a, button'));
    const first = focusable[0];
    const last  = focusable[focusable.length - 1];
    if (e.shiftKey) {
        if (document.activeElement === first) { e.preventDefault(); last.focus(); }
    } else {
        if (document.activeElement === last)  { e.preventDefault(); first.focus(); }
    }
}

function toggleMenu() {
    mobileMenu.classList.toggle('open');
    document.body.classList.toggle('overflow-hidden');
    const isOpen = mobileMenu.classList.contains('open');
    if (burgerBtn) burgerBtn.setAttribute('aria-expanded', String(isOpen));
    if (isOpen) {
        mobileMenu.addEventListener('keydown', handleMenuKeydown);
        const first = mobileMenu.querySelector('button, a');
        if (first) first.focus();
    } else {
        mobileMenu.removeEventListener('keydown', handleMenuKeydown);
        if (burgerBtn) burgerBtn.focus();
    }
}
if (burgerBtn)  burgerBtn.addEventListener('click', toggleMenu);
if (closeMenu)  closeMenu.addEventListener('click', toggleMenu);
mobileLinks.forEach(l => l.addEventListener('click', toggleMenu));

// ─── IntersectionObserver — révélations au scroll ────────────
window.__customRevealHandled = true; // évite le doublon avec digital-bg.js
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

// Compteur articles dynamique
const articleCountEl = document.querySelector('[data-articles-count]');
if (articleCountEl && window.BLOG_ARTICLES) {
    articleCountEl.dataset.count = window.BLOG_ARTICLES.length;
}

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
                <span class="text-xs text-slate-400 lang-pct-label">0%</span>
            </div>
            <div class="lang-bar-track" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" aria-label="${label}">
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
            const track = el.querySelector('.lang-bar-track');
            const fill  = el.querySelector('.lang-bar-fill');
            const lbl   = el.querySelector('.lang-pct-label');
            if (fill) {
                setTimeout(() => {
                    fill.style.width = pct + '%';
                    if (track) track.setAttribute('aria-valuenow', pct);
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
