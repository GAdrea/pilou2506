/* ============================================================
   project-render.js — Rendu HTML des fiches projet (module partagé)

   Même principe qu'article-render.js : fonctions pures, utilisées
   à la fois côté navigateur (projet.html?id=...) et côté Node
   (scripts/generate-static-pages.js) pour pré-générer les fiches
   statiques /pages/web/details/*.html.
   ============================================================ */

(function (root, factory) {
    if (typeof module === 'object' && module.exports) {
        module.exports = factory();
    } else {
        root.ProjectRender = factory();
    }
}(typeof self !== 'undefined' ? self : this, function () {
    'use strict';

    function escapeHtml(text) {
        if (text === null || text === undefined) return '';
        return String(text)
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#39;');
    }

    function create(ctx) {
        ctx = ctx || {};
        const baseUrl  = ctx.baseUrl || '.';
        const hrefFor  = ctx.hrefFor || function (id) { return encodeURIComponent(id) + '.html'; };
        const listHref = ctx.listHref || 'projets-web.html';

        function imageSrc(path) {
            if (!path) return '';
            if (path.startsWith('http') || path.startsWith('//')) return path;
            return baseUrl + '/' + path.replace(/^\//, '');
        }

        function resolveUrl(path) {
            if (!path || path === '#') return '';
            if (path.startsWith('http://') || path.startsWith('https://') || path.startsWith('//')) return path;
            return baseUrl + '/' + path.replace(/^\//, '');
        }

        function renderOtherProjects(currentId, projects) {
            const others = projects.filter(p => p.id !== currentId).slice(0, 3);
            if (!others.length) return '';

            const cards = others.map(p => {
                const img = imageSrc(p.image);
                return `
        <a href="${hrefFor(p.id)}"
           class="hud-card group flex flex-col overflow-hidden hover:border-neonCyan transition">
            <div class="h-32 overflow-hidden bg-hudSurface">
                ${img
                        ? `<img src="${img}" alt="${escapeHtml(p.title)}" class="w-full h-full object-contain group-hover:scale-110 transition duration-500" loading="lazy">`
                        : `<div class="w-full h-full flex items-center justify-center text-3xl" style="color:#00d4ff">💻</div>`}
            </div>
            <div class="p-4">
                <p class="text-sm font-bold leading-snug group-hover:text-neonCyan transition">${escapeHtml(p.title)}</p>
            </div>
        </a>`;
            }).join('');

            return `
    <section class="mt-16 pt-10 border-t border-slate-800">
        <p class="text-xs text-slate-500 uppercase font-bold tracking-widest mb-6">Autres projets</p>
        <div class="grid sm:grid-cols-3 gap-4">${cards}</div>
    </section>`;
        }

        function renderProjectBody(project, projects) {
            const img      = imageSrc(project.image);
            const demoUrl  = resolveUrl(project.demoUrl || project.url);
            const tags     = Array.isArray(project.tags) ? project.tags : [];
            const content  = project.content || (project.description ? `<p>${escapeHtml(project.description)}</p>` : '');

            return `
        <!-- Fil d'Ariane -->
        <div class="max-w-3xl mx-auto flex items-center gap-2 text-sm text-slate-500 mb-8">
            <a href="${listHref}" class="hover:text-neonCyan transition">Projets Web</a>
            <span>/</span>
            <span class="text-slate-400 truncate max-w-xs">${escapeHtml(project.title)}</span>
        </div>

        <!-- Image hero : pleine largeur du conteneur pour plus de présence -->
        ${img ? `<div class="rounded-xl overflow-hidden mb-10 aspect-video bg-hudSurface" style="border:1px solid rgba(0,212,255,0.12); box-shadow:0 0 50px rgba(0,212,255,0.08)">
            <img src="${img}" alt="${escapeHtml(project.title)}" class="w-full h-full object-contain">
        </div>` : ''}

        <div class="max-w-3xl mx-auto">
            <!-- En-tête -->
            <header class="mb-8">
                <h1 class="text-3xl md:text-4xl font-bold leading-tight mb-4">${escapeHtml(project.title)}</h1>
                ${tags.length ? `<div class="flex gap-2 flex-wrap mb-5">${tags.map(t => `<span class="hud-tag">${escapeHtml(t)}</span>`).join('')}</div>` : ''}
                <div class="flex flex-wrap gap-3">
                    ${demoUrl ? `<a href="${demoUrl}" target="_blank" rel="noopener" class="hud-btn hud-btn-primary">Voir la démo</a>` : ''}
                    <a href="${listHref}" class="hud-btn hud-btn-outline">← Tous les projets</a>
                </div>
            </header>

            <!-- Description complète -->
            <div class="article-content prose-pilou">${content}</div>

            <!-- But du projet -->
            ${project.goal ? `
            <div class="hud-card p-6 md:p-8 mt-10" style="border-color: rgba(255, 77, 109, 0.3)">
                <p class="text-xs uppercase font-bold tracking-widest mb-3" style="color:#ff4d6d">🎯 Le but du projet</p>
                <p class="text-slate-300 leading-relaxed">${escapeHtml(project.goal)}</p>
            </div>` : ''}

            <!-- Autres projets -->
            ${renderOtherProjects(project.id, projects)}
        </div>
    `;
        }

        return {
            imageSrc,
            resolveUrl,
            renderOtherProjects,
            renderProjectBody,
            hrefFor
        };
    }

    return { escapeHtml, create };
}));
