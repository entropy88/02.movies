import { showMovies } from "./showMovies.js"
export function editMovie(movie) {

    let main = document.getElementsByTagName("main")[0];
    main.innerHTML = "";

    let addMovieSection = document.createElement("section");
    addMovieSection.innerHTML = `
  
    <form id="addMovieForm" class="text-center border border-light p-5" action="#" method="">
        <h1>Edit Movie</h1>
        <div class="form-group">
            <label for="title">Movie Title</label>
            <input type="text" value=${movie.title} class="form-control" placeholder="Title" name="title" value="">
        </div>
        <div class="form-group">
            <label for="description">Movie Description</label>
            <textarea class="form-control"  placeholder="Description" name="description">${movie.description}</textarea>
        </div>
        <div class="form-group">
            <label for="imageUrl">Image url</label>
            <input type="text" value=${movie.img} class="form-control" placeholder="Image Url" name="imageUrl" value="">
        </div>
        <button id="addMovieButton" type="submit" class="btn btn-primary">Submit</button>
    </form>
`

    main.appendChild(addMovieSection);

    let addMovieForm = document.getElementById("addMovieForm");
    addMovieForm.addEventListener("submit", function (e) {
        e.preventDefault();
        let formData = new FormData(addMovieForm);
        submitMovieAndRedirect(formData)
    })

    function submitMovieAndRedirect(formData) {
        let title = formData.get("title");
        let description = formData.get("description");
        let imageUrl = formData.get("imageUrl");
        let createdBy = sessionStorage.getItem("loggedUserId");
        if (title.length == 0 || description.length == 0 || imageUrl == 0) {
            return alert("All fields are required!")
        }
        let movieObj = { title, description, img: imageUrl, createdBy }


        var myHeaders = new Headers();
        myHeaders.append("X-Authorization", sessionStorage.getItem("loggedUserToken"));
        myHeaders.append("Content-Type", "application/json")

        var raw = JSON.stringify(movieObj);

        var requestOptions = {
            method: 'PUT',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch("http://localhost:3030/data/movies/" + movie._id, requestOptions)
            .then(response => response.json())
            .then(result => showMovies())
            .catch(error => console.log('error', error));
    }

}