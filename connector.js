import {
    login
} from "./login.js";
import {
    register
} from "./register.js"
import {
    addMovie
} from "./addMovie.js"
import {
    showMovies
} from "./showMovies.js"


function load() {
    let userEmail=document.getElementById("userEmail");
    userEmail.style.display="none";
   
    let mainContainer = document.getElementById("mainContainer");
    mainContainer.innerHTML = "";
    
    showMovies();

    let home=document.getElementById("home");
    home.addEventListener("click", function(e){
        e.preventDefault();
        showMovies();
    })

    let loginLink = document.getElementById("loginLink");
    loginLink.addEventListener("click", function (e) {
        console.log("login link clicked")
        e.preventDefault();
        login()
    })

    let registerLink = document.getElementById("registerLink");
    registerLink.addEventListener("click", function (e) {
        console.log("register link clicked")
        e.preventDefault();
        register()
    })

    let logoutLink=document.getElementById("logoutLink");
    logoutLink.style.display="none";
    userEmail.style.display="none";
   
    logoutLink.addEventListener("click", function (e) {
        e.preventDefault();
        logout()
    })

    function logout() {
        console.log("whatis wrong with you")
        var myHeaders = new Headers();
        myHeaders.append("X-Authorization", sessionStorage.getItem("loggedUserToken"));

        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };

        fetch("http://localhost:3030/users/logout", requestOptions)
              .then(response => response.text())
            .then(result =>console.log(result) )
            .then(function () {
                    sessionStorage.clear();
                    console.log("user logged out")
                    loginLink.style.display = "block";
                    registerLink.style.display = "block";
                    logoutLink.style.display = "none";
                    let userEmail=document.getElementById("userEmail");
                    userEmail.textContent="";
                    showMovies();
                })
            .catch(error => console.log('error', error));
    }

}

load()