// Configuration des particules (plus nombreuses et interactives)
particlesJS("particles-js", {
  particles: {
    number: { value: 180, density: { enable: true, value_area: 800 } },
    color: { value: ["#3b82f6", "#ED2939", "#FFCE00", "#ffffff"] },
    shape: { type: "circle" },
    opacity: { value: 0.6, random: true },
    size: { value: 3, random: true },
    line_linked: {
      enable: true,
      distance: 120,
      color: "#888888",
      opacity: 0.2,
      width: 1,
    },
    move: {
      enable: true,
      speed: 2.5,
      direction: "none",
      random: false,
      straight: false,
      out_mode: "out",
      bounce: false,
    },
  },
  interactivity: {
    detect_on: "canvas",
    events: {
      onhover: {
        enable: true,
        mode: "grab", // Les particules adhèrent à la souris
      },
      onclick: { enable: true, mode: "push" },
      resize: true,
    },
    modes: {
      grab: {
        distance: 200,
        line_linked: { opacity: 0.8 },
      },
    },
  },
  retina_detect: true,
});

// Gestion du Mode Clair / Sombre
const themeToggle = document.getElementById("theme-toggle");
const body = document.body;
const icon = themeToggle.querySelector("i");

// Charger la préférence utilisateur
const currentTheme = localStorage.getItem("theme") || "dark";
body.setAttribute("data-theme", currentTheme);
updateIcon(currentTheme);

themeToggle.addEventListener("click", () => {
  const newTheme =
    body.getAttribute("data-theme") === "dark" ? "light" : "dark";
  body.setAttribute("data-theme", newTheme);
  localStorage.setItem("theme", newTheme);
  updateIcon(newTheme);
});

function updateIcon(theme) {
  if (theme === "dark") {
    icon.className = "fas fa-sun";
  } else {
    icon.className = "fas fa-moon";
  }
}

// Animation simple au scroll
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0)";
      }
    });
  },
  { threshold: 0.1 },
);

document.querySelectorAll("section").forEach((section) => {
  section.style.opacity = "0";
  section.style.transform = "translateY(30px)";
  section.style.transition = "all 0.6s ease-out";
  observer.observe(section);
});
