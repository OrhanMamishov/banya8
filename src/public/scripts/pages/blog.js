import "../imports";
import "../../styles/pages/blog/style.scss";

document.addEventListener("DOMContentLoaded", async () => {
  await fetch("https://banya8.ru/blog/hand.php", {
    method: "GET",
  })
    .then((res) => res.json())
    .then((res) => {
      const url = document.location.href;
      if (url.includes("?")) {
        viewBlog(res.blog, url.split("?")[1]);
      } else {
        allBlogs(res.blog);
      }
    });
});

function viewBlog(res, name) {
  const blogSection = document.querySelector(".blog");
  while (blogSection.firstChild) {
    blogSection.removeChild(blogSection.lastChild);
  }
  let trigger = false;
  Object.values(res).forEach((blogs) => {
    Object.values(blogs.posts).forEach((blog) => {
      if (blog.url.split("/")[4] == name && !trigger) {
        const element = `
        <div class="blog__wrap container">
          <div class="viewblog">
            <article class="viewblog__article">
              <img
                src="${blog.img}"
                alt="${blog.name}"
                class="viewblog__img"
              />
              <p class="viewblog__title">${blog.name}</p>
              <p class="viewblog__text">
                ${blog.text}
              </p>
            </article>
            <aside class="viewblog__aside">
              <p class="viewblog__aside-title">Посмотрите ещё:</p>
              ${Object.values(res)
                .map((blogs) => {
                  return `
                  ${Object.values(blogs.posts)
                    .map((blog) => {
                      return `
                        <a href="#${
                          blog.url.split("/")[4]
                        }" class="viewblog__aside-link"> ${blog.name} </a>
                      `;
                    })
                    .join("")}
                  `;
                })
                .join("")}
                <button class="viewblog__aside-button">Вернуться ко всем блогам</button>
            </aside>
          </div>
        </div>
      `;
        blogSection.insertAdjacentHTML("beforeend", element);
        trigger = true;
      }
    });
  });
  const allLinks = document.querySelectorAll(".viewblog__aside-link");
  allLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const url = document.location.origin;
      const newUrl = url + `/blog?${link.href.split("#")[1]}`;
      history.pushState(null, null, newUrl);
      viewBlog(res, link.href.split("#")[1]);
    });
  });
  const blogButton = document.querySelector(".viewblog__aside-button");
  blogButton.addEventListener("click", () => {
    allBlogs(res);
    const url = document.location.href;
    const newUrl = url.split("?")[0];
    history.pushState(null, null, newUrl);
  });
}

function allBlogs(res) {
  const blogSection = document.querySelector(".blog");
  while (blogSection.firstChild) {
    blogSection.removeChild(blogSection.lastChild);
  }
  const element = `
  <h2 class="blog__title">Блог</h2>
    <div class="blog__wrap container">     
      ${Object.values(res)
        .map((blogs) => {
          return `
          <p class="blog__name"> ${blogs.name} </p>
          <ul class="blog__list">
          ${Object.values(blogs.posts)
            .map((blog) => {
              const liElement = document.createElement("li");
              liElement.classList.add("blog__item");
              const aElement = document.createElement("a");
              aElement.classList.add("blog__link");
              aElement.href = blog.url.split("/")[4];
              const imgWrap = document.createElement("div");
              imgWrap.classList.add("blog__img-wrap");
              const imgElement = document.createElement("img");
              imgElement.classList.add("blog__img");
              imgElement.src = blog.img;
              imgElement.alt = blog.name;
              const pElementTitle = document.createElement("p");
              pElementTitle.classList.add("blog__item-title");
              pElementTitle.textContent = blog.name;
              imgWrap.append(imgElement, pElementTitle);
              const pElementText = document.createElement("p");
              pElementText.classList.add("blog__item-text");
              pElementText.textContent = blog.text;
              const pElementMore = document.createElement("button");
              pElementMore.classList.add("blog__item-more");
              pElementMore.textContent = "Читать далее";
              aElement.append(imgWrap, pElementText, pElementMore);
              liElement.append(aElement);
              return liElement.outerHTML;
            })
            .join("")}
          </ul>
          `;
        })
        .join("")}
    </div>
  `;
  blogSection.insertAdjacentHTML("beforeend", element);
  const allLinks = document.querySelectorAll(".blog__link");
  allLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const url = document.location.origin;
      const newUrl = `${url}/blog?${link.getAttribute("href")}`;
      console.log(newUrl);
      history.pushState(null, null, newUrl);
      viewBlog(res, link.getAttribute("href"));
    });
  });
}
