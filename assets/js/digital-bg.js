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

    // Révélations au scroll (générique, partagé sur toutes les pages).
    // Si une page a déjà sa propre logique de reveal plus avancée
    // (cascade, compteurs...), elle pose window.__customRevealHandled
    // avant de charger ce script, pour éviter un double traitement.
    if (!window.__customRevealHandled) {
        const revealEls = document.querySelectorAll('.reveal');
        if (revealEls.length) {
            const revealObserver = new IntersectionObserver((entries) => {
                entries.forEach((entry) => {
                    if (!entry.isIntersecting) return;
                    entry.target.classList.add('visible');
                    revealObserver.unobserve(entry.target);
                });
            }, { threshold: 0.15 });
            revealEls.forEach(el => revealObserver.observe(el));
        }
    }

    // Canvas lignes digitales
    const canvas = document.getElementById('particles-canvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const LINE_COUNT   = 45;
    const GRID_SPACING = 40;
    const NODE_COUNT    = 55;
    const NODE_LINK_DIST = 130;
    const SCAN_PERIOD   = 14000; // ms, aller-retour complet du faisceau
    const prefersReducedMotion = !!(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches);
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
        initNodes();
    }
    window.addEventListener('resize', resize);

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

    // ─── Constellation de nœuds connectés (effet "circuit/réseau") ────
    class Node {
        constructor() { this.reset(); }
        reset() {
            this.x  = Math.random() * canvas.width;
            this.y  = Math.random() * canvas.height;
            const angle = Math.random() * Math.PI * 2;
            const speed = 0.12 + Math.random() * 0.18;
            this.vx = Math.cos(angle) * speed;
            this.vy = Math.sin(angle) * speed;
            this.radius = 1 + Math.random() * 1.4;
            this.color  = Math.random() < 0.85 ? '0, 212, 255' : '255, 77, 109';
        }
        update() {
            this.x += this.vx;
            this.y += this.vy;
            if (this.x < -20) this.x = canvas.width + 20;
            if (this.x > canvas.width + 20) this.x = -20;
            if (this.y < -20) this.y = canvas.height + 20;
            if (this.y > canvas.height + 20) this.y = -20;
        }
    }

    let nodes = [];
    function initNodes() {
        nodes = Array.from({ length: NODE_COUNT }, () => new Node());
    }
    initNodes();

    function drawNodes() {
        for (let i = 0; i < nodes.length; i++) {
            for (let j = i + 1; j < nodes.length; j++) {
                const dx = nodes[i].x - nodes[j].x;
                const dy = nodes[i].y - nodes[j].y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < NODE_LINK_DIST) {
                    const alpha = (1 - dist / NODE_LINK_DIST) * 0.18;
                    ctx.strokeStyle = 'rgba(0, 212, 255, ' + alpha + ')';
                    ctx.lineWidth   = 0.6;
                    ctx.beginPath();
                    ctx.moveTo(nodes[i].x, nodes[i].y);
                    ctx.lineTo(nodes[j].x, nodes[j].y);
                    ctx.stroke();
                }
            }
        }
        nodes.forEach(n => {
            ctx.save();
            ctx.shadowBlur  = 6;
            ctx.shadowColor = 'rgb(' + n.color + ')';
            ctx.fillStyle   = 'rgba(' + n.color + ', 0.8)';
            ctx.beginPath();
            ctx.arc(n.x, n.y, n.radius, 0, Math.PI * 2);
            ctx.fill();
            ctx.restore();
        });
    }

    // ─── Faisceau de scan ambiant (sweep vertical doux, en boucle) ────
    function drawScanBeam(ts) {
        const phase = (ts % SCAN_PERIOD) / SCAN_PERIOD;
        const wave  = (Math.sin(phase * Math.PI * 2 - Math.PI / 2) + 1) / 2;
        const beamY = wave * canvas.height;
        const beamH = Math.max(120, canvas.height * 0.18);

        const grad = ctx.createLinearGradient(0, beamY - beamH / 2, 0, beamY + beamH / 2);
        grad.addColorStop(0,   'rgba(0, 212, 255, 0)');
        grad.addColorStop(0.5, 'rgba(0, 212, 255, 0.05)');
        grad.addColorStop(1,   'rgba(0, 212, 255, 0)');

        ctx.save();
        ctx.fillStyle = grad;
        ctx.fillRect(0, beamY - beamH / 2, canvas.width, beamH);
        ctx.restore();
    }

    // ─── Parallax léger au mouvement de la souris ─────────────────────
    let mouseTX = 0, mouseTY = 0;
    let parallaxX = 0, parallaxY = 0;
    const PARALLAX_MAX = 14;
    if (!prefersReducedMotion) {
        window.addEventListener('mousemove', (e) => {
            mouseTX = (e.clientX / window.innerWidth  - 0.5) * 2;
            mouseTY = (e.clientY / window.innerHeight - 0.5) * 2;
        });
    }

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

    function animate(ts) {
        drawBackground();

        if (!prefersReducedMotion) {
            parallaxX += (mouseTX * PARALLAX_MAX - parallaxX) * 0.04;
            parallaxY += (mouseTY * PARALLAX_MAX - parallaxY) * 0.04;
        }

        ctx.save();
        ctx.translate(parallaxX, parallaxY);
        drawGrid();
        drawNodes();
        ctx.restore();

        if (!prefersReducedMotion) drawScanBeam(ts || 0);

        lines.forEach((line, i) => {
            line.update();
            line.draw();
            if (line.done) lines[i] = new DigitalLine();
        });
        nodes.forEach(n => n.update());

        requestAnimationFrame(animate);
    }

    resize();
    requestAnimationFrame(animate);
})();
