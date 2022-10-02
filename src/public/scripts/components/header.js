import "../../styles/components/header/style.scss";
import { bodyScrollToggle } from "../functions/scrollBody";

document.addEventListener("DOMContentLoaded", async () => {
  await fetch("https://banya8.ru/new_index.php", {
    method: "GET",
  })
    .then((res) => res.json())
    .then((res) => {
      const headerMenus = document.querySelectorAll(".header__menu-list");
      const [leftMenu, rightMenu] = headerMenus;
      res.menu[0].forEach((el) => {
        const element = `
          <li class="header__menu-item">
            <a href="${el.url}" class="header__menu-link">${el.title}</a>
          </li
        `;
        leftMenu.insertAdjacentHTML("beforeend", element);
      });
      // res.menu[1].forEach((el) => {
      //   const element = `
      //     <li class="header__menu-item">
      //       <a href="${el.url}" class="header__menu-link">${el.title}</a>
      //     </li
      //   `;
      //   rightMenu.insertAdjacentHTML("beforeend", element);
      // });
    });
  const hamburger = document.querySelector(".hamburger");
  const header = document.querySelector(".header");
  const headerMenu = document.querySelector(".header__menu");
  const headerBottom = document.querySelector(".header__wrap-bottom");
  const headerDescription = document.querySelector(".header__description");
  hamburger.addEventListener("click", () => {
    bodyScrollToggle();
    hamburger.classList.toggle("is-active");
    header.classList.toggle("is-active");
    headerMenu.classList.toggle("is-active");
    headerBottom.classList.toggle("is-active");
    headerDescription.classList.toggle("is-active");
  });
  document.addEventListener("scroll", () => {
    const neededScroll = window.screen.width < 768 ? 300 : 500;
    if (window.pageYOffset > neededScroll) {
      header.classList.add("is-scrolled");
      document.querySelector(".main").classList.add("is-active");
    } else {
      header.classList.remove("is-scrolled");
      document.querySelector(".main").classList.remove("is-active");
    }
  });
  // реализация таймера
  const time_days = [18, 19, 20];
  const time_weekend = [14, 16, 18, 20];
  const d = new Date();
  const t = d.getHours();
  let days = [
    "Воскресенье",
    "Понедельник",
    "Вторник",
    "Среда",
    "Четверг",
    "Пятница",
    "Суббота",
  ];
  let n_deadline = "";
  let dayWeekNow = days[d.getDay()];
  setTimeOnTimer(dayWeekNow);
  function setTimeOnTimer(dayweek) {
    switch (dayweek) {
      case "Воскресенье": {
        let nextDay = new Date(d); // следующий день
        nextDay.setDate(d.getDate() + 3); // на среду
        n_deadline = new Date(nextDay.setHours(18, 30, 0, 0));
        break;
      }
      case "Вторник": {
        let nextDay = new Date(d);
        nextDay.setDate(d.getDate() + 1);
        n_deadline = new Date(nextDay.setHours(18, 30, 0, 0));
        break;
      }
      case "Четверг": {
        let changed = false; // триггер для проверки установлено ли время
        time_days.forEach((time) => {
          if (!changed) {
            // если время не установлено
            if (t >= 20) {
              // если время выше чем 20-00
              let nextDay = new Date(d); // создаем новую дату
              nextDay.setDate(d.getDate() + 1); //прибавляем к дате 1
              n_deadline = new Date(nextDay.setHours(18, 30, 0, 0)); // следующий день 18.30
              changed = true; // время установлено
            }
            if (t <= time) {
              // если время меньше чем time
              n_deadline = new Date(d.setHours(time, 30, 0, 0)); // это время и 30 минут
              changed = true; // время установлено
            }
          }
        });
        break;
      }
      case "Понедельник": {
        let nextDay = new Date(d); // следующий день
        nextDay.setDate(d.getDate() + 2); // на среду
        n_deadline = new Date(nextDay.setHours(18, 30, 0, 0));
        break;
      }
      case "Среда": {
        let changed = false; // триггер для проверки установлено ли время
        time_days.forEach((time) => {
          if (!changed) {
            // если время не установлено
            if (t >= 20) {
              // если время выше чем 20-00
              let nextDay = new Date(d); // создаем новую дату
              nextDay.setDate(d.getDate() + 1); //прибавляем к дате 1
              n_deadline = new Date(nextDay.setHours(18, 30, 0, 0)); // следующий день 18.30
              changed = true; // время установлено
            }
            if (t <= time) {
              // если время меньше чем time
              n_deadline = new Date(d.setHours(time, 30, 0, 0)); // это время и 30 минут
              changed = true; // время установлено
            }
          }
        });
        break;
      }
      case "Пятница": {
        let changed = false; // триггер для проверки установлено ли время
        time_days.forEach((time) => {
          if (!changed) {
            // если время не установлено
            if (t >= 20) {
              // если время выше чем 20-00
              let nextDay = new Date(d); // создаем новую дату
              nextDay.setDate(d.getDate() + 1); //прибавляем к дате 1
              n_deadline = new Date(nextDay.setHours(14, 0, 0, 0)); // следующий день 14.00
              changed = true; // время установлено
            }
            if (t <= time) {
              // если время меньше чем time
              n_deadline = new Date(d.setHours(time, 30, 0, 0)); // это время и 30 минут
              changed = true; // время установлено
            }
          }
        });
        break;
      }
      case "Суббота": {
        let changed = false;
        time_weekend.forEach((time) => {
          if (!changed) {
            if (t >= 20) {
              let nextDay = new Date(d);
              nextDay.setDate(d.getDate() + 4);
              n_deadline = new Date(nextDay.setHours(18, 30, 0, 0));
              changed = true;
            }
            if (t <= time) {
              if (t == time) {
                n_deadline = new Date(d.setHours(time + 2, 0, 0, 0));
              } else {
                n_deadline = new Date(d.setHours(time, 0, 0, 0));
              }
              changed = true;
            }
          }
        });
        break;
      }
    }
    const deadline = n_deadline; // new Date("Aug 11, 2022 18:30:00").getTime(); // new Date(new Date().getFullYear(), new Date().getMonth() + 1, 01);
    // id таймера
    let timerId = null;
    // склонение числительных
    function declensionNum(num, words) {
      return words[
        num % 100 > 4 && num % 100 < 20
          ? 2
          : [2, 0, 1, 1, 1, 2][num % 10 < 5 ? num % 10 : 5]
      ];
    }
    // вычисляем разницу дат и устанавливаем оставшееся времени в качестве содержимого элементов
    function countdownTimer() {
      const diff = deadline - new Date();
      if (diff <= 0) {
        clearInterval(timerId);
      }
      const days = diff > 0 ? Math.floor(diff / 1000 / 60 / 60 / 24) : 0;
      const hours = diff > 0 ? Math.floor(diff / 1000 / 60 / 60) % 24 : 0;
      const minutes = diff > 0 ? Math.floor(diff / 1000 / 60) % 60 : 0;
      const seconds = diff > 0 ? Math.floor(diff / 1000) % 60 : 0;
      $days.textContent = days < 10 ? "0" + days : days;
      $hours.textContent = hours < 10 ? "0" + hours : hours;
      $minutes.textContent = minutes < 10 ? "0" + minutes : minutes;
      $seconds.textContent = seconds < 10 ? "0" + seconds : seconds;
      $days.dataset.title = declensionNum(days, ["день", "дня", "дней"]);
      $hours.dataset.title = declensionNum(hours, ["час", "часа", "часов"]);
      $minutes.dataset.title = declensionNum(minutes, [
        "минута",
        "минуты",
        "минут",
      ]);
      $seconds.dataset.title = declensionNum(seconds, [
        "секунда",
        "секунды",
        "секунд",
      ]);
    }
    // получаем элементы, содержащие компоненты даты
    const $days = document.querySelector(".timer__days");
    const $hours = document.querySelector(".timer__hours");
    const $minutes = document.querySelector(".timer__minutes");
    const $seconds = document.querySelector(".timer__seconds");
    // вызываем функцию countdownTimer
    countdownTimer();
    // вызываем функцию countdownTimer каждую секунду
    timerId = setInterval(countdownTimer, 1000);
  }
});
