class ParticleSystem {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");
    this.particles = [];
    this.particleCount = 50;
    this.connectionDistance = 100;
    this.init();
    this.animate();
  }

  init() {
    // Ajuster la taille du canvas à la fenêtre
    this.resize();
    window.addEventListener("resize", () => this.resize());

    // Créer les particules
    for (let i = 0; i < this.particleCount; i++) {
      this.particles.push(
        new Particle(
          Math.random() * this.canvas.width,
          Math.random() * this.canvas.height
        )
      );
    }
  }

  resize() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }

  animate() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    // Mettre à jour et dessiner les particules
    this.particles.forEach((particle) => {
      particle.update(this.canvas.width, this.canvas.height);
      particle.draw(this.ctx);
    });

    // Dessiner les connexions
    this.drawConnections();

    requestAnimationFrame(() => this.animate());
  }

  drawConnections() {
    for (let i = 0; i < this.particles.length; i++) {
      for (let j = i + 1; j < this.particles.length; j++) {
        const dx = this.particles[i].x - this.particles[j].x;
        const dy = this.particles[i].y - this.particles[j].y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < this.connectionDistance) {
          const opacity = 1 - distance / this.connectionDistance;
          this.ctx.beginPath();
          this.ctx.moveTo(this.particles[i].x, this.particles[i].y);
          this.ctx.lineTo(this.particles[j].x, this.particles[j].y);
          this.ctx.strokeStyle = `rgba(225, 112, 85, ${opacity * 0.5})`; // Utilise la couleur d'accent
          this.ctx.stroke();
        }
      }
    }
  }
}

class Particle {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.speed = 0.5;
    this.angle = Math.random() * Math.PI * 2;
    this.radius = 2;
  }

  update(width, height) {
    // Mise à jour de la position
    this.x += Math.cos(this.angle) * this.speed;
    this.y += Math.sin(this.angle) * this.speed;

    // Rebond sur les bords
    if (this.x < 0 || this.x > width) {
      this.angle = Math.PI - this.angle;
    }
    if (this.y < 0 || this.y > height) {
      this.angle = -this.angle;
    }
  }

  draw(ctx) {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = "rgba(225, 112, 85, 0.8)"; // Utilise la couleur d'accent
    ctx.fill();
  }
}
