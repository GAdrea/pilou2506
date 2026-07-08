// background.js — Fond animé "poussière du temps" pour la page Temps vécu
// Particules qui dérivent lentement vers le haut, comme des grains de temps
// qui s'échappent. Indépendant du reste du site (page autonome).
(function () {
  "use strict";

  const canvas = document.getElementById("dust-canvas");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");

  const prefersReducedMotion = !!(
    window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );

  const PARTICLE_COUNT = 90;
  const GRID_SPACING = 44;

  let particles = [];
  let bgGrad = null;

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    bgGrad = null;
    initParticles();
  }
  window.addEventListener("resize", resize);

  class Dust {
    constructor() {
      this.reset(true);
    }
    reset(initial) {
      this.x = Math.random() * canvas.width;
      this.y = initial ? Math.random() * canvas.height : canvas.height + 10;
      this.radius = 0.6 + Math.random() * 1.8;
      this.speed = 0.1 + Math.random() * 0.28;
      this.sway = 0.3 + Math.random() * 0.6;
      this.swaySpeed = 0.0006 + Math.random() * 0.0009;
      this.phase = Math.random() * Math.PI * 2;
      this.baseAlpha = 0.15 + Math.random() * 0.55;
      this.color = Math.random() < 0.82 ? "0, 212, 255" : "255, 77, 109";
    }
    update(ts) {
      this.y -= this.speed;
      this.x += Math.sin(ts * this.swaySpeed + this.phase) * this.sway * 0.05;
      if (this.y < -10) this.reset(false);
      if (this.x < -10) this.x = canvas.width + 10;
      if (this.x > canvas.width + 10) this.x = -10;
    }
    draw(ts) {
      const twinkle = 0.7 + 0.3 * Math.sin(ts * 0.002 + this.phase);
      ctx.save();
      ctx.shadowBlur = 6;
      ctx.shadowColor = "rgb(" + this.color + ")";
      ctx.fillStyle = "rgba(" + this.color + ", " + this.baseAlpha * twinkle + ")";
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }
  }

  function initParticles() {
    particles = Array.from({ length: PARTICLE_COUNT }, () => new Dust());
  }

  function drawBackground() {
    if (!bgGrad) {
      bgGrad = ctx.createRadialGradient(
        canvas.width * 0.5,
        canvas.height * 0.42,
        0,
        canvas.width * 0.5,
        canvas.height * 0.5,
        Math.max(canvas.width, canvas.height) * 0.85
      );
      bgGrad.addColorStop(0, "#0d1525");
      bgGrad.addColorStop(1, "#050a12");
    }
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }

  function drawGrid() {
    ctx.save();
    ctx.strokeStyle = "rgba(0, 212, 255, 0.03)";
    ctx.lineWidth = 0.5;
    ctx.beginPath();
    for (let x = 0; x <= canvas.width; x += GRID_SPACING) {
      ctx.moveTo(x, 0);
      ctx.lineTo(x, canvas.height);
    }
    for (let y = 0; y <= canvas.height; y += GRID_SPACING) {
      ctx.moveTo(0, y);
      ctx.lineTo(canvas.width, y);
    }
    ctx.stroke();
    ctx.restore();
  }

  function renderStatic() {
    drawBackground();
    drawGrid();
    particles.forEach((p) => p.draw(0));
  }

  function animate(ts) {
    drawBackground();
    drawGrid();
    particles.forEach((p) => {
      p.update(ts || 0);
      p.draw(ts || 0);
    });
    requestAnimationFrame(animate);
  }

  resize();

  if (prefersReducedMotion) {
    renderStatic();
  } else {
    requestAnimationFrame(animate);
  }
})();
