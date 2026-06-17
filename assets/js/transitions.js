/* ============================================================
   transitions.js — Loader HUD futuriste + transitions de page
   ============================================================ */

(function () {

    const RING_CIRCUMFERENCE = 440; // 2 * π * 70, arrondi (cf. style.css)

    const CONSOLE_LINES = [
        '> mounting filesystem...',
        '> resolving assets...',
        '> compiling tailwind...',
        '> sync fukuoka_node...',
        '> ready.',
    ];

    function $(id) { return document.getElementById(id); }

    function setRing(pct) {
        const ring = $('loaderRingProgress');
        if (!ring) return;
        const offset = RING_CIRCUMFERENCE - (RING_CIRCUMFERENCE * pct / 100);
        ring.style.strokeDashoffset = offset;
    }

    function setPct(pct) {
        const el = $('loaderPct');
        if (el) el.textContent = Math.round(pct) + '%';
    }

    function setBar(pct) {
        const el = $('loaderBarFill');
        if (el) el.style.width = pct + '%';
    }

    function setStatus(label) {
        const el = $('loaderStatus');
        if (el) el.textContent = label;
    }

    function triggerGlitch() {
        const logo = $('loaderLogo');
        if (!logo) return;
        logo.classList.remove('glitch');
        void logo.offsetWidth; // reflow pour relancer l'animation
        logo.classList.add('glitch');
    }

    function printConsoleLine(text, delay) {
        const consoleEl = $('loaderConsole');
        if (!consoleEl) return;
        setTimeout(() => {
            const span = document.createElement('span');
            span.textContent = text;
            consoleEl.appendChild(span);
            while (consoleEl.children.length > 3) {
                consoleEl.removeChild(consoleEl.firstChild);
            }
        }, delay);
    }

    function animateProgress(from, to, duration, onUpdate, onDone) {
        const start = performance.now();
        function step(now) {
            const t = Math.min((now - start) / duration, 1);
            const eased = 1 - Math.pow(1 - t, 2);
            const value = from + (to - from) * eased;
            onUpdate(value);
            if (t < 1) {
                requestAnimationFrame(step);
            } else if (onDone) {
                onDone();
            }
        }
        requestAnimationFrame(step);
    }

    function runLoaderSequence() {
        const steps = [
            { pct: 22,  label: 'INITIALISATION SYSTÈME', delay: 60   },
            { pct: 48,  label: 'CHARGEMENT DES ASSETS',  delay: 320  },
            { pct: 74,  label: 'SYNCHRONISATION HUD',     delay: 600  },
            { pct: 95,  label: 'PRESQUE PRÊT',            delay: 880  },
            { pct: 100, label: 'SYSTÈME PRÊT ✓',          delay: 1120 },
        ];

        let lastPct = 0;
        steps.forEach(({ pct, label, delay }) => {
            setTimeout(() => {
                animateProgress(lastPct, pct, 280, (v) => {
                    setRing(v);
                    setPct(v);
                    setBar(v);
                });
                setStatus(label);
                lastPct = pct;
            }, delay);
        });

        CONSOLE_LINES.forEach((line, i) => {
            printConsoleLine(line, 100 + i * 220);
        });

        setTimeout(triggerGlitch, 500);
    }

    function initLoader() {
        const loader = $('page-loader');
        if (!loader) {
            revealPage();
            return;
        }

        runLoaderSequence();

        setTimeout(() => {
            loader.classList.add('loader-hide');
            revealPage();
            setTimeout(() => loader.classList.add('loader-gone'), 550);
        }, 1450);
    }

    function revealPage() {
        document.body.classList.add('page-loaded');
    }

    function initTransitions() {
        document.addEventListener('click', function (e) {
            const link = e.target.closest('a[href]');
            if (!link) return;

            const href = link.getAttribute('href');
            if (!href) return;

            if (
                href.startsWith('#') ||
                href.startsWith('mailto') ||
                href.startsWith('tel') ||
                href.startsWith('javascript') ||
                link.target === '_blank' ||
                link.hostname !== window.location.hostname
            ) return;

            e.preventDefault();
            showExitOverlay();
            document.body.classList.add('page-exit');

            setTimeout(() => {
                window.location.href = href;
            }, 400);
        });
    }

    function showExitOverlay() {
        const loader = $('page-loader');
        if (!loader) return;
        loader.classList.remove('loader-gone', 'loader-hide');
        setRing(100);
        setPct(100);
        setBar(100);
        setStatus('NAVIGATION...');
        triggerGlitch();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initLoader);
    } else {
        initLoader();
    }

    initTransitions();

})();
