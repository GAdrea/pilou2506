const html = document.documentElement;
const themeToggle = document.getElementById("themeToggle");
const themeToggleMobile = document.getElementById("themeToggleMobile");
const themeIcon = document.getElementById("themeIcon");
const themeIconMobile = document.getElementById("themeIconMobile");
function toggleTheme() {
  if (html.classList.contains("dark")) {
    html.classList.remove("dark");
    themeIcon.innerText = "🌞";
    themeIconMobile.innerText = "🌞";
    localStorage.theme = "light";
  } else {
    html.classList.add("dark");
    themeIcon.innerText = "🌙";
    themeIconMobile.innerText = "🌙";
    localStorage.theme = "dark";
  }
}
if (themeToggle) themeToggle.addEventListener("click", toggleTheme);
if (themeToggleMobile)
  themeToggleMobile.addEventListener("click", toggleTheme);
if (
  localStorage.theme === "dark" ||
  (!("theme" in localStorage) &&
    window.matchMedia("(prefers-color-scheme: dark)").matches)
) {
  html.classList.add("dark");
  if (themeIcon) themeIcon.innerText = "🌙";
  if (themeIconMobile) themeIconMobile.innerText = "🌙";
}
const burgerBtn = document.getElementById("burgerBtn");
const closeMenu = document.getElementById("closeMenu");
const mobileMenu = document.getElementById("mobileMenu");
const mobileLinks = document.querySelectorAll(".mobile-nav-link");
function toggleMenu() {
  mobileMenu.classList.toggle("open");
  document.body.classList.toggle("overflow-hidden");
}
if (burgerBtn) burgerBtn.addEventListener("click", toggleMenu);
if (closeMenu) closeMenu.addEventListener("click", toggleMenu);
mobileLinks.forEach((link) => link.addEventListener("click", toggleMenu));
const canvas = document.getElementById("particles-canvas");
if (canvas) {
  const ctx = canvas.getContext("2d");
  let particles = [];
  function getColors() {
    return html.classList.contains("dark")
      ? ["#ff4d6d", "#bc002d", "#475569", "#1e293b"]
      : ["#ffb7c5", "#ff4d6d", "#002395", "#ff8c00"];
  }
  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  window.addEventListener("resize", resize);
  resize();
  class Particle {
    constructor() {
      this.reset();
    }
    reset() {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
      this.size = Math.random() * 4 + 1;
      this.speedX = Math.random() * 1 - 0.5;
      this.speedY = Math.random() * 1 + 0.2;
      this.color = getColors()[Math.floor(Math.random() * 4)];
      this.opacity = Math.random() * 0.5 + 0.2;
    }
    update() {
      this.y += this.speedY;
      this.x += this.speedX;
      if (this.y > canvas.height) this.y = -10;
      if (this.x > canvas.width) this.x = 0;
      if (this.x < 0) this.x = canvas.width;
    }
    draw() {
      ctx.globalAlpha = this.opacity;
      ctx.fillStyle = this.color;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fill();
    }
  }
  for (let i = 0; i < 60; i++) particles.push(new Particle());
  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach((p) => {
      p.update();
      p.draw();
    });
    requestAnimationFrame(animate);
  }
  animate();
}
