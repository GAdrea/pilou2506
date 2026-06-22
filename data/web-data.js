/**
 * PROJETS WEB — Projets affichés sur la page Projets Web
 *
 * Pour ajouter un projet : copie le bloc ci-dessous dans le tableau WEB_PROJECTS.
 * Chaque projet a maintenant sa propre page dédiée (projet.html?id=...),
 * avec sa description complète, ses technologies et son but.
 *
 * Modèle à copier :
 * {
 *   id: 'unique-id-projet',               // sert dans l'URL projet.html?id=...
 *   title: 'Nom du projet',
 *   image: 'assets/img/web/capture.jpg',  // chemin ou URL
 *   description: 'Courte description pour la carte (liste + carousel home).',
 *   goal: 'Le but du projet en une ou deux phrases : quel problème il résout.',
 *   content: `
 *     <p>Description complète et détaillée du projet pour sa page dédiée.
 *     HTML autorisé (gras, italique, liens, sous-titres h2...).</p>
 *   `,
 *   url: 'https://...',                   // optionnel : lien vers la démo
 *   tags: ['React', 'Tailwind']           // technologies utilisées
 * },
 */
window.WEB_PROJECTS = [
  {
    id: 'app-ritz',
    title: 'Luxury Shipping Assistant',
    image: '',
    description: 'Un calculateur de frais de port raffiné pour estimer les coûts d\'expédition à travers les régions du Japon.',
    goal: 'Fiabiliser et accélérer le calcul des frais d\'expédition pour le personnel d\'un hôtel haut de gamme, en évitant les erreurs de tarification manuelles et en gardant une trace des devis précédents.',
    content: `
        <p>Ce projet est né d'un problème très concret côté hôtellerie de luxe : calculer rapidement et sans erreur le coût d'expédition de bagages ou de colis clients à travers les différentes régions du Japon, où les tarifs changent selon la zone, la taille du colis et les options choisies (emballage, protection...).</p>
        <p>L'application gère plusieurs paliers de taille, applique automatiquement les tarifs de base et de manutention selon la région sélectionnée, calcule les frais annexes (boîte, housse de protection...), et conserve un historique des derniers devis pour aller plus vite la prochaine fois.</p>
        <p>Construit avec <strong>React</strong> et <strong>TypeScript</strong>, packagé avec <strong>Vite</strong> et stylé en <strong>Tailwind CSS</strong> — un terrain de jeu pour expérimenter une stack moderne sur un cas d'usage 100% réel, directement inspiré de mon quotidien en hôtellerie.</p>
    `,
    url: 'pages/web/projets/App-Ritz/dist/index.html',
    tags: ['React', 'TypeScript', 'Vite', 'Tailwind CSS']
  },
  {
    id: 'colisjp',
    title: 'ColisJP',
    image: '',
    description: 'Application de gestion des colis et de facturation pour les hôtels au Japon : enregistrement, calcul des tarifs, suivi des paiements.',
    goal: 'Simplifier et accélérer l\'enregistrement des colis à la réception, réduire les erreurs de calcul de tarifs, et garder une traçabilité claire des paiements pour le personnel.',
    content: `
        <p>ColisJP est un système de gestion de colis et de facturation pensé pour la réception d'un hôtel au Japon : enregistrement client (numéro de chambre, nom), détails du colis (date, type, dimensions), calcul automatique des frais de transport et d'emballage, et suivi du mode de paiement (espèces ou facturation à la chambre).</p>
        <p>L'interface propose un tableau dynamique pré-rempli pour aller vite pendant le coup de feu, une sélection rapide des types de boîte et des tarifs associés, un calcul automatique du rendu de monnaie, et une gestion de plusieurs colis pour un même client.</p>
        <p>Développé en <strong>HTML</strong>, <strong>CSS</strong> et <strong>JavaScript</strong> vanilla, sans dépendance externe, avec une interface bilingue français/japonais pour s'adapter aux équipes sur place.</p>
    `,
    url: 'pages/web/projets/colisjp/index.html',
    tags: ['HTML', 'CSS', 'JavaScript']
  },
  {
    id: 'extra-hours-calculator',
    title: 'Calculateur d\'heures supplémentaires',
    image: '',
    description: 'La solution que j\'ai trouvée pour convertir mes heures supplémentaires en minutes. Ce projet m\'a sauvé de bien des manières.',
    goal: 'Avoir un outil rapide et fiable sous la main pour convertir des heures supplémentaires en minutes, sans risque d\'erreur de calcul.',
    content: `
        <p>Au Japon, les heures supplémentaires sont parfois décomptées d'une façon qui ne facilite pas la vie de celui qui doit les déclarer ou les vérifier. Ce petit outil convertit rapidement des heures en minutes, pour éviter les erreurs de calcul à la main en fin de service.</p>
        <p>Un projet volontairement minimaliste — pas de framework, juste du <strong>HTML</strong>, <strong>CSS</strong> et <strong>JavaScript</strong> — pensé pour résoudre un vrai problème du quotidien plutôt que pour impressionner.</p>
    `,
    url: 'pages/web/projets/extraHours_calculator/index.html',
    tags: ['HTML', 'CSS', 'JavaScript']
  },
  {
    id: 'lifetime-count',
    title: 'Temps vécu',
    image: '',
    description: 'Petit projet pour compter combien de temps j\'ai vécu jusqu\'à présent.',
    goal: 'Visualiser concrètement le temps vécu pour garder à l\'esprit qu\'il est précieux — un rappel personnel autant qu\'un exercice technique.',
    content: `
        <p>Un projet plus personnel et un peu philosophique : afficher en temps réel le temps que j'ai vécu depuis ma naissance — années, jours, heures, minutes et secondes. Une manière ludique de se rappeler que le temps file, et qu'il vaut mieux en profiter.</p>
        <p>Encore un projet <strong>HTML</strong>/<strong>CSS</strong>/<strong>JavaScript</strong> vanilla, simple à lire et à faire évoluer.</p>
    `,
    url: 'pages/web/projets/lifetime_count/index.html',
    tags: ['HTML', 'CSS', 'JavaScript']
  }
];
