/**
 * PROJETS WEB — Projets affichés sur la page Projets Web
 *
 * Pour ajouter un projet : copie le bloc ci-dessous dans le tableau WEB_PROJECTS.
 *
 * Modèle à copier :
 * {
 *   id: 'unique-id-projet',
 *   title: 'Nom du projet',
 *   image: 'assets/img/web/capture.jpg',  // chemin ou URL
 *   description: 'Courte description du projet.',
 *   url: 'https://...',                   // optionnel : lien vers le projet
 *   tags: ['React', 'Tailwind']           // optionnel : technologies
 * },
 */
window.WEB_PROJECTS = [
  {
    id: 'app-ritz',
    title: 'Luxury Shipping Assistant',
    image: '',
    description: 'Un calculateur de frais de port raffiné pour estimer les coûts d\'expédition à travers les régions du Japon.',
    url: 'pages/web/projets/App-Ritz/dist/index.html',
    tags: ['React', 'TypeScript', 'Vite', 'Tailwind CSS']
  },
  {
    id: 'colisjp',
    title: 'ColisJP',
    image: '',
    description: 'Application de gestion des colis et de facturation pour les hôtels au Japon : enregistrement, calcul des tarifs, suivi des paiements.',
    url: 'pages/web/projets/colisjp/index.html',
    tags: ['HTML', 'CSS', 'JavaScript']
  },
  {
    id: 'extra-hours-calculator',
    title: 'Calculateur d\'heures supplémentaires',
    image: '',
    description: 'La solution que j\'ai trouvée pour convertir mes heures supplémentaires en minutes. Ce projet m\'a sauvé de bien des manières.',
    url: 'pages/web/projets/extraHours_calculator/index.html',
    tags: ['HTML', 'CSS', 'JavaScript']
  },
  {
    id: 'lifetime-count',
    title: 'Temps vécu',
    image: '',
    description: 'Petit projet pour compter combien de temps j\'ai vécu jusqu\'à présent.',
    url: 'pages/web/projets/lifetime_count/index.html',
    tags: ['HTML', 'CSS', 'JavaScript']
  }
];
