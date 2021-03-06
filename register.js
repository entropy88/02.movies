
import {saveCredentialsAndRedirect} from "./saveCredentialsAndRedirect.js"
export function register() {
    console.log("hello?")

    let main = document.getElementsByTagName("main")[0];
    main.innerHTML = "";

    let registerSection = document.createElement("section");
    registerSection.id = "registerSection";
    registerSection.innerHTML = `
   <form id="registerForm" class="text-center border border-light p-5" action="#" method="post">
   <div class="form-group">
       <label for="email">Email</label>
       <input type="email" class="form-control" placeholder="Email" name="email" value="">
   </div>
   <div class="form-group">
       <label for="password">Password</label>
       <input type="password" class="form-control" placeholder="Password" name="password" value="">
   </div>

   <div class="form-group">
       <label for="repeatPassword">Repeat Password</label>
       <input type="password" class="form-control" placeholder="Repeat-Password" name="repeatPassword"
           value="">
   </div>

   <button type="submit" class="btn btn-primary">Register</button>
</form>`

    main.appendChild(registerSection);

    registerForm.addEventListener("submit", function (e) {
        e.preventDefault();

        let formData = new FormData(registerForm);
        let email = formData.get("email");
        let password = formData.get("password");
        let repeatPassword = formData.get("repeatPassword");
        if (password !== repeatPassword) {
            return alert("passwords do not match")
        }

        let requestBody = {
            email,
            password
        }
        console.log(requestBody)
        let b = JSON.stringify(requestBody)

        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: b,
            redirect: 'follow'
        };

        fetch("http://localhost:3030/users/register", requestOptions)
            .then(response => response.json())
            .then(result => saveCredentialsAndRedirect(result,registerSection))
            .catch(error => console.log('error', error));
    })

    // function saveCredentialsAndRedirect(result) {
    //     console.log(result)
    //     sessionStorage.setItem("loggedUserId", result._id);
    //     sessionStorage.setItem("loggedUserToken", result.accessToken);
    //     sessionStorage.setItem("userIsLogged", "true");
    //     let loginLink = document.getElementById("loginLink");
    //     loginLink.style.display = "none";
    //     let registerLink = document.getElementById("registerLink");
    //     registerLink.style.display = "none";
    //     //visualise stuff back and hide login
    //     registerSection.remove()
    //     showMovies();

    // }

}