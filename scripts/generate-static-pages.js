#!/usr/bin/env node
/* ============================================================
   generate-static-pages.js — Pré-rendu SEO

   Génère, à partir de data/blog-data.js et data/web-data.js :
   - une vraie page HTML statique par article de blog
     → pages/blog/articles/{id}.html
   - une vraie page HTML statique par projet web
     → pages/web/details/{id}.html
   - un sitemap.xml à jour incluant toutes ces URLs

   Chaque page a un <title>, une <meta description>, un
   <link rel="canonical">, des balises Open Graph / Twitter Card
   et un bloc JSON-LD uniques — c'est le point qui manquait pour
   que Google indexe correctement chaque article/projet.

   Le rendu du contenu (HTML de l'article/projet) est délégué aux
   modules partagés pages/blog/article-render.js et
   pages/web/project-render.js, pour ne jamais avoir deux versions
   de la même logique qui divergent.

   Lancé automatiquement au build (voir "build" dans package.json),
   mais peut aussi être exécuté à la main :
     node scripts/generate-static-pages.js
   ============================================================ */

'use strict';

const fs = require('fs');
const path = require('path');
const vm = require('vm');

const ROOT = path.resolve(__dirname, '..');
const SITE_URL = 'https://pilou2506.vercel.app';

// ─── Chargement des données (fichiers window.X = [...]) ─────────

function loadWindowData(relPath) {
    const code = fs.readFileSync(path.join(ROOT, relPath), 'utf8');
    const sandbox = { window: {}, console };
    vm.createContext(sandbox);
    vm.runInContext(code, sandbox, { filename: relPath });
    return sandbox.window;
}

const blogWindow = loadWindowData('data/blog-data.js');
const webWindow = loadWindowData('data/web-data.js');

const BLOG_ARTICLES = Array.isArray(blogWindow.BLOG_ARTICLES) ? blogWindow.BLOG_ARTICLES : [];
const WEB_PROJECTS = Array.isArray(webWindow.WEB_PROJECTS) ? webWindow.WEB_PROJECTS : [];

const ArticleRender = require(path.join(ROOT, 'pages/blog/article-render.js'));
const ProjectRender = require(path.join(ROOT, 'pages/web/project-render.js'));

// ─── Dimensions d'image (anti-CLS) ───────────────────────────────
// Lecture directe des en-têtes PNG/JPEG, sans dépendance npm
// (cohérent avec le reste du projet : vanilla avant tout).
// Résultat mis en cache car une même image peut être référencée
// plusieurs fois (hero + carrousel + carte "articles similaires").

const dimensionsCache = new Map();

function readImageSize(absPath) {
    const buf = fs.readFileSync(absPath);

    // PNG : signature 8 octets, puis chunk IHDR (largeur/hauteur en big-endian
    // aux offsets 16 et 20)
    if (buf.length >= 24 && buf.readUInt32BE(0) === 0x89504e47 && buf.readUInt32BE(4) === 0x0d0a1a0a) {
        return { width: buf.readUInt32BE(16), height: buf.readUInt32BE(20) };
    }

    // JPEG : on parcourt les marqueurs jusqu'au premier SOF (Start Of Frame)
    if (buf.length >= 4 && buf[0] === 0xff && buf[1] === 0xd8) {
        let offset = 2;
        while (offset + 9 < buf.length) {
            if (buf[offset] !== 0xff) { offset += 1; continue; }
            const marker = buf[offset + 1];
            const isSOF = marker >= 0xc0 && marker <= 0xcf && marker !== 0xc4 && marker !== 0xc8 && marker !== 0xcc;
            if (isSOF) {
                return { height: buf.readUInt16BE(offset + 5), width: buf.readUInt16BE(offset + 7) };
            }
            if (marker === 0xd8 || marker === 0x01 || (marker >= 0xd0 && marker <= 0xd7)) {
                offset += 2; // marqueurs sans segment de longueur
                continue;
            }
            const segLength = buf.readUInt16BE(offset + 2);
            offset += 2 + segLength;
        }
    }

    return null;
}

