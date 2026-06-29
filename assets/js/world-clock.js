/* ==========================================================
   WORLD CLOCK — horloges live par fuseau horaire
   Cible tout élément [data-clock-tz="IANA/Timezone"]
   et met à jour son textContent en HH:MM:SS, chaque seconde.
   Vanilla JS, zéro dépendance, DST géré nativement par Intl.
   ========================================================== */
(function () {
  "use strict";

  var clockEls = document.querySelectorAll("[data-clock-tz]");
  if (!clockEls.length) return;

  function tick() {
    var now = new Date();
    clockEls.forEach(function (el) {
      var tz = el.getAttribute("data-clock-tz");
      try {
        el.textContent = now.toLocaleTimeString("fr-FR", {
          timeZone: tz,
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        });
      } catch (e) {
        // Fuseau horaire invalide ou non supporté par le navigateur
        el.textContent = "--:--:--";
      }
    });
  }

  tick();
  var intervalId = setInterval(tick, 1000);

  // Resynchronise immédiatement au retour sur l'onglet
  // (évite un affichage figé après mise en veille / changement d'onglet)
  document.addEventListener("visibilitychange", function () {
    if (!document.hidden) tick();
  });

  // Respecte prefers-reduced-motion : on coupe le "blink" du point
  // de statut associé si présent, mais on garde l'heure à jour
  // (l'info reste utile, seule l'animation est concernée ailleurs).
  window.__worldClockIntervalId = intervalId;
})();
