/*            <div class="card shadow mb-2" > _divContainer
                        <div class="card-body"> _divBody
                              <div class="d-flex mb-3 align-items-center"> _divInfo
                                    <img class="rounded-circle border object-fit-cover me-3" src="https://i.pravatar.cc/" style="width:40px;">
                                    <span class="d-flex  flex-column">
                                    <h5 class="fs-6 fw-bold">Kurt James</h5>
                                    <span class="fs-6 fw-light">Feb 1 (13 hours ago)</span>
                                    </span>
                                </div>
                              <div> divTags
                                    <h1 class="card-title"><a href="">Playwright Tips From the Checkly Community</a> </h1>
                                    <ul class="list-tag__main">
                                        <li class="">#news</li>
                                        <li class="">#javascript</li>
                                        <li class="">#webdev</li>
                                        <li class="">#gatsby</li>
                                    </ul>
                              </div>
                              <div class="d-flex justify-content-between w-100"> divReactions
                                <div class="d-flex align-items-center" > divInfoReactions
                                    <span class="d-flex align-items-center me-3">
                                        <img src="../assets/heart-icon.svg" alt="">
                                        5 Reactions
                                    </span>
                                    <span class="d-flex align-items-center" >
                                        <img src="../assets/comment-icon.svg" alt="">
                                        6 Comments
                                    </span>
                                </div>
                            
                                <div> divCreationTime
                                    <span class="d-flex align-items-center">3 min <img src="../assets/save-icon.svg" alt=""></span>
                                </div>
                            </div>

                        </div>
                    </div>
                 */

const postPrint = (nameInfo, dateCreate, postTitle, postTags, key,deletePost, comments,image) => {
  let divContainer = document.createElement("div");
  divContainer.classList.add(..."card shadow mb-2".split(" "));

  let cover = document.createElement('img')

  cover.classList.add("card-img-cover")

  cover.setAttribute('src',image)

  let divBody = document.createElement("div");
  divBody.classList.add("card-body");

  //divInfoContent
  let divInfoContent = document.createElement('div')
  divInfoContent.classList.add(..."d-flex justify-content-between".split(" "));

  let deleteBtn = document.createElement('button')
  deleteBtn.classList.add(..."btn-delete".split(" "));
  deleteBtn.innerHTML = "&times;"
  deleteBtn.addEventListener('click',(e)=>{
    deletePost(key)
    e.target.parentNode.parentNode.parentNode.remove()
  })




  let divInfo = document.createElement("div");
  divInfo.classList.add(..."d-flex mb-3 align-items-center".split(" "));

  let imgData = document.createElement("img");
  imgData.classList.add(
    ..."rounded-circle border object-fit-cover me-3".split(" ")
  );
  imgData.setAttribute("src", "https://picsum.photos/200/100");
  imgData.setAttribute("style", "width:35px; height:35px; object-fit:cover");

  let spanName = document.createElement("span");
  spanName.classList.add(..."d-flex flex-column".split(" "));
  let h5Name = document.createElement("h5");
  h5Name.classList.add(..."fs-6 fw-bold".split(" "));
  h5Name.textContent = nameInfo;
  let spanDateCreate = document.createElement("span");
  spanDateCreate.classList.add(..."date-text fw-light".split(" "));
  spanName.append(h5Name, spanDateCreate);

  spanDateCreate.textContent = `${moment(dateCreate).format(
    "MMM DD"
  )} (${moment(dateCreate).startOf("hour").fromNow()})`;

  divInfo.append(imgData, spanName);
  divInfoContent.append(divInfo,deleteBtn)

  let divTags = document.createElement("div");

  let h1Title = document.createElement("h1");
  h1Title.classList.add("card-title");

  let anchor = document.createElement("a");
  anchor.setAttribute("href", `./detailPost.html?postId=${key}`);
  anchor.textContent = postTitle;

  h1Title.appendChild(anchor);

  let ulTags = document.createElement("ul");
  ulTags.classList.add("list-tag__main");
  ulTags.setAttribute("id", "list-tag");
  let liArray = Object.values(postTags);

  liArray.forEach((element) => {
    let liTag = document.createElement("li");
    liTag.textContent = `#${element}`;
    ulTags.appendChild(liTag);
  });

  divTags.append(h1Title, ulTags);

  let divReactions = document.createElement("div");
  divReactions.classList.add(
    ..."d-flex justify-content-between w-100".split(" ")
  );

  let divInfoReactions = document.createElement("div");
  divInfoReactions.classList.add(..."d-flex align-items-center".split(" "));

  let spanReactions = document.createElement("span");
  let spanTextReactions = document.createElement("span")
  spanReactions.classList.add(..."d-flex align-items-center me-3".split(" "));
  spanTextReactions.textContent = "0 Reactions";
  let imgReaction = document.createElement("img");
  imgReaction.classList.add(..."me-2 cursor-pointer".split(" "));
  imgReaction.setAttribute("src", "../assets/heart-icon.svg");

  imgReaction.addEventListener("click", (e) => {
    //loca
    let reactionCount = parseInt(spanTextReactions.textContent);
    //save in local storage
    let reactionArray = JSON.parse(localStorage.getItem("reactionArray")) || {
      
    };
    reactionArray.push(key);
    localStorage.setItem("reactionArray", JSON.stringify(reactionArray));

    //change in the DOM
    imgReaction.setAttribute("src", "../assets/heart-icon-active.svg");
    imgReaction.setAttribute("style", "width: 20px; height: 20px;");
    spanTextReactions.textContent = `${reactionCount + 1} Reactions`;

    //save reaction in local storage
    let reactionObject = JSON.parse(localStorage.getItem("reactionObject")) || {

    };
    reactionObject[key] = reactionCount + 1;
    localStorage.setItem("reactionObject", JSON.stringify(reactionObject));

  


  });

  spanReactions.append(imgReaction,spanTextReactions);

  let spanCommnets = document.createElement("span");
  let spanTextComments = document.createElement("span")
  let commentArray = comments ? Object.values(comments) : []
  let commentCount = commentArray.length
  
  spanTextComments.textContent = `${commentCount} Comments`

  let imgComment = document.createElement("img");
  imgComment.setAttribute("src", "../assets/comment-icon.svg");

  spanCommnets.append(imgComment,spanTextComments)

  divInfoReactions.append(spanReactions, spanCommnets);

  let divCreationTime = document.createElement("div");

  let spanTime = document.createElement("span");
  spanTime.classList.add(..."d-flex align-items-center".split(" "));
  spanTime.textContent = "3 min";

  let imageContent = document.createElement("img");
  imageContent.setAttribute("src", "../assets/save-icon.svg");

  spanTime.appendChild(imageContent);
  divCreationTime.appendChild(spanTime);

  divReactions.append(divInfoReactions, divCreationTime);

  divBody.append(divInfoContent, divTags, divReactions);
  divContainer.append(cover,divBody);

  return divContainer;
};

