// digital-bg.js — Fond cyberpunk + menu mobile partagés sur toutes les pages
(function () {
    'use strict';

    // Dark mode permanent
    const html = document.documentElement;
    html.classList.add('dark');
    html.classList.remove('light');

    // Menu mobile
    const burgerBtn  = document.getElementById('burgerBtn');
    const closeMenuBtn = document.getElementById('closeMenu');
    const mobileMenu = document.getElementById('mobileMenu');
    const mobileLinks = document.querySelectorAll('.mobile-nav-link');

    function toggleMenu() {
        if (!mobileMenu) return;
        mobileMenu.classList.toggle('open');
        document.body.classList.toggle('overflow-hidden');
    }

    if (burgerBtn)     burgerBtn.addEventListener('click', toggleMenu);
    if (closeMenuBtn)  closeMenuBtn.addEventListener('click', toggleMenu);
    mobileLinks.forEach(link => link.addEventListener('click', toggleMenu));

    // Bouton scroll-to-top (index.html uniquement)
    const scrollTopBtn = document.getElementById('scrollTopBtn');
    if (scrollTopBtn) {
        window.addEventListener('scroll', () => {
            scrollTopBtn.classList.toggle('visible', window.scrollY > 500);
        });
        scrollTopBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // Canvas lignes digitales
    const canvas = document.getElementById('particles-canvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const LINE_COUNT   = 45;
    const GRID_SPACING = 40;
    const PALETTE = [
        '#00d4ff','#00d4ff','#00d4ff','#00b4d8',
        '#ff4d6d','#ff4d6d',
        '#3b82f6','#bc002d','#f59e0b'
    ];

    let bgGrad = null;

    function resize() {
        canvas.width  = window.innerWidth;
        canvas.height = window.innerHeight;
        bgGrad = null;
    }
    window.addEventListener('resize', resize);
    resize();

    class DigitalLine {
        constructor() { this.reset(); }

        reset() {
            const w = canvas.width, h = canvas.height;
            this.startX = Math.random() * w;
            this.startY = Math.random() * h;
            const angle = Math.floor(Math.random() * 8) * (Math.PI / 4);
            this.dx = Math.cos(angle);
            this.dy = Math.sin(angle);
            this.speed         = 1.5 + Math.random() * 3.5;
            this.segmentLength = 60  + Math.random() * 200;
            this.maxTravel     = this.segmentLength + Math.sqrt(w * w + h * h);
            this.headDist      = Math.random() * this.segmentLength * 0.8;
            this.done          = false;
            this.color         = PALETTE[Math.floor(Math.random() * PALETTE.length)];
            this.width         = 0.5 + Math.random() * 1.5;
            this.glow          = 8   + Math.random() * 12;
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
            ctx.lineWidth   = this.width;
            ctx.shadowBlur  = this.glow;
            ctx.shadowColor = this.color;

            try {
                const grad = ctx.createLinearGradient(tx, ty, hx, hy);
                grad.addColorStop(0,   'rgba(0,0,0,0)');
                grad.addColorStop(0.4, this.color + '55');
                grad.addColorStop(1,   this.color);
                ctx.strokeStyle = grad;
            } catch (_) {
                ctx.strokeStyle = this.color;
            }

            ctx.beginPath();
            ctx.moveTo(tx, ty);
            ctx.lineTo(hx, hy);
            ctx.stroke();

            // Nœud lumineux en tête
            ctx.beginPath();
            ctx.fillStyle   = '#ffffff';
            ctx.globalAlpha = 0.9;
            ctx.shadowBlur  = 14;
            ctx.arc(hx, hy, this.width + 0.8, 0, Math.PI * 2);
            ctx.fill();

            ctx.restore();
        }
    }

    let lines = Array.from({ length: LINE_COUNT }, () => new DigitalLine());

    function drawBackground() {
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
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    }

    function drawGrid() {
        ctx.save();
        ctx.strokeStyle = 'rgba(0, 212, 255, 0.04)';
        ctx.lineWidth   = 0.5;
        ctx.beginPath();
        for (let x = 0; x <= canvas.width;  x += GRID_SPACING) {
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
})();
