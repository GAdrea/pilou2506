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

  function numSpan(value, extraClass) {
    return `<span class="num${extraClass ? " " + extraClass : ""}">${value}</span>`;
  }

  function pluralize(value, word, extraClass) {
    return `${numSpan(value, extraClass)} ${word}${value > 1 ? "s" : ""}`;
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

      lifetimeCount.innerHTML = `Tu as vécu ${pluralize(
        years,
        "année"
      )} soit: ${pluralize(days, "jour")} ${pluralize(
        hours,
        "heure"
      )} ${pluralize(minutes, "minute")} ${pluralize(
        seconds,
        "seconde",
        "seconds-num"
      )}`;
      jptext.innerHTML = `あなたは${numSpan(years)}年生きている。つまり、${numSpan(
        days
      )}日${numSpan(hours)}時間${numSpan(minutes)}分${numSpan(
        seconds,
        "seconds-num"
      )}秒`;
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

  handleLifeTimeCount();
  const intervalId = setInterval(handleLifeTimeCount, 1000);
});