import {
    showMovies
} from "./showMovies.js";

import { like } from "./likeMovie.js"

import { editMovie } from "./editMovieModule.js"

export function movieDetails(m) {

    //add empty likes array to default movies created without the likes property
    if (!m.hasOwnProperty("likes")){
        m.likes=[];
    }

let loggedUserId=sessionStorage.getItem("loggedUserId")    

    let main = document.getElementsByTagName("main")[0];
    main.innerHTML = "";

    let detailMovieContainer = document.createElement("div");
    detailMovieContainer.id = m._id;
    detailMovieContainer.className = "container";
    detailMovieContainer.innerHTML = `
    
                    <div class="row bg-light text-dark">
                        <h1>Movie title: ${m.title}</h1>

                        <div class="col-md-8">
                            <img class="img-thumbnail"
                                src="${m.img}">
                        </div>
                        <div class="col-md-4 text-center">
                            <h3 class="my-3 ">Movie Description</h3>
                            <p>${m.description}</p>
                            <a class="btn btn-danger" href="#">Delete</a>
                            <a class="btn btn-warning" href="#">Edit</a>
                            <a class="btn btn-primary" href="#">Like</a>
                            <span id="likesCount" class="enrolled-span">Liked ${m.likes.length}</span>
                        </div>
                    </div>
                `
    main.appendChild(detailMovieContainer);

    //edit movie logic
    let editBtn = detailMovieContainer.querySelector(".btn-warning");
    if (m._ownerId !== loggedUserId) {
        editBtn.remove();
    } else {
        editBtn.addEventListener("click", function (e) {
            e.preventDefault();
            editMovie(m)
        })
    }

    //like movie
    let likesCount = detailMovieContainer.querySelector("#likesCount");
    let likeBtn = detailMovieContainer.querySelector(".btn-primary");
    if (loggedUserId==null){
        likeBtn.remove()
    }
    if (m.likes.includes(loggedUserId)) {
        likeBtn.disabled = true;
 
    } else {
        likeBtn.disabled = false;
        likeBtn.addEventListener("click", function (e) {
            e.preventDefault();
            like(m, loggedUserId, likesCount, likeBtn)
        })
    }


    //delete movie logic
    let deleteBtn = detailMovieContainer.querySelector(".btn-danger");
    if (m._ownerId == loggedUserId) {

        deleteBtn.addEventListener("click", function (e) {
            e.preventDefault();
             let del= confirm("Are you sure?");
            if (del){
                deleteMovie(detailMovieContainer.id, sessionStorage.getItem("loggedUserToken"));
            }           
        })

    } else {
        deleteBtn.remove();
    }

    function deleteMovie(movieId, creator) {
        var myHeaders = new Headers();
        myHeaders.append("X-Authorization", creator);

        var requestOptions = {
            method: 'DELETE',
            headers: myHeaders,
            redirect: 'follow'
        };

        fetch(`http://localhost:3030/data/movies/${movieId}`, requestOptions)
            .then(response => response.json())
            .then(result => showMovies())
            .catch(error => console.log('error', error));
    }

    main.appendChild(detailMovieContainer)
}