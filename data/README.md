# Données du portfolio — Blog, Projets Web, Projets Vidéo

Les articles et projets sont définis **dans le code**, dans les fichiers de ce dossier. Les pages publiques les affichent automatiquement ; il n’y a pas de formulaire sur le site.

## Fichiers

| Fichier         | Contenu              | Variable globale   |
|-----------------|----------------------|--------------------|
| `blog-data.js`  | Articles du blog     | `BLOG_ARTICLES`    |
| `web-data.js`   | Projets web          | `WEB_PROJECTS`     |
| `video-data.js` | Projets vidéo        | `VIDEO_PROJECTS`   |

## Publier un nouvel article / projet

1. Ouvre le fichier correspondant (ex. `blog-data.js`).
2. Dans le fichier, un **modèle en commentaire** décrit la structure à utiliser.
3. Copie un bloc existant (une entrée du tableau).
4. Colle-le dans le tableau, modifie les champs (`title`, `image`, `description`, etc.).
5. Donne un `id` unique à chaque entrée.
6. Enregistre le fichier. Au prochain chargement de la page, le nouvel article apparaîtra.

## Champs communs

- **id** : identifiant unique (texte). Pour le blog, il sert dans l’URL de l’article : `pages/blog/article.html?id=ton-id`.
- **title** : titre affiché sur la carte.
- **image** : chemin relatif au dossier du projet (ex. `assets/img/blog/photo.jpg`) ou URL complète. Si vide, une image par défaut peut être utilisée.
- **description** : texte court sous le titre (optionnel selon la page).

Les fichiers détaillent les champs optionnels (date, url, tags, etc.).

## Blog : lire l’article en entier

Chaque carte du blog mène vers une page de lecture : **pages/blog/article.html?id=**`<id>`.

Dans `blog-data.js`, chaque article doit avoir un champ **content** : le texte complet de l’article, au format **HTML** (paragraphes `<p>`, sous-titres `<h2>`, gras `<strong>`, liens `<a href="...">`, etc.). Tu édites ce champ directement dans le fichier pour modifier le contenu affiché sur la page article.
