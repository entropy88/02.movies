

export function like(movie, userId, likesCount) {

    if (!movie.likes.includes(userId)) {

        if (userId!==movie._ownerId){
            alert ("This user can\'t update the movie likes array, because it\'s not the record\'s owner, and therefore throws FORBIDDEN error")
        }
 
        movie.likes.push(userId);


        ///THIS IS NOT WORKING BECAUSE PUT REQUESTS ARE AUTHORIZED
    
        var myHeaders = new Headers();
        myHeaders.append("X-Authorization", sessionStorage.getItem("loggedUserToken"));
        myHeaders.append("Content-Type", "application/json")

        var raw = JSON.stringify(movie);

        var requestOptions = {
            method: 'PUT',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch("http://localhost:3030/data/movies/" + movie._id, requestOptions)
            .then(response => response.json())
            .then(result => function () {
                console.log(result)
                likesCount.innerHTML = `Liked ${movie.likes.length}`;
          
            })
            .catch(error => console.log('error', error));

    } 

}