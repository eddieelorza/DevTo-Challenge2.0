import { getPostId } from "../api/api.js";

let urlParams = new URLSearchParams(window.location.search);
let postId = urlParams.get("postId");

const printPost = async () => {
  let postDetail = await getPostId(postId);

  let { image, author, date, title, Tag, content } = postDetail;

  document.querySelector("#post-image").setAttribute("src", image);

  let authors = document.querySelectorAll(".author");

  authors.forEach((element) => {
    element.textContent = author;
  });

  document.querySelector("#post-date").textContent = `${moment(date).format(
    "MMM Do"
  )} (${moment(date).startOf("day").fromNow()})`;

  document.querySelector("#post-title").textContent = title;

  let ulTages = document.querySelector("#list-tags");

  let liArray = Object.values(Tag);

  liArray.forEach((element) => {
    let liTag = document.createElement("li");
    liTag.textContent = `#${element}`;
    ulTages.append(liTag);
  });

  document.querySelector("#post-content").textContent = content;
};

printPost();