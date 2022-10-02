import "../imports";
import "../../styles/pages/index/style.scss";
import Swiper, { Navigation } from "swiper";
import "swiper/css";
import "swiper/css/navigation";

document.addEventListener("DOMContentLoaded", async () => {
  const swiperNews = new Swiper(".swiper-news", {
    modules: [Navigation],
    observer: true,
    autoHeight: true,
    observeParents: true,
    spaceBetween: 30,
    navigation: {
      nextEl: ".news__arrow-next",
      prevEl: ".news__arrow-prev",
    },
    breakpoints: {
      1366: {
        slidesPerView: 4,
      },
      1023: {
        slidesPerView: 3,
      },
      767: {
        spaceBetween: 20,
        slidesPerView: 3,
      },
      600: {
        spaceBetween: 20,
        slidesPerView: 3,
      },
      400: {
        spaceBetween: 30,
        slidesPerView: 2,
      },
      320: {
        spaceBetween: 30,
        slidesPerView: 1,
      },
    },
  });
  const swiperReviews = new Swiper(".swiper-reviews", {
    modules: [Navigation],
    spaceBetween: 30,
    observer: true,
    autoHeight: true,
    observeParents: true,
    navigation: {
      nextEl: ".reviews__arrow-next",
      prevEl: ".reviews__arrow-prev",
    },
    breakpoints: {
      1366: {
        slidesPerView: 4,
      },
      1023: {
        slidesPerView: 3,
      },
      767: {
        spaceBetween: 20,
        slidesPerView: 3,
      },
      600: {
        spaceBetween: 20,
        slidesPerView: 3,
      },
      400: {
        spaceBetween: 30,
        slidesPerView: 2,
      },
      320: {
        spaceBetween: 30,
        slidesPerView: 1,
      },
    },
  });
  await fetch("new_index.php", {
    method: "GET",
  })
    .then((res) => res.json())
    .then((res) => {
      // Новости
      const newsList = document.querySelector(".news__list");
      while (newsList.firstChild) {
        newsList.removeChild(newsList.firstChild);
      }
      res.post_one.forEach((el) => {
        const imageElement = document.createElement("div");
        imageElement.innerHTML = el.image;
        const li = document.createElement("li");
        li.classList.add("news__item", "swiper-slide");
        //
        const img = document.createElement("img");
        img.classList.add("news__item-img");
        img.src = imageElement.children[0].getAttribute("src");
        img.alt = el.title;
        li.append(img);
        //
        const title = document.createElement("p");
        title.classList.add("news__item-title");
        title.textContent = el.title;
        li.append(title);
        //
        const text = document.createElement("p");
        text.classList.add("news__item-text");
        text.textContent = el.excerpt;
        li.append(text);
        //
        const link = document.createElement("a");
        link.classList.add("news__item-link");
        link.textContent = "Читать далее";
        link.href = `https://banya8.ru/blog?${el.link.split("/")[4]}`;
        li.append(link);
        //
        newsList.append(li);
      });
      // Информация
      const reviewsList = document.querySelector(".reviews__list");
      while (reviewsList.firstChild) {
        reviewsList.removeChild(reviewsList.firstChild);
      }
      res.post_two.forEach((el) => {
        const imageElement = document.createElement("div");
        imageElement.innerHTML = el.image;
        const li = document.createElement("li");
        li.classList.add("reviews__item", "swiper-slide");
        const link = document.createElement("a");
        link.classList.add("reviews__link");
        link.href = `https://banya8.ru/blog?${el.link.split("/")[4]}`;
        const img = document.createElement("img");
        img.classList.add("reviews__img");
        img.src = imageElement.children[0].getAttribute("src");
        img.alt = el.title;
        link.append(img);
        const span = document.createElement("span");
        span.textContent = el.title;
        link.append(span);
        li.append(link);
        reviewsList.append(li);
      });
    });
  if (document.location.hash) {
    const anchorWithout = document.location.hash.split("#")[1];
    document.location.hash = "";
    const element = document.getElementById(anchorWithout);
    window.scroll({
      top: element.offsetTop - 90,
      behavior: "smooth",
    });
  }
  const buttonMore = document.querySelector(".history__button");
  const historyText = document.querySelector(".history__text");
  buttonMore.addEventListener("click", () => {
    buttonMore.style.display = "none";
    historyText.classList.add("is-active");
  });
  const anchors = document.querySelectorAll('a[href*="#"]');
  for (let anchor of anchors) {
    anchor.addEventListener("click", (e) => {
      e.preventDefault();
      const anchorWithout = anchor.getAttribute("href").split("#")[1];
      const element = document.getElementById(anchorWithout);
      document.querySelector(".hamburger").click();
      window.scroll({
        top: element.offsetTop - 90,
        behavior: "smooth",
      });
    });
  }
});
