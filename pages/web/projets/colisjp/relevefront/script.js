// Fonction pour remplir la date automatiquement
function setCurrentDate() {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth() + 1; // getMonth() retourne 0-11
  const day = now.getDate();

  document.querySelector(".year").textContent = year + "年";
  document.querySelector(".month").textContent = month + "月";
  document.querySelector(".day").textContent = day + "日";

  // Mettre à jour l'année dans le copyright
  const copyrightElement = document.getElementById("copyright");
  copyrightElement.textContent = `© ${year} ADRÉA`;
}

// Fonction pour programmer la prochaine mise à jour à minuit
function scheduleNextUpdate() {
  const now = new Date();
  const tomorrow = new Date(now);
  tomorrow.setDate(tomorrow.getDate() + 1);
  tomorrow.setHours(0, 0, 0, 0);

  const timeUntilMidnight = tomorrow - now;

  setTimeout(() => {
    setCurrentDate();
    scheduleNextUpdate(); // Programmer la prochaine mise à jour
  }, timeUntilMidnight);
}

// Initialiser la date et programmer la première mise à jour
document.addEventListener("DOMContentLoaded", function () {
  setCurrentDate();
  scheduleNextUpdate();

  // Gestion des boutons d'action
  const saveBtn = document.getElementById("saveBtn");
  const printBtn = document.getElementById("printBtn");

  // Fonction pour enregistrer le fichier
  saveBtn.addEventListener("click", function () {
    const content = document.documentElement.outerHTML;
    const blob = new Blob([content], { type: "text/html" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = `宅配便デイリー集計表_${
      new Date().toISOString().split("T")[0]
    }.html`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  });

  // Fonction pour imprimer
  printBtn.addEventListener("click", function () {
    window.print();
  });
});

// Écouter les messages de la fenêtre principale
window.addEventListener("message", function (event) {
  if (event.data.type === "transferData") {
    const data = event.data.data;

    // Afficher le nom du responsable
    if (data.staff) {
      document.querySelector(".staff-name").textContent = data.staff;
    }

    // Fonction pour remplir un tableau avec des données
    function fillTable(tableIndex, data) {
      const tables = document.querySelectorAll(".table-group table");
      if (tableIndex >= tables.length) return;

      const table = tables[tableIndex];
      const rows = table.querySelectorAll(
        "tr:not(.category-row):not(.subtotal-row)"
      );

      // Calculer le total pour ce tableau
      let total = 0;

      data.forEach((item, index) => {
        if (index < rows.length - 1) {
          // -1 pour éviter la ligne de sous-total
          const cells = rows[index].querySelectorAll("td"); // Saut de l'en-tête inutile

          // Remplir les cellules avec les données
          cells[0].textContent = item.roomNumber || "";

          // Ajouter "様" seulement si le nom n'est pas vide et ne contient pas déjà "様"
          const name = item.name || "";
          cells[1].textContent = name.endsWith("様")
            ? name
            : name
            ? name + "様"
            : "様";

          cells[2].textContent = item.sizeQuantity || "";
          cells[3].textContent = item.trackingNumber || "";

          // Utiliser le montant approprié selon le type de données
          // Pour les livraisons, utiliser freightAmount (運賃)
          // Pour les matériaux, utiliser materialAmount (資材)
          let amount = "¥";

          if (tableIndex === 0 || tableIndex === 2) {
            // Tables de livraison (宅急便)
            amount = item.freightAmount
              ? "¥" + parseFloat(item.freightAmount).toLocaleString()
              : "¥";
          } else {
            // Tables de matériaux (資材)
            amount = item.materialAmount
              ? "¥" + parseFloat(item.materialAmount).toLocaleString()
              : "¥";
          }

          cells[4].textContent = amount;

          // Ajouter au total le montant approprié
          if (tableIndex === 0 || tableIndex === 2) {
            total += parseFloat(item.freightAmount || 0);
          } else {
            total += parseFloat(item.materialAmount || 0);
          }
        }
      });

      // Mettre à jour le sous-total
      const subtotalRow = table.querySelector(".subtotal-row");
      if (subtotalRow) {
        const subtotalCell = subtotalRow.querySelector("td:last-child");
        if (subtotalCell) {
          subtotalCell.textContent = "¥" + total.toLocaleString();
        }
      }

      return total;
    }

    // Remplir chaque tableau avec les données correspondantes
    const cashDeliveryTotal = fillTable(0, data.cashDelivery); // 宅急便現金
    const cashMaterialsTotal = fillTable(1, data.cashMaterials); // 資材現金
    const roomDeliveryTotal = fillTable(2, data.roomDelivery); // 宅急便部屋付け
    const roomMaterialsTotal = fillTable(3, data.roomMaterials); // 資材部屋付け

    // Mettre à jour les totaux de section
    const totalRows = document.querySelectorAll(".total-row .amount");
    if (totalRows.length >= 2) {
      const cashTotal = cashDeliveryTotal + cashMaterialsTotal;
      const roomTotal = roomDeliveryTotal + roomMaterialsTotal;

      totalRows[0].textContent = "¥" + cashTotal.toLocaleString();
      totalRows[1].textContent = "¥" + roomTotal.toLocaleString();

      // Mettre à jour le total général
      const grandTotal = document.querySelector(".grand-total .amount");
      if (grandTotal) {
        grandTotal.textContent = "¥" + (cashTotal + roomTotal).toLocaleString();
      }
    }
  }
});
