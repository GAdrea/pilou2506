// background.js — Fond HUD "réseau/circuit" pour le calculateur d'heures sup.
// Inspiré du fond du portfolio (constellation de nœuds), en version allégée
// et autonome pour cette page.
(function () {
  "use strict";

  const canvas = document.getElementById("hud-canvas");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");

  const prefersReducedMotion = !!(
    window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );

  const GRID_SPACING = 42;
  const NODE_COUNT = 55;
  const LINK_DIST = 140;

  let nodes = [];
  let bgGrad = null;

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    bgGrad = null;
    initNodes();
  }
  window.addEventListener("resize", resize);

  class Node {
    constructor() {
      this.reset();
    }
    reset() {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
      const angle = Math.random() * Math.PI * 2;
      const speed = 0.08 + Math.random() * 0.14;
      this.vx = Math.cos(angle) * speed;
      this.vy = Math.sin(angle) * speed;
      this.radius = 1 + Math.random() * 1.3;
      this.color = Math.random() < 0.85 ? "0, 212, 255" : "255, 77, 109";
    }
    update() {
      this.x += this.vx;
      this.y += this.vy;
      if (this.x < -20) this.x = canvas.width + 20;
      if (this.x > canvas.width + 20) this.x = -20;
      if (this.y < -20) this.y = canvas.height + 20;
      if (this.y > canvas.height + 20) this.y = -20;
    }
  }

  function initNodes() {
    nodes = Array.from({ length: NODE_COUNT }, () => new Node());
  }

  function drawBackground() {
    if (!bgGrad) {
      bgGrad = ctx.createRadialGradient(
        canvas.width * 0.5,
        canvas.height * 0.4,
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
    ctx.strokeStyle = "rgba(0, 212, 255, 0.035)";
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

  function drawNodes() {
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const dx = nodes[i].x - nodes[j].x;
        const dy = nodes[i].y - nodes[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < LINK_DIST) {
          const alpha = (1 - dist / LINK_DIST) * 0.16;
          ctx.strokeStyle = "rgba(0, 212, 255, " + alpha + ")";
          ctx.lineWidth = 0.6;
          ctx.beginPath();
          ctx.moveTo(nodes[i].x, nodes[i].y);
          ctx.lineTo(nodes[j].x, nodes[j].y);
          ctx.stroke();
        }
      }
    }
    nodes.forEach((n) => {
      ctx.save();
      ctx.shadowBlur = 6;
      ctx.shadowColor = "rgb(" + n.color + ")";
      ctx.fillStyle = "rgba(" + n.color + ", 0.75)";
      ctx.beginPath();
      ctx.arc(n.x, n.y, n.radius, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    });
  }

  function renderStatic() {
    drawBackground();
    drawGrid();
    drawNodes();
  }

  function animate() {
    drawBackground();
    drawGrid();
    drawNodes();
    nodes.forEach((n) => n.update());
    requestAnimationFrame(animate);
  }

  resize();

  if (prefersReducedMotion) {
    renderStatic();
  } else {
    requestAnimationFrame(animate);
  }
})();
