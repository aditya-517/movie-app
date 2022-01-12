const APIURL  = "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&page=1";
const IMGURL = "https://image.tmdb.org/t/p/w1280";
const SEARCHAPI = "https://api.themoviedb.org/3/search/movie?&api_key=04c35731a5ee918f014970082a0088b1&query=";

const main = document.querySelector("main");
const form = document.querySelector("form");
const search = document.getElementById("search");

// Get movies initially before search
getMovies(APIURL);


async function getMovies(url){
    const resp = await fetch(url);
    const respData = await resp.json();

    displayMovies(respData.results);
    
}

function displayMovies(movies){
    // Clear main
    main.innerHTML = "";
    movies.forEach(movie => {

        const {poster_path, title, vote_average, overview} = movie;

        const movieEl = document.createElement('div');
        movieEl.classList.add('movie');

        movieEl.innerHTML = `<img 
        src="${IMGURL + poster_path}" 
        alt="">
        <div class="movie-info">
            <h3>${title}</h3>
            <span class="${getColor(vote_average)}">${vote_average}</span>
        </div>
        <div class="overview">
        <h4>Overview :</h4>
        ${overview}</div>
        `
        ;

        main.appendChild(movieEl);
        
    });
}

form.addEventListener("submit", (e) => {
    e.preventDefault();

    const searchTerm = search.value;
    if(searchTerm){
        getMovies(SEARCHAPI + searchTerm);

        search.value = "";
    }
});