function getImageDimensions(relPath) {
    if (!relPath || relPath.startsWith('http')) return null;
    const cleanPath = relPath.replace(/^\//, '');
    if (dimensionsCache.has(cleanPath)) return dimensionsCache.get(cleanPath);

    let dim = null;
    try {
        dim = readImageSize(path.join(ROOT, cleanPath));
    } catch (err) {
        console.warn(`⚠️  Dimensions illisibles pour ${cleanPath} : ${err.message}`);
    }
    dimensionsCache.set(cleanPath, dim);
    return dim;
}

const sortedArticles = ArticleRender.sortedArticles(BLOG_ARTICLES);

// ─── Garde-fous : ids manquants ou dupliqués ─────────────────────

function assertUniqueIds(list, label) {
    const seen = new Map();
    list.forEach((item, i) => {
        if (!item.id) throw new Error(`${label} : élément #${i} sans "id" — impossible de générer sa page.`);
        if (seen.has(item.id)) {
            throw new Error(`${label} : id dupliqué "${item.id}" (déjà utilisé). Chaque id doit être unique.`);
        }
        seen.set(item.id, true);
    });
}

assertUniqueIds(BLOG_ARTICLES, 'data/blog-data.js');
assertUniqueIds(WEB_PROJECTS, 'data/web-data.js');

function assertUniqueSlugs(list, label) {
    const seen = new Map();
    list.forEach((item) => {
        const slug = ArticleRender.slugify(item.id);
        if (seen.has(slug)) {
            throw new Error(
                `${label} : les ids "${seen.get(slug)}" et "${item.id}" donnent le même slug "${slug}". ` +
                `Renomme l'un des deux ids dans data/blog-data.js pour éviter un conflit d'URL.`
            );
        }
        seen.set(slug, item.id);
    });
}

assertUniqueSlugs(BLOG_ARTICLES, 'data/blog-data.js');

// ─── Utils texte / URLs ───────────────────────────────────────

function escapeHtml(text) {
    return ArticleRender.escapeHtml(text);
}

function absoluteUrl(p) {
    if (!p) return `${SITE_URL}/assets/img/posts/1764651106820.jpg`; // image par défaut du site
    if (p.startsWith('http')) return p;
    return `${SITE_URL}/${p.replace(/^\//, '')}`;
}

function truncate(text, max) {
    if (!text) return '';
    const clean = String(text).replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
    return clean.length > max ? clean.slice(0, max - 1).trimEnd() + '…' : clean;
}

function safeJsonLd(obj) {
    // Retire les clés undefined + échappe "</script>" pour ne jamais casser le tag.
    const clean = JSON.parse(JSON.stringify(obj));
    return JSON.stringify(clean).replace(/</g, '\\u003c');
}

// ─── Gabarits communs (nav / footer / scripts globaux) ───────────

function navBlock({ root, blogHref, webHref, active }) {
    return `
    <nav class="fixed top-0 w-full z-50 hud-nav-bar">
        <div class="max-w-7xl mx-auto flex justify-between items-center px-6 py-4">
            <a href="${root}/index.html" class="text-2xl font-black tracking-tighter">
                PI<span style="color:#00d4ff">L</span><span style="color:#ff4d6d">OU</span>
            </a>
            <div class="hidden lg:flex items-center space-x-8">
                <a href="${root}/index.html#home" class="nav-link">Accueil</a>
                <a href="${blogHref}" class="nav-link${active === 'blog' ? ' active' : ''}">Blog</a>
                <a href="${webHref}" class="nav-link${active === 'web' ? ' active' : ''}">Projets Web</a>
                <a href="${root}/pages/about/qui-suis-je.html" class="nav-link">Qui suis-je ?</a>
                <a href="${root}/index.html#contact" class="nav-link">Contact</a>
            </div>
            <div class="flex lg:hidden">
                <button id="burgerBtn" type="button" class="p-2" title="Menu" style="color:#00d4ff">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7" />
                    </svg>
                </button>
            </div>
        </div>
    </nav>

    <div id="mobileMenu" class="fixed inset-0 z-[60] flex flex-col items-center justify-center space-y-8 lg:hidden">
        <button id="closeMenu" type="button" class="absolute top-6 right-6" title="Fermer" style="color:#00d4ff">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-9 w-9" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
        </button>
        <a href="${root}/index.html#home" class="mobile-nav-link">// Accueil</a>
        <a href="${blogHref}" class="mobile-nav-link${active === 'blog' ? ' active' : ''}">// Blog</a>
        <a href="${webHref}" class="mobile-nav-link${active === 'web' ? ' active' : ''}">// Projets Web</a>
        <a href="${root}/pages/about/qui-suis-je.html" class="mobile-nav-link">// Qui suis-je ?</a>
        <a href="${root}/index.html#contact" class="mobile-nav-link">// Contact</a>
    </div>`;
}

function footerBlock(root) {
    return `
    <footer class="py-12 px-6 hud-footer">
        <div class="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
            <a href="${root}/index.html" class="text-xl font-black">
                PI<span style="color:#00d4ff">L</span><span style="color:#ff4d6d">OU</span>
            </a>
            <div class="flex items-center space-x-6 text-slate-400">
                <a href="https://youtube.com/@pilou2506?si=jvN2n2Nxd32YEn-u" aria-label="YouTube" title="YouTube" class="transition" style="color:#64748b" onmouseover="this.style.color='#00d4ff'" onmouseout="this.style.color='#64748b'">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" viewBox="0 0 24 24" fill="currentColor"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
                </a>
                <a href="https://www.instagram.com/pilou2506?igsh=aTA0dGJvc2lmZGZ4" aria-label="Instagram" title="Instagram" class="transition" style="color:#64748b" onmouseover="this.style.color='#00d4ff'" onmouseout="this.style.color='#64748b'">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
                </a>
            </div>
            <p class="text-xs text-slate-600">© Pilou</p>
        </div>
    </footer>`;
}

function headBlock({ root, title, description, canonical, ogImage, ogType, articlePublishedTime, jsonLd }) {
    const safeTitle = escapeHtml(title);
    const safeDesc = escapeHtml(description);
    return `<!doctype html>
<html lang="fr" class="dark">
<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${safeTitle}</title>
    <!-- Favicon -->
    <link rel="icon" type="image/x-icon" href="${root}/assets/favicon/favicon.ico" />
    <link rel="icon" type="image/png" sizes="32x32" href="${root}/assets/favicon/favicon-32x32.png" />
    <link rel="icon" type="image/png" sizes="16x16" href="${root}/assets/favicon/favicon-16x16.png" />
    <link rel="apple-touch-icon" sizes="180x180" href="${root}/assets/favicon/apple-touch-icon.png" />
    <link rel="manifest" href="${root}/assets/favicon/site.webmanifest" />
    <meta name="theme-color" content="#050a12" />
    <!-- SEO -->
    <meta name="description" content="${safeDesc}" />
    <meta name="author" content="Pilou" />
    <meta name="robots" content="index, follow" />
    <link rel="canonical" href="${canonical}" />
    <!-- Open Graph -->
    <meta property="og:type" content="${ogType}" />
    <meta property="og:site_name" content="Pilou Portfolio" />
    <meta property="og:title" content="${safeTitle}" />
    <meta property="og:description" content="${safeDesc}" />
    <meta property="og:url" content="${canonical}" />
    <meta property="og:image" content="${ogImage}" />
    <meta property="og:locale" content="fr_FR" />
    ${articlePublishedTime ? `<meta property="article:published_time" content="${articlePublishedTime}" />\n    ` : ''}<!-- Twitter Card -->
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${safeTitle}" />
    <meta name="twitter:description" content="${safeDesc}" />
    <meta name="twitter:image" content="${ogImage}" />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
      href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600;800&family=Noto+Sans+JP:wght@400;700&display=swap"
      rel="stylesheet"
    />
    <link rel="stylesheet" href="${root}/assets/css/tailwind.css" />
    <link rel="stylesheet" href="${root}/style.css" />
    <script type="application/ld+json">${safeJsonLd(jsonLd)}</script>
</head>`;
}

// ─── Génération des pages articles ───────────────────────────────

const ARTICLES_DIR = path.join(ROOT, 'pages/blog/articles');

function buildArticlePage(article) {
    const root = '../../..';
    const slug = ArticleRender.slugify(article.id);
    const canonical = `${SITE_URL}/pages/blog/articles/${slug}.html`;
    const title = `${article.title} | Pilou - Portfolio`;
    const description = truncate(article.description || article.content, 160)
        || `Un article de Pilou, expatrié franco-antillais à Fukuoka. ${article.title}`;
    const ogImage = absoluteUrl(article.image);
    const dateIso = /^\d{4}-\d{2}-\d{2}$/.test(article.date || '') ? article.date : undefined;
    const blogHref = `${root}/pages/blog/blog.html`;
    const webHref = `${root}/pages/web/projets-web.html`;

    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        headline: article.title,
        description,
        image: ogImage,
        datePublished: dateIso,
        inLanguage: 'fr-FR',
        author: { '@type': 'Person', name: 'Pilou', url: `${SITE_URL}/` },
        publisher: { '@type': 'Person', name: 'Pilou' },
        mainEntityOfPage: { '@type': 'WebPage', '@id': canonical }
    };

    const renderer = ArticleRender.create({
        baseUrl: root,
        blogHref,
        getImageDimensions,
        hrefFor: (id) => ArticleRender.slugify(id) + '.html'
    });

    const bodyHtml = renderer.renderArticleBody(article, sortedArticles, canonical);

    return `${headBlock({ root, title, description, canonical, ogImage, ogType: 'article', articlePublishedTime: dateIso, jsonLd })}
<body class="text-slate-100 min-h-screen">

    <canvas id="particles-canvas"></canvas>
    ${navBlock({ root, blogHref, webHref, active: 'blog' })}

    <main class="pt-28 pb-24 px-6" id="articleMain">
        <div class="max-w-3xl mx-auto" id="articleContainer">${bodyHtml}</div>
    </main>

    <!-- Lightbox : agrandir l'image (hero ou carrousel) au clic, navigable si plusieurs photos -->
    <div id="lightboxOverlay" class="lightbox-overlay" role="dialog" aria-modal="true" aria-hidden="true">
        <button type="button" id="lightboxClose" class="lightbox-close" aria-label="Fermer l'image">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
        </button>
        <button type="button" id="lightboxPrev" class="lightbox-nav lightbox-prev" aria-label="Photo précédente" hidden>‹</button>
        <button type="button" id="lightboxNext" class="lightbox-nav lightbox-next" aria-label="Photo suivante" hidden>›</button>
        <img id="lightboxImage" src="" alt="" />
        <div id="lightboxCounter" class="lightbox-counter" hidden></div>
    </div>
    ${footerBlock(root)}

    <script src="../article.js"></script>
    <script src="${root}/assets/js/digital-bg.js"></script>
    <script src="${root}/assets/js/vercel-analytics.js"></script>
    <script defer src="/_vercel/insights/script.js"></script>
    <script src="${root}/assets/js/vercel-speed-insights.js"></script>
    <script defer src="/_vercel/speed-insights/script.js"></script>
</body>
</html>
`;
}

