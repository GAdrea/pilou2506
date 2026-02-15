class WorkTracker {
  constructor() {
    this.entries = JSON.parse(localStorage.getItem("entries") || "[]");
    this.extraEarnings = JSON.parse(
      localStorage.getItem("extraEarnings") || "[]"
    );
    this.monthlyGoal = 100000; // Objectif mensuel en yens
    this.setupEventListeners();
    this.setDefaultDate();
    this.updateUI();
  }

  setupEventListeners() {
    document.getElementById("workForm").addEventListener("submit", (e) => {
      e.preventDefault();
      this.addEntry();
    });

    document.getElementById("hourlyRate").addEventListener("change", () => {
      this.updateUI();
    });

    document.getElementById("extraForm").addEventListener("submit", (e) => {
      e.preventDefault();
      this.addExtraEarning();
    });
  }

  setDefaultDate() {
    const today = new Date().toISOString().split("T")[0];
    document.getElementById("date").value = today;
  }

  calculateHours(startTime, endTime) {
    const [startHour, startMinute] = startTime.split(":").map(Number);
    const [endHour, endMinute] = endTime.split(":").map(Number);

    let totalMinutes =
      endHour * 60 + endMinute - (startHour * 60 + startMinute);
    if (totalMinutes < 0) totalMinutes += 24 * 60;

    const totalHours = totalMinutes / 60;
    let dayHours = 0;
    let nightHours = 0;

    const dayStart = 8;
    const dayEnd = 22;

    let currentHour = startHour;
    let remainingMinutes = totalMinutes;

    while (remainingMinutes > 0) {
      if (currentHour >= dayStart && currentHour < dayEnd) {
        dayHours += Math.min(remainingMinutes, 60) / 60;
      } else {
        nightHours += Math.min(remainingMinutes, 60) / 60;
      }
      remainingMinutes -= 60;
      currentHour = (currentHour + 1) % 24;
    }

    return {
      total: totalHours,
      day: dayHours,
      night: nightHours,
    };
  }

  addEntry() {
    const date = document.getElementById("date").value;
    const startTime = document.getElementById("startTime").value;
    const endTime = document.getElementById("endTime").value;
    const hours = this.calculateHours(startTime, endTime);

    const entry = {
      id: Date.now().toString(),
      date,
      startTime,
      endTime,
      hours: Number(hours.total),
      dayHours: Number(hours.day),
      nightHours: Number(hours.night),
    };

    this.entries.push(entry);
    localStorage.setItem("entries", JSON.stringify(this.entries));
    document.getElementById("workForm").reset();
    this.setDefaultDate();
    this.updateUI();
  }

  deleteEntry(id) {
    this.entries = this.entries.filter((entry) => entry.id !== id);
    localStorage.setItem("entries", JSON.stringify(this.entries));
    this.updateUI();
  }

  addExtraEarning() {
    const amount = Number(document.getElementById("extraAmount").value);
    const description = document.getElementById("extraDescription").value;
    const timestamp = new Date();

    const extraEarning = {
      id: Date.now().toString(),
      amount,
      description,
      timestamp: timestamp.toISOString(),
      date: timestamp.toISOString().split("T")[0],
    };

    this.extraEarnings.push(extraEarning);
    localStorage.setItem("extraEarnings", JSON.stringify(this.extraEarnings));
    document.getElementById("extraForm").reset();
    this.updateUI();
  }

  getCurrentMonthEntries() {
    const now = new Date();
    const firstDay = new Date(now.getFullYear(), now.getMonth(), 1);
    const lastDay = new Date(now.getFullYear(), now.getMonth() + 1, 0);

    return this.entries.filter((entry) => {
      const entryDate = new Date(entry.date);
      return entryDate >= firstDay && entryDate <= lastDay;
    });
  }

  getCurrentMonthExtraEarnings() {
    const now = new Date();
    const firstDay = new Date(now.getFullYear(), now.getMonth(), 1);
    const lastDay = new Date(now.getFullYear(), now.getMonth() + 1, 0);

    return this.extraEarnings.filter((earning) => {
      const earningDate = new Date(earning.date);
      return earningDate >= firstDay && earningDate <= lastDay;
    });
  }

  calculateMonthlyStats() {
    const monthEntries = this.getCurrentMonthEntries();
    const monthExtraEarnings = this.getCurrentMonthExtraEarnings();
    const hourlyRate = Number(document.getElementById("hourlyRate").value);

    const totalHours = monthEntries.reduce(
      (sum, entry) => sum + entry.hours,
      0
    );
    const workEarnings = totalHours * hourlyRate;
    const extraEarnings = monthExtraEarnings.reduce(
      (sum, extra) => sum + extra.amount,
      0
    );
    const totalEarnings = workEarnings + extraEarnings;

    return {
      totalHours,
      workEarnings,
      extraEarnings,
      totalEarnings,
    };
  }

  formatCurrency(amount) {
    return new Intl.NumberFormat("ja-JP", {
      style: "currency",
      currency: "JPY",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  }

  updateUI() {
    const stats = this.calculateMonthlyStats();

    // Mise à jour du mois en cours
    const currentDate = new Date();
    const monthName = currentDate.toLocaleString("fr-FR", {
      month: "long",
      year: "numeric",
    });

    // Mise à jour de tous les affichages du mois
    document.getElementById("currentMonth").textContent = monthName;
    document.getElementById("entriesMonth").textContent = monthName;
    document.getElementById("extraMonth").textContent = monthName;

    // Mise à jour des statistiques
    document.getElementById(
      "totalHours"
    ).textContent = `${stats.totalHours.toFixed(1)}h`;
    document.getElementById("totalEarnings").textContent = this.formatCurrency(
      stats.totalEarnings
    );

    // Mise à jour de la progression sans limite à 100%
    const progress = (stats.totalEarnings / this.monthlyGoal) * 100;
    document.getElementById("progressValue").textContent = `${Math.round(
      progress
    )}%`;
    document.getElementById("monthlyGoal").textContent = this.formatCurrency(
      this.monthlyGoal
    );

    // Si le montant est dépassé, afficher 0 comme montant restant
    document.getElementById("remainingAmount").textContent =
      this.formatCurrency(Math.max(this.monthlyGoal - stats.totalEarnings, 0));

    // Mise à jour du cercle de progression
    // Pour le cercle, on utilise une couleur différente au-delà de 100%
    const progressCircle = document.querySelector(".progress-circle");
    if (progress <= 100) {
      progressCircle.style.background = `conic-gradient(var(--accent-color) ${progress}%, #ddd ${progress}%)`;
    } else {
      // Cercle complet avec une couleur différente pour l'excédent
      progressCircle.style.background = `conic-gradient(var(--accent-color) 100%, var(--accent-color) 100%)`;
    }

    // Mise à jour des listes
    this.updateEntriesList();
    this.updateExtraEarningsList();
  }

  updateEntriesList() {
    const entriesList = document.getElementById("entriesList");
    entriesList.innerHTML = "";
    const hourlyRate = Number(document.getElementById("hourlyRate").value);

    const monthEntries = this.getCurrentMonthEntries().sort(
      (a, b) => new Date(b.date) - new Date(a.date)
    );

    monthEntries.forEach((entry) => {
      const earnings = entry.hours * hourlyRate;
      const entryElement = document.createElement("div");
      entryElement.className = "entry-item";
      entryElement.innerHTML = `
        <div>
          <strong>${new Date(entry.date).toLocaleDateString("fr-FR")}</strong>
          ${entry.startTime} - ${entry.endTime}
          <br>
          <small>Total: ${entry.hours.toFixed(1)}h | ${this.formatCurrency(
        earnings
      )}</small>
        </div>
        <button class="delete-btn" data-id="${
          entry.id
        }">削除 | Supprimer</button>
      `;

      entryElement
        .querySelector(".delete-btn")
        .addEventListener("click", () => {
          this.deleteEntry(entry.id);
        });

      entriesList.appendChild(entryElement);
    });
  }

  updateExtraEarningsList() {
    const extraList = document.getElementById("extraList");
    extraList.innerHTML = "";

    const monthExtraEarnings = this.getCurrentMonthExtraEarnings().sort(
      (a, b) => new Date(b.timestamp) - new Date(a.timestamp)
    );

    monthExtraEarnings.forEach((earning) => {
      const extraElement = document.createElement("div");
      extraElement.className = "extra-item";

      const timestamp = new Date(earning.timestamp);
      const formattedDate = timestamp.toLocaleDateString("fr-FR");
      const formattedTime = timestamp.toLocaleTimeString("fr-FR");

      extraElement.innerHTML = `
        <div class="details">
          <strong>${this.formatCurrency(earning.amount)}</strong>
          <p>${earning.description}</p>
          <div class="timestamp">
            ${formattedDate} à ${formattedTime}
          </div>
        </div>
        <button class="delete-btn" data-id="${earning.id}">Supprimer</button>
      `;

      extraElement
        .querySelector(".delete-btn")
        .addEventListener("click", () => {
          this.deleteExtraEarning(earning.id);
        });

      extraList.appendChild(extraElement);
    });
  }

  deleteExtraEarning(id) {
    this.extraEarnings = this.extraEarnings.filter(
      (earning) => earning.id !== id
    );
    localStorage.setItem("extraEarnings", JSON.stringify(this.extraEarnings));
    this.updateUI();
  }
}

document.addEventListener("DOMContentLoaded", () => {
  new WorkTracker();
  const canvas = document.getElementById("particlesCanvas");
  new ParticleSystem(canvas);
});
