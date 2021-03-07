import {
    saveCredentialsAndRedirect
} from "./saveCredentialsAndRedirect.js"

export function login() {
    let main = document.getElementsByTagName("main")[0];
    main.innerHTML = "";

    let loginSection = document.createElement("section");
    loginSection.id = "loginSection";
    loginSection.innerHTML = `
   <form id="loginForm" class="text-center border border-light p-5" action="" method="">
   <div class="form-group">
       <label for="email">Email</label>
       <input type="email" class="form-control" placeholder="Email" name="email" value="">
   </div>
   <div class="form-group">
       <label for="password">Password</label>
       <input type="password" class="form-control" placeholder="Password" name="password" value="">
   </div>

   <button type="submit" class="btn btn-primary">Login</button>
</form>`

    main.appendChild(loginSection);

    loginForm.addEventListener("submit", function (e) {
        e.preventDefault();
        console.log("who");
        let formData = new FormData(loginForm);
        let email = formData.get("email");
        let password = formData.get("password");

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

        fetch("http://localhost:3030/users/login", requestOptions)
            .then(response => response.json())
            .then(result => saveCredentialsAndRedirect(result, loginSection))
            .catch(error => console.log('error', error));
    })

}