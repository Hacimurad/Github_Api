const githubForm=document.getElementById("github-form");
const nameInput=document.getElementById("githubname");
const clearLastUsers=document.getElementById("clear-last-users");
const lastUsers=document.getElementById("last-users");

const profileDiv=document.getElementById("profile");
const repoDiv=document.getElementById("repos");
const carBody=document.querySelector(".card-body");

//Events<=============
eventListeners();
function eventListeners(){
    githubForm.addEventListener("submit",getData);
    clearLastUsers.addEventListener("click",clearAllSearched);
    document.addEventListener("DOMContentLoaded",getAllSearched);
}

//Functions<==============



//Get Data in Fetch---------------

function getData(e){
    let username= nameInput.value.trim();
    if(username===""){
        alert("Ad daxil edin")
    }else{

        GetDataFetch(username)
        .then(response=>{
            if(response.user.message==="Not Found"){
                showAlert("Ad duzgun deyil")
            }
            else{
                
                showStorageUI(username);
                addStorageData(username);
                showUserInfo(response.user);
                showRepo(response.repo);
               
            }
            
        })
        .catch(err=>showAlert(err));

    }

    nameInput.value="";
    e.preventDefault();
}


async function GetDataFetch(username){
    const fetchLink= await "https://api.github.com/users/";

    const responseUser= await fetch(fetchLink+username);
    const responseRepo=await fetch(fetchLink+username+"/repos");

    const resUser=await responseUser.json();
    const resRepo=await responseRepo.json();

    nameInput.value="";

    return{
        user:resUser,
        repo:resRepo,
        
    }

}



//Clear All search in UI
function clearAllSearched(){
    if(confirm("Really?")){
        clearStorage();
        clearAllUI();
    }
}

//Get All Searched
function getAllSearched(){
    
}

//<===========UI========>



function showUserInfo(user){
   profileDiv.innerHTML=`
    <div class="card card-body mb-3">
               <div class="row">
                 <div class="col-md-4">
                   <a href="${user.html_url}" target = "_blank">
                    <img class="img-fluid mb-2" src="${user.avatar_url}"> </a>
                    <hr>
                    <div id="fullName"><strong>${user.name}</strong></div>
                    <hr>
                    <div id="bio">${user.bio}</div>
                   </div>
                 <div class="col-md-8">
                       <button class="btn btn-secondary">
                             Takipçi  <span class="badge badge-light">${user.followers}</span>
                       </button>
                       <button class="btn btn-info">
                            Takip Edilen  <span class="badge badge-light">${user.following}</span>
                         </button>
                       <button class="btn btn-danger">
                           Repolar  <span class="badge badge-light">${user.public_repos}</span>
                       </button>
                       <hr>
                       <li class="list-group">
                           <li class="list-group-item borderzero">
                               <img src="images/company.png" width="30px"> <span id="company">${user.company}</span>
                               
                           </li>
                           <li class="list-group-item borderzero">
                               <img src="images/location.png" width="30px"> <span id = "location">${user.location}</a>
                               
                           </li>
                           <li class="list-group-item borderzero">
                               <img src="images/mail.png" width="30px"> <span id="mail">${user.mail}</span>
                               
                           </li>
                           
                       </div>
                          
                       
                 </div>
           </div>
    
    `
}

function showAlert(message){
    const div=document.createElement("div");
    div.className="alert alert-danger";
    div.textContent=message;
    carBody.appendChild(div);

    setTimeout(()=>{
        div.remove();
    },3000)
}

function clearAllUI(){

    while(lastUsers.firstElementChild !==null){
        lastUsers.removeChild(lastUsers.firstElementChild);
    }
}
//================View Repo UI===========

function showRepo(repos){
    repoDiv.innerHTML="";

    repos.forEach(repo=>{

       repoDiv.innerHTML +=`
       
       <div class="mb-2 card-body">
               <div class="row">
                   <div class="col-md-2">
                   <a href="${repo.html_url}" target = "_blank" id = "repoName">${repo.name}</a>
                   </div>
                   <div class="col-md-6">
                       <button class="btn btn-secondary">
                           Starlar  <span class="badge badge-light" id="repoStar">${repo.stargazers_count}</span>
                       </button>

                       <button class="btn btn-info">
                           Forklar  <span class="badge badge-light" id ="repoFork">${repo.forks_count}</span>
                       </button>
               
                   </div>
           </div>

           </div>
       
       `

    });

}


////<========== View Storage Js UI============>

function showStorageUI(username){
    let users = getStorageData();
    if(users.indexOf(username)=== -1){

        let liDiv=document.createElement("li");
        liDiv.className="list-group-item";
        liDiv.textContent=username;
        lastUsers.appendChild(liDiv);
     }
}


function clearStorage(){
    localStorage.removeItem("searched");
}



//<==========Storage Js============>
function getStorageData(){
    let users;

    if(localStorage.getItem("searched")===null){
        users=[]
    }
    else{

        users=JSON.parse(localStorage.getItem("searched"));
    }

    return users;

}


function addStorageData(username){
    let users=getStorageData();
    if(users.indexOf(username)=== -1){
        users.push(username)
    }

    localStorage.setItem("searched",JSON.stringify(users));

}