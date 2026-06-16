// Attendre que le DOM soit complètement chargé avant d'exécuter le script
document.addEventListener("DOMContentLoaded", function () {
  // Fonction pour mettre à jour la date
  function updateCurrentDate() {
    const now = new Date();
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      weekday: "long",
      era: "long",
    };
    const dateStr = now.toLocaleDateString("ja-JP", options);
    document.getElementById("currentDate").textContent = dateStr;

    // Mettre à jour l'année dans le copyright
    const currentYear = now.getFullYear();
    const copyrightElement = document.getElementById("copyright");
    copyrightElement.textContent = `© ${currentYear} ADRÉA`;
  }

  // Mettre à jour la date immédiatement
  updateCurrentDate();

  // Programmer la mise à jour à minuit
  function scheduleNextUpdate() {
    const now = new Date();
    const tomorrow = new Date(now);
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(0, 0, 0, 0);

    const timeUntilMidnight = tomorrow - now;

    setTimeout(() => {
      updateCurrentDate();
      scheduleNextUpdate();
    }, timeUntilMidnight);
  }

  // Démarrer la mise à jour automatique
  scheduleNextUpdate();

  // Récupération de la référence du corps du tableau
  const tableBody = document.getElementById("tableBody");

  // Configuration des boutons d'action
  const clearAllBtn = document.getElementById("clearAllBtn");
  const saveBtn = document.getElementById("saveBtn");
  const printBtn = document.getElementById("printBtn");
  const transferBtn = document.getElementById("transferBtn");
  const toggleAllCheckboxesBtn = document.getElementById("toggleAllCheckboxes");

  // État pour suivre si toutes les cases sont cochées ou non
  let allChecked = false;

  // Fonction pour cocher/décocher toutes les cases
  toggleAllCheckboxesBtn.addEventListener("click", function () {
    // Inverser l'état
    allChecked = !allChecked;

    // Mettre à jour l'apparence du bouton
    if (allChecked) {
      toggleAllCheckboxesBtn.classList.add("active");
      toggleAllCheckboxesBtn.textContent = "選択解除";

      // Afficher un message temporaire
      showTemporaryMessage("全ての行がロックされました", "success");
    } else {
      toggleAllCheckboxesBtn.classList.remove("active");
      toggleAllCheckboxesBtn.textContent = "全選択";

      // Afficher un message temporaire
      showTemporaryMessage("全ての行のロックが解除されました", "info");
    }

    // Cocher/décocher toutes les cases et déclencher l'événement change
    const checkboxes = document.querySelectorAll(
      "tbody input[type='checkbox']"
    );
    checkboxes.forEach((checkbox) => {
      // Vérifier si l'état de la case à cocher va changer
      if (checkbox.checked !== allChecked) {
        // Changer l'état de la case à cocher
        checkbox.checked = allChecked;

        // Déclencher manuellement l'événement change pour activer le verrouillage/déverrouillage
        const changeEvent = new Event("change", { bubbles: true });
        checkbox.dispatchEvent(changeEvent);
      }
    });
  });

  // Fonction pour afficher un message temporaire
  function showTemporaryMessage(message, type) {
    // Créer un élément de message
    const messageElement = document.createElement("div");
    messageElement.className = `temporary-message ${type}`;
    messageElement.textContent = message;

    // Ajouter le message au DOM
    document.querySelector(".checkbox-control").appendChild(messageElement);

    // Animer l'apparition
    setTimeout(() => {
      messageElement.classList.add("show");
    }, 10);

    // Supprimer le message après un délai
    setTimeout(() => {
      messageElement.classList.remove("show");
      setTimeout(() => {
        messageElement.remove();
      }, 300);
    }, 3000);
  }

  // Fonction pour effacer toutes les entrées
  clearAllBtn.addEventListener("click", function () {
    if (confirm("全てのデータを消去してもよろしいですか？")) {
      const checkboxes = document.querySelectorAll(
        "tbody input[type='checkbox']"
      );
      const allInputs = document.querySelectorAll(
        "input:not([type='checkbox']), select"
      );

      // Décocher toutes les cases à cocher et déclencher l'événement change
      checkboxes.forEach((checkbox) => {
        if (checkbox.checked) {
          checkbox.checked = false;

          // Déclencher manuellement l'événement change
          const changeEvent = new Event("change", { bubbles: true });
          checkbox.dispatchEvent(changeEvent);
        }
      });

      // Vider tous les champs de saisie
      allInputs.forEach((input) => {
        if (input.type === "number") {
          input.value = input.classList.contains("box-quantity") ? "1" : "";
        } else {
          input.value = "";
        }
      });

      // Réinitialiser l'état du bouton de sélection
      allChecked = false;
      toggleAllCheckboxesBtn.classList.remove("active");
      toggleAllCheckboxesBtn.textContent = "全選択";
    }
  });

  // Fonction pour sauvegarder en PDF
  saveBtn.addEventListener("click", function () {
    const format = prompt("保存形式を選択してください (pdf/png/jpeg):", "pdf");
    if (format) {
      window.print(); // Pour l'instant, utilise l'impression comme solution temporaire
      // Note: Une implémentation plus avancée nécessiterait une bibliothèque comme html2pdf ou html2canvas
    }
  });

  // Fonction pour imprimer
  printBtn.addEventListener("click", function () {
    window.print();
  });

  // Fonction pour transférer les données vers le format A4
  transferBtn.addEventListener("click", function () {
    // Vérifier si un responsable est sélectionné
    const transferStaffSelect = document.getElementById("transferStaffSelect");
    const selectedStaff = transferStaffSelect.value;

    if (!selectedStaff) {
      showTemporaryMessage("担当者を選択してください。", "warning"); // Veuillez sélectionner un responsable
      return;
    }

    // Ouvrir relevefront/index.html dans un nouvel onglet
    const newWindow = window.open("relevefront/index.html", "_blank");

    // Attendre que la nouvelle page soit chargée
    newWindow.onload = function () {
      const rows = document.querySelectorAll("tbody tr");
      const sortedData = {
        cashDelivery: [], // 宅急便現金
        cashMaterials: [], // 資材現金
        roomDelivery: [], // 宅急便部屋付け
        roomMaterials: [], // 資材部屋付け
        staff: selectedStaff, // Ajouter le responsable sélectionné
      };

      // Parcourir toutes les lignes et trier les données
      rows.forEach((row) => {
        const isChecked = row.querySelector("input[type='checkbox']").checked;
        if (!isChecked) return;

        // Utiliser les classes pour déterminer la catégorie
        const isCashPayment = row.classList.contains("cash-payment");
        const isDeliveryItem = row.classList.contains("delivery-item");
        const isMaterialItem = row.classList.contains("material-item");

        // Récupérer les montants séparés
        const freightAmount =
          parseFloat(row.querySelector("td:nth-child(5) input").value) || 0; // 運賃
        const materialAmount =
          parseFloat(row.querySelector("td:nth-child(8) input").value) || 0; // 資材
        const totalAmount =
          parseFloat(row.querySelector("td:nth-child(9) input").value) || 0; // 合計金額

        // Données communes
        const commonData = {
          roomNumber: row.querySelector("td:nth-child(2) input").value,
          name: row.querySelector("td:nth-child(3) input").value,
          trackingNumber: row.querySelector("td:nth-child(13) input").value,
        };

        // Récupérer les informations sur les matériaux
        const boxSelect = row.querySelector(".box-select");
        const boxQuantity = row.querySelector(".box-quantity");
        const sizeQuantityText =
          boxSelect && boxSelect.value
            ? `${boxSelect.value} x${boxQuantity.value}`
            : row.querySelector("td:nth-child(4) input").value;

        // Si l'article a à la fois des frais de transport et des frais de matériaux,
        // nous devons créer deux entrées distinctes
        if (freightAmount > 0 && materialAmount > 0) {
          // Créer une entrée pour les frais de transport
          const freightData = {
            ...commonData,
            sizeQuantity: row.querySelector("td:nth-child(4) input").value, // 品名
            amount: freightAmount.toString(),
            freightAmount: freightAmount.toString(),
            materialAmount: "0",
          };

          // Créer une entrée pour les frais de matériaux
          const materialData = {
            ...commonData,
            sizeQuantity: sizeQuantityText,
            amount: materialAmount.toString(),
            freightAmount: "0",
            materialAmount: materialAmount.toString(),
          };

          // Ajouter les entrées aux catégories appropriées
          if (isCashPayment) {
            sortedData.cashDelivery.push(freightData);
            sortedData.cashMaterials.push(materialData);
          } else {
            sortedData.roomDelivery.push(freightData);
            sortedData.roomMaterials.push(materialData);
          }
        } else {
          // Trier les données selon les classes
          if (isCashPayment) {
            if (isDeliveryItem) {
              // Livraison en espèces (宅急便現金)
              sortedData.cashDelivery.push({
                ...commonData,
                sizeQuantity: row.querySelector("td:nth-child(4) input").value, // 品名
                amount: freightAmount.toString(), // Montant de la livraison (運賃)
                freightAmount: freightAmount.toString(), // Pour référence future
                materialAmount: "0", // Pas de matériaux pour les livraisons
              });
            } else if (isMaterialItem) {
              // Matériaux en espèces (資材現金)
              sortedData.cashMaterials.push({
                ...commonData,
                sizeQuantity: sizeQuantityText,
                amount: materialAmount.toString(), // Montant des matériaux (資材)
                freightAmount: "0", // Pas de frais de transport pour les matériaux
                materialAmount: materialAmount.toString(), // Pour référence future
              });
            }
          } else {
            if (isDeliveryItem) {
              // Livraison en compte chambre (宅急便部屋付け)
              sortedData.roomDelivery.push({
                ...commonData,
                sizeQuantity: row.querySelector("td:nth-child(4) input").value, // 品名
                amount: freightAmount.toString(), // Montant de la livraison (運賃)
                freightAmount: freightAmount.toString(), // Pour référence future
                materialAmount: "0", // Pas de matériaux pour les livraisons
              });
            } else if (isMaterialItem) {
              // Matériaux en compte chambre (資材部屋付け)
              sortedData.roomMaterials.push({
                ...commonData,
                sizeQuantity: sizeQuantityText,
                amount: materialAmount.toString(), // Montant des matériaux (資材)
                freightAmount: "0", // Pas de frais de transport pour les matériaux
                materialAmount: materialAmount.toString(), // Pour référence future
              });
            }
          }
        }
      });

      // Transférer les données vers la nouvelle fenêtre
      newWindow.postMessage(
        {
          type: "transferData",
          data: sortedData,
        },
        "*"
      );

      // Nettoyer le localStorage après transfert
      clearLocalStorage();

      // Afficher un message de confirmation
      showTemporaryMessage("データが正常に転送されました。", "success"); // Les données ont été transférées avec succès
    };
  });

  // Liste des noms des employés disponibles pour la sélection
  const 担当者リスト = [
    "田中 太郎",
    "佐藤 花子",
    "鈴木 一郎",
    "山田 優子",
    "伊藤 健一",
    "渡辺 美咲",
    "小林 誠",
    "加藤 裕子",
    "吉田 達也",
    "山本 恵美",
    "中村 翔太",
    "林 明子",
    "斎藤 和也",
    "清水 麻衣",
    "高橋 大輔",
    "阿部 真由美",
    "石井 康介",
    "池田 智子",
    "山下 博之",
    "森 さくら",
  ];

  // Liste des BOX et leurs prix associés
  const boxPrices = {
    "16BOX": 420,
    "14BOX": 370,
    "12BOX": 260,
    "10BOX": 220,
    "8BOX": 160,
    "6BOX": 140,
    スーツケースカバー: 510,
    ゴルフカバーⅬ: 700,
    ボストンカバーⅬ: 290,
    ボストンカバーM: 180,
    "酒BOX(大)": 220,
    "ボトルBOX(小)": 190,
  };

  // Configuration des options pour le formatage des dates
  const dateOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
    era: "long",
  };

  /**
   * Formate une date en format japonais (YYYY年MM月DD日)
   * @param {string} dateString - La date à formater
   * @returns {string} La date formatée
   */
  function formatDate(dateString) {
    if (!dateString) return "";
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}年${month}月${day}日`;
  }

  /**
   * Crée le HTML pour le menu déroulant de sélection des employés
   * @returns {string} Le HTML du select avec les options
   */
  function create担当者SelectHTML() {
    return `
      <select class="staff-select">
        <option value="">選択してください</option>
        ${担当者リスト
          .map((name) => `<option value="${name}">${name}</option>`)
          .join("")}
      </select>
    `;
  }

  /**
   * Fonction pour créer le menu déroulant des BOX
   * @returns {string} Le HTML du select avec les options
   */
  function createBoxSelectHTML() {
    return `
      <select class="box-select">
        <option value="">選択してください</option>
        ${Object.keys(boxPrices)
          .map((box) => `<option value="${box}">${box}</option>`)
          .join("")}
      </select>
    `;
  }

  /**
   * Calcule les totaux et gère l'affichage des champs de paiement
   * @param {HTMLElement} row - La ligne du tableau à calculer
   */
  function calculateTotal(row) {
    // Récupération des références aux champs de la ligne
    const 運賃Input = row.querySelector("td:nth-child(5) input"); // Colonne 運賃
    const 資材Select = row.querySelector("td:nth-child(6) select"); // Colonne 資材
    const 数量Input = row.querySelector("td:nth-child(7) input"); // Colonne 数量
    const 資材PriceInput = row.querySelector("td:nth-child(8) input"); // Colonne 資材 (prix)
    const 合計Input = row.querySelector("td:nth-child(9) input"); // Colonne 合計金額
    const 預かり金Input = row.querySelector("td:nth-child(10) input"); // Colonne 預かり金
    const お釣りInput = row.querySelector("td:nth-child(11) input"); // Colonne お釣り
    const 支払方法Select = row.querySelector("td:nth-child(12) select"); // Colonne 支払方法

    // Conversion des valeurs en nombres
    const 運賃 = parseFloat(運賃Input.value) || 0;
    const 数量 = parseInt(数量Input.value) || 1;
    const 資材Price = parseFloat(資材PriceInput.value) || 0;
    const 預かり金 = parseFloat(預かり金Input.value) || 0;

    // Calcul du total
    const 合計 = 運賃 + 資材Price;
    合計Input.value = 合計;

    // Déterminer si c'est un article de livraison ou de matériel
    // Un article est considéré comme une livraison si le montant de 運賃 est > 0
    // Un article est considéré comme un matériel si le montant de 資材 est > 0
    // Si les deux sont > 0, on privilégie le type qui a le montant le plus élevé
    let isDeliveryItem = false;
    let isMaterialItem = false;
    let isMixedItem = false;

    if (運賃 > 0 && 資材Price === 0) {
      isDeliveryItem = true;
      isMaterialItem = false;
      isMixedItem = false;
    } else if (資材Price > 0 && 運賃 === 0) {
      isDeliveryItem = false;
      isMaterialItem = true;
      isMixedItem = false;
    } else if (運賃 > 0 && 資材Price > 0) {
      // Si les deux montants sont > 0, c'est un article mixte
      isMixedItem = true;

      // On privilégie le type qui a le montant le plus élevé pour la classification
      if (運賃 >= 資材Price) {
        isDeliveryItem = true;
        isMaterialItem = false;
      } else {
        isDeliveryItem = false;
        isMaterialItem = true;
      }
    } else {
      // Si les deux montants sont à 0, on ne peut pas déterminer le type
      isDeliveryItem = false;
      isMaterialItem = false;
      isMixedItem = false;
    }

    // Gestion différente selon le mode de paiement (cash ou compte chambre)
    if (支払方法Select.value === "現金") {
      // Mode paiement en espèces : activer les champs de paiement
      預かり金Input.removeAttribute("disabled");
      お釣りInput.removeAttribute("disabled");
      預かり金Input.classList.remove("disabled-input");
      お釣りInput.classList.remove("disabled-input");

      // Calcul de la monnaie à rendre
      const お釣り = 預かり金 - 合計;
      お釣りInput.value = お釣り >= 0 ? お釣り : 0;

      // Ajouter la classe pour les paiements en espèces
      row.classList.add("cash-payment");
      row.classList.remove("room-payment");

      // Gérer les classes pour le type d'article
      if (isMixedItem) {
        row.classList.add("mixed-item");
        row.classList.remove("delivery-item", "material-item");
      } else if (isMaterialItem) {
        row.classList.add("material-item");
        row.classList.remove("delivery-item", "mixed-item");
      } else if (isDeliveryItem) {
        row.classList.add("delivery-item");
        row.classList.remove("material-item", "mixed-item");
      } else {
        // Si les deux montants sont à 0, ne pas attribuer de classe spécifique
        row.classList.remove("delivery-item", "material-item", "mixed-item");
      }
    } else {
      // Mode compte chambre : désactiver les champs de paiement
      預かり金Input.value = "";
      お釣りInput.value = "";
      預かり金Input.setAttribute("disabled", "disabled");
      お釣りInput.setAttribute("disabled", "disabled");
      預かり金Input.classList.add("disabled-input");
      お釣りInput.classList.add("disabled-input");

      // Ajouter la classe pour les paiements par compte chambre
      row.classList.add("room-payment");
      row.classList.remove("cash-payment");

      // Gérer les classes pour le type d'article
      if (isMixedItem) {
        row.classList.add("mixed-item");
        row.classList.remove("delivery-item", "material-item");
      } else if (isMaterialItem) {
        row.classList.add("material-item");
        row.classList.remove("delivery-item", "mixed-item");
      } else if (isDeliveryItem) {
        row.classList.add("delivery-item");
        row.classList.remove("material-item", "mixed-item");
      } else {
        // Si les deux montants sont à 0, ne pas attribuer de classe spécifique
        row.classList.remove("delivery-item", "material-item", "mixed-item");
      }
    }
  }

  function addRowEventListeners(row) {
    // Écouteur pour la case à cocher
    const checkbox = row.querySelector('input[type="checkbox"]');
    const allInputs = row.querySelectorAll(
      'input:not([type="checkbox"]), select'
    );

    // Ajout de l'écouteur pour le formatage du numéro de reçu
    const receiptNumberInput = row.querySelector(".receipt-number");
    receiptNumberInput.addEventListener("input", function (e) {
      // Supprimer tous les caractères non numériques
      let value = e.target.value.replace(/\D/g, "");

      // Limiter à 12 chiffres
      value = value.slice(0, 12);

      // Ajouter les tirets tous les 4 chiffres
      if (value.length > 8) {
        value =
          value.slice(0, 4) +
          "-" +
          value.slice(4, 8) +
          "-" +
          value.slice(8, 12);
      } else if (value.length > 4) {
        value = value.slice(0, 4) + "-" + value.slice(4, 8);
      }

      e.target.value = value;
    });

    // Validation du format lors de la perte du focus
    receiptNumberInput.addEventListener("blur", function (e) {
      const value = e.target.value;
      if (value && !/^\d{4}-\d{4}-\d{4}$/.test(value)) {
        e.target.value = "";
      }
    });

    // Validation pour n'accepter que les chiffres dans le numéro de chambre
    const roomNumberInput = row.querySelector(".room-number");
    roomNumberInput.addEventListener("input", function (e) {
      // Supprimer tous les caractères non numériques
      e.target.value = e.target.value.replace(/\D/g, "");
    });

    checkbox.addEventListener("change", function () {
      // Verrouiller ou déverrouiller tous les champs de la ligne
      allInputs.forEach((input) => {
        if (this.checked) {
          // Sauvegarder la valeur readonly originale
          input.dataset.wasReadonly = input.readOnly;
          // Verrouiller le champ
          input.readOnly = true;
          input.classList.add("locked-input");
          if (input.tagName === "SELECT") {
            input.disabled = true;
          }
        } else {
          // Restaurer l'état readonly original
          input.readOnly = input.dataset.wasReadonly === "true";
          input.classList.remove("locked-input");
          if (input.tagName === "SELECT") {
            input.disabled = false;
          }
        }
      });
    });

    // Écouteurs existants pour la sélection du BOX et la quantité
    const boxSelect = row.querySelector(".box-select");
    const quantityInput = row.querySelector(".box-quantity");

    function updateBoxPrice() {
      const selectedBox = boxSelect.value;
      const quantity = parseInt(quantityInput.value) || 1;
      const 資材PriceInput = row.querySelector("td:nth-child(8) input");
      資材PriceInput.value = selectedBox
        ? boxPrices[selectedBox] * quantity
        : "";
      calculateTotal(row);
    }

    boxSelect.addEventListener("change", updateBoxPrice);
    quantityInput.addEventListener("input", updateBoxPrice);

    // Écouteurs pour les calculs automatiques
    const priceInputs = row.querySelectorAll(".price-input");
    priceInputs.forEach((input) => {
      input.addEventListener("input", () => calculateTotal(row));
    });

    const paymentInput = row.querySelector(".payment-input");
    paymentInput.addEventListener("input", () => calculateTotal(row));

    const paymentMode = row.querySelector(".payment-mode");
    paymentMode.addEventListener("change", () => calculateTotal(row));
  }

  // Création de 50 lignes vides dans le tableau
  for (let i = 0; i < 50; i++) {
    // Création d'une nouvelle ligne
    const tr = document.createElement("tr");
    // Définition de la structure HTML de la ligne avec tous les champs nécessaires
    tr.innerHTML = `
      <td><input type="checkbox"></td>
      <td><input type="text" class="room-number" maxlength="4"></td>
      <td><div class="name-container"><input type="text" class="client-name"><span class="name-suffix">様</span></div></td>
      <td><input type="text" placeholder="品名"></td>
      <td><div class="price-container"><input type="number" placeholder="0" class="price-input"><span>¥</span></div></td>
      <td>${createBoxSelectHTML()}</td>
      <td><input type="number" class="box-quantity" value="1" min="1"></td>
      <td><div class="price-container"><input type="number" placeholder="0" class="price-input" readonly><span>¥</span></div></td>
      <td><div class="price-container"><input type="number" placeholder="0" class="total-price" readonly><span>¥</span></div></td>
      <td><div class="price-container"><input type="number" placeholder="0" class="payment-input"><span>¥</span></div></td>
      <td><div class="price-container"><input type="number" placeholder="0" class="change-output" readonly><span>¥</span></div></td>
      <td>
        <select class="payment-mode">
          <option value="現金">現金払い</option>
          <option value="部屋付">部屋付け</option>
        </select>
      </td>
      <td><input type="text" class="receipt-number" maxlength="14" placeholder="XXXX-XXXX-XXXX"></td>
      <td>${create担当者SelectHTML()}</td>
    `;
    tableBody.appendChild(tr);

    // Ajout des écouteurs d'événements à la ligne
    addRowEventListeners(tr);
  }

  // Remplir le sélecteur de responsable pour le transfert
  const transferStaffSelect = document.getElementById("transferStaffSelect");
  担当者リスト.forEach((name) => {
    const option = document.createElement("option");
    option.value = name;
    option.textContent = name;
    transferStaffSelect.appendChild(option);
  });

  // Restauration automatique des données du tableau
  restoreFromLocalStorage();

  // Ajout d'écouteurs pour sauvegarder à chaque modification
  document
    .getElementById("tableBody")
    .addEventListener("input", saveToLocalStorage);
  document
    .getElementById("tableBody")
    .addEventListener("change", saveToLocalStorage);

  // Supprimer les écouteurs d'événements pour le formatage des dates car ils ne sont plus nécessaires
});

// === Gestion du localStorage ===
function getTableData() {
  const rows = document.querySelectorAll("#tableBody tr");
  const data = [];
  rows.forEach((row) => {
    const cells = row.querySelectorAll("td");
    data.push({
      checked: cells[0].querySelector('input[type="checkbox"]').checked,
      roomNumber: cells[1].querySelector("input").value,
      name: cells[2].querySelector("input").value,
      item: cells[3].querySelector("input").value,
      freight: cells[4].querySelector("input").value,
      box: cells[5].querySelector("select").value,
      quantity: cells[6].querySelector("input").value,
      materialPrice: cells[7].querySelector("input").value,
      total: cells[8].querySelector("input").value,
      payment: cells[9].querySelector("input").value,
      change: cells[10].querySelector("input").value,
      paymentMode: cells[11].querySelector("select").value,
      receiptNumber: cells[12].querySelector("input").value,
      staff: cells[13].querySelector("select").value,
    });
  });
  return data;
}

function setTableData(data) {
  const rows = document.querySelectorAll("#tableBody tr");
  data.forEach((rowData, i) => {
    if (rows[i]) {
      const cells = rows[i].querySelectorAll("td");
      cells[0].querySelector('input[type="checkbox"]').checked =
        rowData.checked;
      cells[1].querySelector("input").value = rowData.roomNumber;
      cells[2].querySelector("input").value = rowData.name;
      cells[3].querySelector("input").value = rowData.item;
      cells[4].querySelector("input").value = rowData.freight;
      cells[5].querySelector("select").value = rowData.box;
      cells[6].querySelector("input").value = rowData.quantity;
      cells[7].querySelector("input").value = rowData.materialPrice;
      cells[8].querySelector("input").value = rowData.total;
      cells[9].querySelector("input").value = rowData.payment;
      cells[10].querySelector("input").value = rowData.change;
      cells[11].querySelector("select").value = rowData.paymentMode;
      cells[12].querySelector("input").value = rowData.receiptNumber;
      cells[13].querySelector("select").value = rowData.staff;
    }
  });
}

function saveToLocalStorage() {
  const data = getTableData();
  localStorage.setItem("tableData", JSON.stringify(data));
}

function restoreFromLocalStorage() {
  const savedData = localStorage.getItem("tableData");
  if (savedData) {
    setTableData(JSON.parse(savedData));
    // Message d'information
    showTemporaryMessage("前回のデータが復元されました。", "info");
  }
}

function clearLocalStorage() {
  localStorage.removeItem("tableData");
}
