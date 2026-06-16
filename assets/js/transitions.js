/* ============================================================
   transitions.js — Loader HUD + transitions entre pages
   ============================================================ */

(function () {

    // ─── Loader ──────────────────────────────────────────────

    function initLoader() {
        const loader = document.getElementById('page-loader');
        if (!loader) {
            // Pas de loader → on affiche quand même la page
            revealPage();
            return;
        }

        // Lancer la barre de progression
        const fill = loader.querySelector('.loader-bar-fill');
        const status = loader.querySelector('.loader-status');

        const steps = [
            { pct: 30,  label: 'INITIALISATION...', delay: 80  },
            { pct: 65,  label: 'CHARGEMENT...',      delay: 300 },
            { pct: 90,  label: 'PRESQUE PRÊT...',    delay: 550 },
            { pct: 100, label: 'SYSTÈME PRÊT',       delay: 800 },
        ];

        steps.forEach(({ pct, label, delay }) => {
            setTimeout(() => {
                if (fill)   fill.style.width = pct + '%';
                if (status) status.textContent = label;
            }, delay);
        });

        // Masquer le loader + révéler la page
        setTimeout(() => {
            loader.classList.add('loader-hide');
            revealPage();
            setTimeout(() => loader.classList.add('loader-gone'), 500);
        }, 1150);
    }

    // ─── Révélation de la page ────────────────────────────────

    function revealPage() {
        document.body.classList.add('page-loaded');
    }

    // ─── Transitions sortantes ────────────────────────────────

    function initTransitions() {
        document.addEventListener('click', function (e) {
            const link = e.target.closest('a[href]');
            if (!link) return;

            const href = link.getAttribute('href');
            if (!href) return;

            // Ignorer : ancres, externes, nouvel onglet, mailto/tel
            if (
                href.startsWith('#') ||
                href.startsWith('mailto') ||
                href.startsWith('tel') ||
                href.startsWith('javascript') ||
                link.target === '_blank' ||
                link.hostname !== window.location.hostname
            ) return;

            e.preventDefault();

            // Ajouter le loader de transition (overlay rapide)
            showExitOverlay();

            document.body.classList.add('page-exit');

            setTimeout(() => {
                window.location.href = href;
            }, 380);
        });
    }

    // ─── Overlay de sortie (flash court) ─────────────────────

    function showExitOverlay() {
        // Réutilise le loader s'il est disponible
        const loader = document.getElementById('page-loader');
        if (loader) {
            loader.classList.remove('loader-gone', 'loader-hide');
            const fill = loader.querySelector('.loader-bar-fill');
            const status = loader.querySelector('.loader-status');
            if (fill)   fill.style.width = '100%';
            if (status) status.textContent = 'NAVIGATION...';
        }
    }

    // ─── Init ─────────────────────────────────────────────────

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initLoader);
    } else {
        initLoader();
    }

    initTransitions();

})();
