const startingDate = document.getElementById("starting-date");
const startingTime = document.getElementById("starting-time");
const endingDate = document.getElementById("ending-date");
const endingTime = document.getElementById("ending-time");
const actualEndingDate = document.getElementById("actual-ending-date");
const actualEndingTime = document.getElementById("actual-ending-time");
const form = document.querySelector("form");
const workingHours = document.querySelector(".working-hours");
const result = document.querySelector(".result");
const comment = document.querySelector(".comment");

// Constantes pour les messages
const MSG_IMPOSSIBLE =
  "Veuillez entrer des données valides / 正しい情報を入力してください";
const MSG_NOT_WORKED =
  "Mais t'as pas bossé!! Tu te fous de moi?! / 仕事してないじゃん！ふざけてんのか？！";

form.addEventListener("submit", handleForm);

function handleForm(e) {
  e.preventDefault();

  calculateTotalWorkingHours();
  getExtraHoursinMinutes();
}

/**
 * Fonction qui calcule le temps de travail total en heures.
 */
function calculateTotalWorkingHours() {
  // on récupère le temps de début de travail
  const startDate = startingDate.value;
  const startTime = startingTime.value;

  // on récupère le temps de fin de travail réel
  const endDate = endingDate.value;
  const actualEndDate = actualEndingDate.value;
  const actualEndTime = endingTime.value;

  // on convertit les dates et les temps en objets Date
  const startDateTime = new Date(`${startDate}T${startTime}`);
  const endDateTime = new Date(`${endDate}T${actualEndTime}`);

  // on calcule la durée totale de travail en millisecondes
  const totalWorkingMilliseconds = endDateTime - startDateTime;

  // on vérifie si la date de début est postérieure à la date de fin
  if (startDateTime > endDateTime || actualEndDate !== endDate) {
    alert(MSG_IMPOSSIBLE);
    return; // Ajout d'un return pour arrêter l'exécution en cas d'erreur
  }

  // on convertit les millisecondes en heures
  const totalWorkingHours = totalWorkingMilliseconds / 1000 / 60 / 60;

  // on affiche le résultat dans l'élément HTML approprié

  if (totalWorkingHours <= 0) {
    workingHours.textContent = MSG_NOT_WORKED;
  } else {
    workingHours.textContent = `Tu as travaillé ${totalWorkingHours.toFixed(
      2
    )} heures aujourd'hui. / 今日の仕事時間は${totalWorkingHours.toFixed(
      2
    )}時間です`;
  }
}

/**
 * Fonction qui prend un string au format "HH:MM" et le convertit en minutes.
 * @param {string} time - le temps à convertir
 * @returns {number} - le temps en minutes
 */
function convertToMinutes(time) {
  // on récupère les heures et les minutes à partir du string
  const [hours, minutes] = time.split(":");
  // on convertit les heures en minutes
  const hoursInMinutes = parseInt(hours) * 60;
  // on ajoute les minutes
  const minutesInMinutes = parseInt(minutes);
  // on renvoie le résultat
  return hoursInMinutes + minutesInMinutes;
}

function getExtraHoursinMinutes(event) {
  const endTime = endingTime.value;
  const actualEndDate = actualEndingDate.value;
  const actualEndTime = actualEndingTime.value;

  // Convertir endTime en minutes
  const endTimeInMinutes = convertToMinutes(endTime);

  // Créer un objet Date pour actualEndTime
  const actualEndDateTime = new Date(`${actualEndDate}T${actualEndTime}`);

  // Convertir actualEndDateTime en minutes depuis minuit
  const actualEndTimeInMinutes =
    actualEndDateTime.getHours() * 60 + actualEndDateTime.getMinutes();

  const differenceInMinutes = actualEndTimeInMinutes - endTimeInMinutes;

  if (differenceInMinutes < 0) {
    result.textContent = MSG_IMPOSSIBLE;
  } else if (differenceInMinutes === 0) {
    result.textContent = `T'es sorti à l'heure! Bravo! Mais pourquoi tu utilises ça alors?! / 定時良かったね！じゃ、なんでこのアプリを使ってるの？`;
  } else {
    result.textContent = `T'as fait ${differenceInMinutes} minutes d'heures supplémentaires / 残業${differenceInMinutes}分`;
  }

  // Gestion des commentaires basée sur la différence de temps
  setTimeout(() => {
    if (differenceInMinutes < 0) {
      comment.textContent = `Tu te fous de moi ?! / ふざけんな！`;
    } else if (differenceInMinutes === 0) {
      comment.textContent = ``;
    } else if (differenceInMinutes <= 30) {
      comment.textContent = `T'as eu de la chance ! / ラッキーじゃないか！`;
    } else if (differenceInMinutes <= 60) {
      comment.textContent = `Comme d'habitude hein? / 相変わらずだね`;
    } else if (differenceInMinutes <= 90) {
      comment.textContent = `Faudrait p'tet lever le pied ! / やりすぎじゃない？`;
    } else if (differenceInMinutes <= 120) {
      comment.textContent = `Bon ça suffit maintenant ! / いい加減にしろ！`;
    } else {
      comment.textContent = `Mais merde! Va dormir!! / はやく寝ろ！クソバカやろう！！`;
    }
  }, 2000);
}