// ─── Génération des pages projets ────────────────────────────────

const DETAILS_DIR = path.join(ROOT, 'pages/web/details');

function buildProjectPage(project) {
    const root = '../../..';
    const canonical = `${SITE_URL}/pages/web/details/${encodeURIComponent(project.id)}.html`;
    const title = `${project.title} | Pilou - Portfolio`;
    const description = truncate(project.goal || project.description || project.content, 160)
        || `Un projet web de Pilou : ${project.title}`;
    const ogImage = absoluteUrl(project.image);
    const blogHref = `${root}/pages/blog/blog.html`;
    const webHref = `${root}/pages/web/projets-web.html`;

    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'CreativeWork',
        name: project.title,
        description,
        image: ogImage,
        inLanguage: 'fr-FR',
        author: { '@type': 'Person', name: 'Pilou', url: `${SITE_URL}/` },
        mainEntityOfPage: { '@type': 'WebPage', '@id': canonical }
    };

    const renderer = ProjectRender.create({
        baseUrl: root,
        listHref: webHref,
        hrefFor: (id) => encodeURIComponent(id) + '.html'
    });

    const bodyHtml = renderer.renderProjectBody(project, WEB_PROJECTS);

    return `${headBlock({ root, title, description, canonical, ogImage, ogType: 'website', articlePublishedTime: undefined, jsonLd })}
<body class="text-slate-100 min-h-screen">

    <canvas id="particles-canvas"></canvas>
    ${navBlock({ root, blogHref, webHref, active: 'web' })}

    <main class="pt-28 pb-24 px-6" id="projetMain">
        <div class="max-w-4xl mx-auto" id="projetContainer">${bodyHtml}</div>
    </main>
    ${footerBlock(root)}

    <script src="${root}/assets/js/digital-bg.js"></script>
    <script src="${root}/assets/js/vercel-analytics.js"></script>
    <script defer src="/_vercel/insights/script.js"></script>
    <script src="${root}/assets/js/vercel-speed-insights.js"></script>
    <script defer src="/_vercel/speed-insights/script.js"></script>
</body>
</html>
`;
}