const createCommentCard = (commentName,commentText, commentDate,id,key,deleteComment) => {
  let divContainer = document.createElement("div");
  divContainer.classList.add("comment");

  let divComment = document.createElement("div");
  divComment.classList.add("card-comment");

  let divInfo = document.createElement("div");
  divInfo.classList.add("d-flex");

  let imgUser = document.createElement("img");
  imgUser.classList.add(
    ..."rounded-circle border object-fit-cover me-3".split(" ")
  );
  imgUser.setAttribute("src", "https://i.pravatar.cc/");
  imgUser.setAttribute("style", "width: 40px; height: 40px; object-fit: cover");

  let creationInfoContainer = document.createElement("div");
  creationInfoContainer.classList.add(..."card w-100 p-3".split(" "));

  let createInfo = document.createElement("div");
  createInfo.classList.add(..."d-flex justify-content-between".split(" "));

  let h5Name = document.createElement("h5");
  h5Name.classList.add(..."fs-6 fw-bold me-5".split(" "));
  h5Name.textContent = commentName;

  let spanDate = document.createElement("span");
  spanDate.classList.add(..."fs-6 fw-light ms-3".split(" "));
  spanDate.textContent = `${moment(commentDate).fromNow()}`;


  h5Name.appendChild(spanDate);

  let divDrop = document.createElement("div");
  divDrop.classList.add("dropDown");

  let buttonclose = document.createElement("button");
  buttonclose.classList.add(
    ..."btn btn-sm btn-outline dropdown-toggle".split(" ")
  );
  buttonclose.setAttribute("id", "dropdownMenuButton1");
  buttonclose.setAttribute("type", "button");
  buttonclose.setAttribute("data-bs-toggle", "dropdown");
  buttonclose.setAttribute("aria-expanded", "false");

  let imageClose = document.createElement("img");
  imageClose.classList.add("iconellipsis");
  imageClose.setAttribute("src", "../assets/ellipsis.svg");
  imageClose.setAttribute("alt", "ellipsis");
  imageClose.setAttribute("with", "24");
  imageClose.setAttribute("height", "24");

  buttonclose.appendChild(imageClose);

  let ulList = document.createElement("ul");
  ulList.classList.add("dropdown-menu");
  ulList.setAttribute("aria-labelledby", "dropdownMenuButton1");

  let liList = document.createElement("li");

  let anchor = document.createElement("a");
  anchor.classList.add("dropdown-item");
  anchor.textContent = "Delete";

  anchor.addEventListener("click", (e) => {
    deleteComment(id,key);
    e.target.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.remove();
   

  });


  liList.appendChild(anchor);

  ulList.appendChild(liList);

  divDrop.append(buttonclose, ulList);

  createInfo.append(h5Name, divDrop);

  let pInfo = document.createElement("p");
  pInfo.classList.add("card-text");
  pInfo.textContent = commentText;

  creationInfoContainer.append(createInfo, commentText);

  divInfo.append(imgUser,creationInfoContainer);

  let divReactions = document.createElement("div");
  divReactions.classList.add(..."ms-5 ps-2 mb-4 d-flex".split(" "));

  let spanLikes = document.createElement("span");
  let spanTextLikes = document.createElement("span")
  spanTextLikes.textContent = "1 like";

  let imgLike = document.createElement("img");
  imgLike.classList.add("iconlike");
  imgLike.setAttribute("src", "../assets/heart-icon.svg");
  imgLike.setAttribute("alt", "like");
  imgLike.setAttribute("width", "24");
  imgLike.setAttribute("height", "24");

  spanLikes.append(imgLike,spanTextLikes);

  let spanComment = document.createElement("span");
  spanComment.classList.add("ms-3");
  let spanTextComment = document.createElement("span")
  spanTextComment.textContent = "Comment";

  let imgComment = document.createElement("img");
  imgComment.classList.add("icondislike");
  imgComment.setAttribute("src", "../assets/comment-icon.svg");
  imgComment.setAttribute("alt", "dislike");
  imgComment.setAttribute("width", "24");
  imgComment.setAttribute("height", "24");

  spanComment.append(imgComment,spanTextComment);

  divReactions.append(spanLikes, spanComment);

  divContainer.append(divInfo, divReactions);

  return divContainer;
};

export { postPrint, createCommentCard };
