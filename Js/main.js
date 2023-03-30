import { getPost,deletePost} from "./api/api.js";
import { postPrint } from "./component/modulePost.js";


let wrapper = document.getElementById("container-wrapper")

const printCard = async (filterBy) => {
    let filter = input.value.toUpperCase()
    let post = await getPost()
    let dataPost = post.data
//   start latest filter
    if (filterBy == 'latest'){
        let dataArray = Object.values(dataPost)
        let sortedPosts = []
        
        dataArray.forEach(post => {
            if (post.date) 
                sortedPosts.push(post)
        })

        sortedPosts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
        dataPost = Object.assign({}, sortedPosts)    
    }
//    end latest filter

    for (let key in dataPost){
        let {Tag, author, comments, content, date, image, relevant, title}  = dataPost[key] 
        let col;
       
// start relevant filter
        if (filterBy == 'relevant'){  
            if (dataPost[key].relevant) {
                let {Tag, author, date, title} = dataPost[key]
                col = postPrint(author, date, title, Tag, key,  deletePost,comments,image)
            }
             
        } else {
            col = postPrint(author, date, title, Tag,key, deletePost,comments,image)
        }
// end relevant filter        
        
        // let newText = document.createElement("h3")
        // newText.innerText = 'No se encontro'
        if(title.toUpperCase().indexOf(filter) > -1){
            col != null ? wrapper.append(col) : null
        }

    }
}

// start anchor events

let relevantWrapper = document.getElementById('relevant')
relevantWrapper.addEventListener("click", (event) => {
    relevantWrapper.classList.add('active')
    latestWrapper.classList.remove('active')
    wrapper.innerHTML = '' // ????
    printCard('relevant')
})

let latestWrapper = document.getElementById('latest')
latestWrapper.addEventListener("click", (event) => {
    latestWrapper.classList.add('active')
    relevantWrapper.classList.remove('active')
    wrapper.innerHTML = '' 
    printCard('latest')
})

// end anchor events

let input = document.getElementById('search-input')
input.addEventListener('keyup', (event) => {
    wrapper.innerHTML = ''
    printCard()
})





printCard()

//Login
let buttonLogin = document.querySelectorAll(".btn-login");

buttonLogin.forEach((element) => {
  element.addEventListener("click", () =>
    window.open("../views/login.html", "_self")
  );
});

const signUp = () => {
  localStorage.getItem("token")
    ? window.open("../views/home.html", "_self")
    : window.open("../index.html", "_self");
};

let signOut = document.querySelector("#btn-signOut");

signOut.addEventListener("click", () => {
  localStorage.removeItem("token");
  signUp();
});
//end-rodo


