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
    id: 'ecommerce-nippo',
    title: 'E-commerce Nippo-Français',
    image: '1000049591.png',
    description: 'Une plateforme de vente de produits artisanaux japonais vers l\'Europe.',
    url: '#',
    tags: ['React', 'Next.js', 'Stripe']
  },
  {
    id: 'mangatracker',
    title: 'MangaTracker',
    image: '',
    description: 'Application PWA pour gérer sa collection de mangas et recevoir des alertes sorties.',
    url: '#',
    tags: ['Vue.js', 'Firebase', 'Tailwind']
  }
];
