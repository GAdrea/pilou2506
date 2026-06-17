document.addEventListener("DOMContentLoaded", function () {
  const fullDateNow = document.querySelector(".full-date-now");
  const lifetimeCount = document.querySelector(".lifetime-count");
  const jptext = document.querySelector(".jptext");
  const birthdayMessage = document.querySelector(".birthday-message");
  const jpbirthdayMessage = document.querySelector(".jpbirthday-message");

  fullDateNow.textContent = new Date().toLocaleString("fr-FR", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  function pluralize(value, word) {
    return value + " " + word + (value > 1 ? "s" : "");
  }

  function handleLifeTimeCount() {
    const birthDate = new Date(1988, 5, 11, 23, 10, 15);
    let dateNow = new Date();
    const difference = dateNow - birthDate;

    if (difference > 0) {
      const years = Math.floor(difference / (1000 * 60 * 60 * 24 * 365));
      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      lifetimeCount.textContent = `Tu as vécu ${pluralize(
        years,
        "année"
      )} soit: ${pluralize(days, "jour")} ${pluralize(
        hours,
        "heure"
      )} ${pluralize(minutes, "minute")} ${pluralize(seconds, "seconde")}`;
      jptext.textContent = `あなたは${years}年生きている。つまり、${days}日${hours}時間${minutes}分${seconds}秒`;
    }
    if (
      dateNow.getMonth() === birthDate.getMonth() &&
      dateNow.getDate() === birthDate.getDate()
    ) {
      birthdayMessage.textContent = "Joyeux anniversaire!!";
      jpbirthdayMessage.textContent = "お誕生日おめでとう!!";
      clearInterval(intervalId);
    }
  }

  const intervalId = setInterval(handleLifeTimeCount, 1000);
});