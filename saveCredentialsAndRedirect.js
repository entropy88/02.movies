import {showMovies} from "./showMovies.js"

export function saveCredentialsAndRedirect(fulfilledRequest,section){
    console.log(fulfilledRequest)
    sessionStorage.setItem("loggedUserId", fulfilledRequest._id);
    sessionStorage.setItem("loggedUserToken", fulfilledRequest.accessToken);
    sessionStorage.setItem("userIsLogged", "true");
    let loginLink = document.getElementById("loginLink");
    loginLink.style.display = "none";
    let registerLink = document.getElementById("registerLink");
    registerLink.style.display = "none";
    let userEmail=document.getElementById("userEmail");
    userEmail.textContent="Welcome, "+fulfilledRequest.email;
    //visualise stuff back and hide login
    section.remove()
    showMovies();
}