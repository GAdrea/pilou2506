/* ============================================================
   projet.js — Page projet web : route historique projet.html?id=...

   Le rendu HTML est délégué à project-render.js (module partagé
   avec scripts/generate-static-pages.js, qui pré-génère les fiches
   statiques /pages/web/details/{id}.html pour le SEO).

   Ces fiches pré-rendues sont 100% statiques et n'ont pas besoin
   de ce script pour s'afficher.
   ============================================================ */

const BASE_URL  = '../..';
const LIST_HREF = 'projets-web.html';

// ─── Helpers ─────────────────────────────────────────────────

function getProjectId() {
    return new URLSearchParams(window.location.search).get('id') || '';
}

function getProjects() {
    const list = window.WEB_PROJECTS;
    return Array.isArray(list) ? list : [];
}

function findProject(id) {
    return getProjects().find(p => p.id === id) || null;
}

function getRenderer() {
    return window.ProjectRender.create({
        baseUrl: BASE_URL,
        listHref: LIST_HREF,
        hrefFor: (id) => 'details/' + encodeURIComponent(id) + '.html'
    });
}

// ─── Rendu principal ────────────────────────────────────────────

function renderNotFound(container) {
    container.innerHTML = `
        <div class="max-w-3xl mx-auto text-center py-24">
            <p class="text-2xl font-bold mb-4">Projet introuvable</p>
            <p class="text-slate-500 mb-8">Ce projet n'existe pas ou a été retiré.</p>
            <a href="${LIST_HREF}" class="hud-btn hud-btn-primary">← Retour aux projets</a>
        </div>`;
}

function renderProject() {
    const container = document.getElementById('projetContainer');
    if (!container) return;

    const id = getProjectId();
    const project = findProject(id);

    if (!project) {
        renderNotFound(container);
        return;
    }

    document.title = project.title + ' | Pilou - Portfolio';
    container.innerHTML = getRenderer().renderProjectBody(project, getProjects());
}

document.addEventListener('DOMContentLoaded', renderProject);
