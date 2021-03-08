import {
    addMovie
} from "./addMovie.js"

import {
    movieDetails
} from "./movieDetails.js"
export function showMovies() {

    let main = document.getElementsByTagName("main")[0];
    main.innerHTML = "";

    let moviesSection = document.createElement("section");
    moviesSection.id = "moviesSection";
    moviesSection.className = "mt-3";
    let rowDiv = document.createElement("div");
    rowDiv.classList = "row d-flex d-wrap";
    let cardDeckDiv = document.createElement("div");
    cardDeckDiv.classList = "card-deck d-flex justify-content-center";
    rowDiv.appendChild(cardDeckDiv);
    moviesSection.appendChild(rowDiv);

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
            movieDiv.className = "card mb-4";
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

            let detailsButton = movieDiv.querySelector("button");
            detailsButton.addEventListener("click", function (e) {
                e.preventDefault();
                movieDetails(m);
            })
            rowDiv.appendChild(movieDiv);

        });
        //show addmovie button if user is logged
        if (sessionStorage.getItem("loggedUserToken")) {
            let addMovieLink = document.createElement("section");
            addMovieLink.innerHTML = `   
        <a href="#" id="addMovieLink" class="btn btn-warning ">Add Movie</a>`
            addMovieLink.addEventListener("click", function (e) {
                e.preventDefault();
                addMovie();
            })
            main.appendChild(addMovieLink)
        } else {
            //show big banner if user is not logged in
            let banner = document.createElement("section");
            banner.innerHTML = `          
                <div class="jumbotron jumbotron-fluid text-light" style="background-color: #343a40;">
                    <img src="https://slicksmovieblog.files.wordpress.com/2014/08/cropped-movie-banner-e1408372575210.jpg"
                        class="img-fluid" alt="Responsive image" style="width: 150%; height: 200px">
                    <h1 class="display-4">Movies</h1>
                    <p class="lead">Unlimited movies, TV shows, and more. Watch anywhere. Cancel anytime.</p>
                </div>
       `;
            main.appendChild(banner);

        }

        main.appendChild(moviesSection);
    }
}