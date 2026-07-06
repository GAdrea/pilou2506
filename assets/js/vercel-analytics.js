// Vercel Web Analytics — initialisation
// Doit être chargé AVANT /_vercel/insights/script.js
// (voir @vercel/analytics — logique équivalente à inject())
window.va = window.va || function () {
  (window.vaq = window.vaq || []).push(arguments);
};
