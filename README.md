# Portfolio Pilou — Martinique, France, Japon

Ce dépôt contient le site vitrine de Pilou : un portfolio qui rassemble blog, projets web et projets vidéo autour de sa vie entre la Martinique, la France et le Japon.

## Structure du site

- **Page d’accueil** (`index.html`)
  - Hero de présentation.
  - Carrousel des **3 derniers articles de blog**.
  - Carrousel des **3 derniers projets web**.
  - Carrousel des **3 derniers projets vidéo**.
- **Blog**
  - Liste complète des articles : `pages/blog/blog.html`.
  - Page de lecture d’un article : `pages/blog/article.html?id=<id>`.
  - Commentaires par article (nom + texte), stockés dans le `localStorage`.
- **Projets Web** : `pages/web/projets-web.html`.
- **Projets Vidéo** : `pages/video/projets-video.html`.
- **Qui suis-je ?** : `pages/about/qui-suis-je.html`.
- **Contact** : `pages/contact/contact.html`.

Toutes les pages ont :
- un thème clair/sombre,
- un fond de particules,
- un footer avec icônes YouTube / Instagram.

## Contenus éditables dans le code

Les contenus affichés sur le site (articles de blog, projets web, projets vidéo) sont définis dans des fichiers de données JavaScript :

- `data/blog-data.js`  → `window.BLOG_ARTICLES`
- `data/web-data.js`   → `window.WEB_PROJECTS`
- `data/video-data.js` → `window.VIDEO_PROJECTS`

Chaque fichier contient un **modèle en commentaire**. Pour publier un nouvel élément :

1. Ouvre le fichier correspondant (ex. `data/blog-data.js`).
2. Copie un objet existant dans le tableau.
3. Modifie les champs :
   - `id` (unique, utilisé dans l’URL pour le blog),
   - `title`,
   - `image` (chemin relatif ou URL),
   - `description`,
   - `date` (YYYY-MM-DD),
   - champs spécifiques (ex. `content` pour le blog, `tags` pour les projets web, `url` pour une vidéo…).
4. Enregistre le fichier.

### Blog

- Résumé des articles (carte) : défini par `title`, `image`, `description`, `date`.
- Contenu complet de l’article : champ `content` (HTML) dans `data/blog-data.js`.
- Lecture : `pages/blog/article.html?id=<id>`.
- Les **3 articles les plus récents** (par `date`) sont utilisés sur la page d’accueil dans le carrousel.

### Projets Web

- Définis dans `data/web-data.js` (`WEB_PROJECTS`).
- Champs principaux :
  - `title`, `image`, `description`, `date`,
  - `tags` (technos),
  - `url` éventuelle :
    - **démo du projet web** (hébergement en ligne),
    - **code source** (par exemple lien GitHub).
- La page `pages/web/projets-web.html` liste tous les projets.
- La page d’accueil affiche un carrousel des **3 projets les plus récents**.

### Projets Vidéo

- Définis dans `data/video-data.js` (`VIDEO_PROJECTS`).
- Champs principaux :
  - `title`, `image` (miniature), `description`, `date`,
  - `url` (lien vers YouTube ou autre plateforme).
- `pages/video/projets-video.html` liste toutes les vidéos.
- La page d’accueil affiche un carrousel des **3 vidéos les plus récentes**.

## Comment lancer le site en local

Pas de backend : c’est un site **statique**.

- Ouvre `index.html` directement dans ton navigateur **ou**
- utilise un petit serveur statique (recommandé pour les chemins relatifs) :

```bash
cd pilou2506
python -m http.server 8000
```

Puis ouvre `http://localhost:8000` dans le navigateur.

## Personnalisation

- Met à jour les images dans `assets/img/...`.
- Change les couleurs dans la config Tailwind inline (dans les `<script>` des pages).
- Remplace les `href="#"` des icônes YouTube / Instagram par tes vrais liens.

Tout le contenu affiché est contrôlé par le code de ce dépôt : tu peux versionner chaque évolution avec Git et voir ton portfolio grandir au fil du temps.
