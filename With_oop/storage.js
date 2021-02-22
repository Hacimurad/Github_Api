class Storage{

    static getSearch(){
        //

        let users;

        if(localStorage.getItem("searched")===null){
            users=[]
        }
        else{
            users=JSON.parse(localStorage.getItem("searched"))
        }

        return users;


    }

    static addSearchedUser(username){

        let users=this.getSearch()
        
        if(users.indexOf(username)=== -1){

            users.push(username)

        }

        localStorage.setItem("searched",JSON.stringify(users))


    }

    static clearAllSerach(){

        localStorage.removeItem("searched")

    }

}