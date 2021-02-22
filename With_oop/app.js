const githubForm=document.getElementById("github-form");
const nameInput=document.getElementById("githubname");
const clearLastUsers=document.getElementById("clear-last-users");
const lastUsers=document.getElementById("last-users");
const github=new Github() ;
const ui=new UI();
eventListeners();

function eventListeners(){
    githubForm.addEventListener("submit",getData);
    clearLastUsers.addEventListener("click",clearAllSearched);
    document.addEventListener("DOMContentLoaded",getAllSearched);
}

function getData(e){
    let username=nameInput.value.trim();
    if(username===""){
        alert("Ad daxil edin")
    }else{

        github.getGithubData(username)
        .then(response=>{
            if(response.user.message==="Not Found"){
                ui.showError("Isdifadeci Tapilmadi");
            }
            else{
                ui.addSearcUI(username);
                Storage.addSearchedUser(username);
             
                ui.showUserInfo(response.user);
                ui.showRepo(response.repo);
            }
        })
        .catch(err=>ui.showError(err));

    }
    ui.clearInput();
    e.preventDefault();
}

function clearAllSearched(){
    if(confirm("Qərarından Əminsən ?")){
        Storage.clearAllSerach();
        ui.clearAllUI();
    }
}


function getAllSearched(){
    let users=Storage.getSearch();

    let result="";

    users.forEach(user=>{

        result+=`     <li class="list-group-item">${user}</li> `

    })
    
    lastUsers.innerHTML=result

}

