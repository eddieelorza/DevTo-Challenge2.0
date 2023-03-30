import { createComment, getComment,deleteComment} from '../api/api.js';
import {createCommentCard} from './modulePost.js';

let urlParams = new URLSearchParams(window.location.search);
let postIds = urlParams.get("postId");

let btn = document.getElementById('comment-btn');
let comment = document.getElementById('text-comment');
let userName = document.getElementById('name-comment');
let wrapper = document.getElementById('comment-wrapper');
let commentLen = document.getElementById('comment-length');
wrapper.innerHTML = '';

const getCommentList = async () => {
    wrapper.innerHTML = '';
    let commentList = await getComment(postIds);
    let newArray = Object.values(commentList);
    let counter = newArray.length;

    for(let key in commentList){
        let{comment,name,date} = commentList[key];
        console.log(commentList[key])
        wrapper.appendChild(createCommentCard(name,comment,date,postIds,key,deleteComment))
    }
    commentLen.textContent = `(${counter})`
    
}

getCommentList();

const createCommetForm = () => {
    let commentArray = {
        date: new Date().getTime(),
        name: userName.value,
        comment: comment.value,
    }
    createComment(commentArray, postIds)
}

btn.addEventListener('click', () => {
  
    createCommetForm();
    getCommentList();
    wrapper.innerHTML = '';
    comment.value = '';
    userName.value = '';
}
)


