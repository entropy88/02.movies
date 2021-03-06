import {
    addMovie
} from "./addMovie.js"

import {movieDetails} from "./movieDetails.js"
export function showMovies() {
    // let mainContainer = document.getElementById("mainContainer");
    // mainContainer.style.display = "none";

    let main = document.getElementsByTagName("main")[0];
    main.innerHTML = "";
    let moviesSection = document.createElement("section");
    moviesSection.id = "moviesSection";


    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };

    fetch("http://localhost:3030/data/movies", requestOptions)
        .then(response => response.json())
        .then(result => visualiseMovies(result))
        .catch(error => console.log('error', error));


    function visualiseMovies(result) {
        let movies = Object.values(result);
        movies.forEach(m => {
            let movieDiv = document.createElement("div");
            movieDiv.className = "container";
            movieDiv.id = m._id;
            movieDiv.innerHTML = `
            <div class="card mb-4">
            <img class="card-img-top" src="${m.img}"
                alt="Card image cap" width="400">
            <div class="card-body">
                <h4 class="card-title">${m.title}</h4>
            </div>
            <div class="card-footer">
                <a href="#/details/6lOxMFSMkML09wux6sAF">
                    <button type="button" class="btn btn-info">Details</button>
                </a>
            </div>

        </div>`

        let detailsButton=movieDiv.querySelector("button");
        detailsButton.addEventListener("click", function (e){
            e.preventDefault();
            movieDetails(m);
        })
            moviesSection.appendChild(movieDiv);
          



        });
        if (sessionStorage.getItem("loggedUserToken")) {
            console.log(sessionStorage.getItem("loggedUserToken"))
            console.log("user is loged display add movie button")
            let addMovieLink = document.createElement("section");
            addMovieLink.innerHTML = `   
        <a href="#" id="addMovieLink" class="btn btn-warning ">Add Movie</a>`
            addMovieLink.addEventListener("click", function (e) {
                e.preventDefault();
                addMovie();
            })
            main.appendChild(addMovieLink)
        }

        main.appendChild(moviesSection);
    }
}