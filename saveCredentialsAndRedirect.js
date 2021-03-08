import {showMovies} from "./showMovies.js"

export function saveCredentialsAndRedirect(fulfilledRequest,section){
    let logoutLink=document.getElementById("logoutLink");

    sessionStorage.setItem("loggedUserId", fulfilledRequest._id);
    sessionStorage.setItem("loggedUserToken", fulfilledRequest.accessToken);
    let loginLink = document.getElementById("loginLink");
    loginLink.style.display = "none";
    let registerLink = document.getElementById("registerLink");
    registerLink.style.display = "none";
    let userEmail=document.getElementById("userEmail");
    userEmail.textContent="Welcome, "+fulfilledRequest.email;
    userEmail.style.display="block";
    logoutLink.style.display="block";
    //visualise stuff back and hide login
    section.remove()
    showMovies();
}