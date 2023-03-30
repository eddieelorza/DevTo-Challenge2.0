import { createPost } from "../api/api.js";

let btn = document.getElementById("add-button");

let inputTag = document.getElementById("key-tag");
let tagList = document.getElementById("tag-list");
let textareaContent = document.getElementById("key-content");
let inputTitle = document.getElementById("key-title");
let inputAuthor = document.getElementById("key-author");
let inputImage = document.getElementById("key-image");
let inputRelevant = document.getElementById("key-relevant");
let tags = [];
let postInfo = {};

const createForm = () => {
  let TagArray = Object.values(tags);
  let relevant =
    inputRelevant.type === "checkbox"
      ? inputRelevant.checked
      : inputRelevant.value;
  postInfo = {
    title: inputTitle.value,
    image: inputImage.value,
    author: inputAuthor.value,
    Tag: TagArray,
    comments: {},
    content: textareaContent.value,
    relevant: relevant,
    date: new Date().getTime(),
  };
  console.log(postInfo);
  createPost(postInfo);
};

const createTag = () => {
  tagList.innerHTML = "";
  tags.forEach((tag) => {
    let li = document.createElement("li");
    li.classList.add("tag-item");
    let span = document.createElement("span");
    span.textContent = `#${tag}`;
    let close = document.createElement("span");
    close.setAttribute("class", "close");
    close.innerHTML = "&times;";
    li.append(span, close);

    tagList.appendChild(li);
    console.log(tag);
  });
  removeTag();
};

// //remove tag
const removeTag = () => {
  let close = document.querySelectorAll(".close");
  close.forEach((item, index) => {
    item.addEventListener("click", () => {
      tags.splice(index, 1);
      createTag();
    });
  });
};

const addTag = (e) => {
  if (e.key === "Enter") {
    let tag = e.target.value.replace(/\s+/g, " ");
    if (tag.length > 1 && !tags.includes(tag)) {
      if (tags.length >= 4) {
        let tagAlert = document.querySelector(".tag-alert");
        tagAlert.style.display = "block";
        setTimeout(() => {
          tagAlert.style.display = "none";
        }, 5000);
        return;
      }
      tag.split(",").forEach((tag) => {
        tags.push(tag);
        createTag();
      });
    }
    e.target.value = "";
  }
};

inputTag.addEventListener("keyup", addTag);

btn.addEventListener("click", () => {
  createForm();
  window.open("../../views/home.html", "_self");
});

// const myModal = document.getElementById('myModal')
// const myInput = document.getElementById('myInput')

// myModal.addEventListener('shown.bs.modal', () => {
//   myInput.focus()
// })

let leaveBtn = document.getElementById("leave-btn");

leaveBtn.addEventListener("click", () => {
  window.open("../../views/home.html", "_self");
});

let preview = document.getElementById("id-preview");
let edit = document.getElementById("id-edit");

edit.addEventListener("click", () => {
  document.getElementById("preview").style.display = "none";
  document.getElementById("list-input").style.display = "block";
});

let previewTitle = document.getElementById("preview-title");
let previewImage = document.getElementById("preview-image");
let previewAuthor = document.getElementById("preview-author");
let previewTagList = document.getElementById("preview-tag-list");
let previewContent = document.getElementById("preview-content");
let previewRelevant = document.getElementById("preview-relevant");

preview.addEventListener("click", () => {
  document.getElementById("list-input").style.display = "none";
  document.getElementById("preview").style.display = "block";

  let TagArrays = Object.values(tags);
  let relevants =
    inputRelevant.type === "checkbox"
      ? inputRelevant.checked
      : inputRelevant.value;
  postInfo = {
    title: inputTitle.value,
    image: inputImage.value,
    author: inputAuthor.value,
    Tag: TagArrays,
    comments: {},
    content: textareaContent.value,
    relevant: relevants,
    date: new Date().getTime(),
  };
  let { title, image, author, Tag, content, relevant } = postInfo;
  previewTitle.innerHTML = title;
  previewImage.setAttribute("src", image);
  previewImage.setAttribute("style", "width: 100%; height: 100%");
  previewAuthor.innerHTML = author;
  previewContent.innerHTML = content;
  previewRelevant.innerHTML = relevants;
  previewTagList.innerHTML = "";
  Tag.forEach((tag) => {
    let li = document.createElement("li");
    li.classList.add("tag-item");
    let span = document.createElement("span");
    span.textContent = `#${tag}`;
    li.append(span);
    previewTagList.appendChild(li);
  });
});
