// Vercel Speed Insights — initialisation
// Doit être chargé AVANT /_vercel/speed-insights/script.js
// (voir @vercel/speed-insights — logique équivalente à injectSpeedInsights())
window.si = window.si || function () {
  (window.siq = window.siq || []).push(arguments);
};