// ─── Écriture des fichiers ────────────────────────────────────

function writeGeneratedDir(dir, items, buildFn, slugFn, label) {
    fs.rmSync(dir, { recursive: true, force: true });
    fs.mkdirSync(dir, { recursive: true });
    items.forEach((item) => {
        const html = buildFn(item);
        const filePath = path.join(dir, `${slugFn(item.id)}.html`);
        fs.writeFileSync(filePath, html, 'utf8');
    });
    console.log(`✔ ${items.length} page(s) ${label} générée(s) dans ${path.relative(ROOT, dir)}/`);
}

writeGeneratedDir(ARTICLES_DIR, sortedArticles, buildArticlePage, ArticleRender.slugify, 'article');
writeGeneratedDir(DETAILS_DIR, WEB_PROJECTS, buildProjectPage, (id) => id, 'projet');

// ─── Sitemap ───────────────────────────────────────────────────

function buildSitemap() {
    const staticUrls = [
        { loc: `${SITE_URL}/`, changefreq: 'weekly', priority: '1.0' },
        { loc: `${SITE_URL}/pages/blog/blog.html`, changefreq: 'weekly', priority: '0.9' },
        { loc: `${SITE_URL}/pages/about/qui-suis-je.html`, changefreq: 'monthly', priority: '0.8' },
        { loc: `${SITE_URL}/pages/web/projets-web.html`, changefreq: 'monthly', priority: '0.8' },
        { loc: `${SITE_URL}/pages/video/projets-video.html`, changefreq: 'monthly', priority: '0.8' },
        { loc: `${SITE_URL}/pages/contact/contact.html`, changefreq: 'yearly', priority: '0.6' }
    ];

    const articleUrls = sortedArticles.map((a) => ({
        loc: `${SITE_URL}/pages/blog/articles/${ArticleRender.slugify(a.id)}.html`,
        lastmod: /^\d{4}-\d{2}-\d{2}$/.test(a.date || '') ? a.date : undefined,
        changefreq: 'monthly',
        priority: '0.7'
    }));

    const projectUrls = WEB_PROJECTS.map((p) => ({
        loc: `${SITE_URL}/pages/web/details/${encodeURIComponent(p.id)}.html`,
        changefreq: 'monthly',
        priority: '0.7'
    }));

    const all = [...staticUrls, ...articleUrls, ...projectUrls];

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${all
        .map(
            (u) => `  <url>
    <loc>${u.loc}</loc>
${u.lastmod ? `    <lastmod>${u.lastmod}</lastmod>\n` : ''}    <changefreq>${u.changefreq}</changefreq>
    <priority>${u.priority}</priority>
  </url>`
        )
        .join('\n')}
</urlset>
`;

    fs.writeFileSync(path.join(ROOT, 'sitemap.xml'), xml, 'utf8');
    console.log(`✔ sitemap.xml régénéré : ${all.length} URLs (${staticUrls.length} statiques + ${articleUrls.length} articles + ${projectUrls.length} projets)`);
}

buildSitemap();

console.log('✔ Pré-rendu SEO terminé.');
