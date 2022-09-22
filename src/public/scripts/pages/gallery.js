import "../imports";
import "../../styles/pages/gallery/style.scss";
import Viewer from "viewerjs";
import "viewerjs/dist/viewer.min.css";

document.addEventListener("DOMContentLoaded", async () => {
  await fetch("hand.php", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((res) => {
      const galleryWrap = document.getElementById("my-gallery");
      while (galleryWrap.firstChild) {
        galleryWrap.removeChild(galleryWrap.firstChild);
      }
      res.forEach((el) => {
        if (el.includes("banya")) {
          const element = `
            <img class="gallery__wrap-img" src=${el} alt="Картинка в галерее" />
          `;
          galleryWrap.insertAdjacentHTML("beforeend", element);
        } else {
          const element = `
            <iframe src="https://rutube.ru/play/embed/${
              el.split("/")[4]
            }" frameBorder="0" allow="clipboard-write; autoplay" webkitAllowFullScreen mozallowfullscreen allowFullScreen></iframe>
          `;
          galleryWrap.insertAdjacentHTML("beforeend", element);
        }
      });
      const viewer = new Viewer(galleryWrap, {
        loop: false,
        keyboard: false,
        movable: false,
        navbar: false,
        rotatable: false,
        scalable: false,
        slideOnTouch: false,
        title: false,
        toggleOnDblclick: false,
        tooltip: false,
        toolbar: {
          zoomIn: false,
          zoomOut: false,
          oneToOne: false,
          reset: false,
          play: false,
          rotateLeft: false,
          rotateRight: false,
          flipHorizontal: false,
          flipVertical: false,
          prev: true,
          next: true,
        },
      });
    });
});
