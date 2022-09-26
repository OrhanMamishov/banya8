import "../../styles/components/header/style.scss";
import { bodyScrollToggle } from "../functions/scrollBody";

document.addEventListener("DOMContentLoaded", async () => {
  await fetch("../new_index.php", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
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
      res.menu[1].forEach((el) => {
        const element = `
          <li class="header__menu-item">
            <a href="${el.url}" class="header__menu-link">${el.title}</a>
          </li
        `;
        rightMenu.insertAdjacentHTML("beforeend", element);
      });
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
              n_deadline = new Date(nextDay.setHours(14, 00, 0, 0)); // следующий день 14.00
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
  }
});
