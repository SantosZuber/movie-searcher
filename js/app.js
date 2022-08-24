//TMBD
const API_KEY = "api_key=dbe9094ecdfc72357d6effd57c97537a";
const BASE_URL = "https://api.themoviedb.org/3";
const API_URL = BASE_URL + "/discover/movie?sort_by=popularity.desc&" + API_KEY;
const IMG_URL = "https://image.tmdb.org/t/p/w500/";
const SEARCH_URL = BASE_URL + '/search/movie?' + API_KEY;

const main = document.getElementById("main");
const form = document.getElementById("form");
const search = document.getElementById("search");

getMovies(API_URL);

function getMovies(url) {
    fetch(url).then(res => res.json()).then(data => {
        showMovies(data.results);
    });
}
function showMovies(data) {
    main.innerHTML = '';
    data.forEach(movie => {
        const { title, poster_path, vote_average, overview } = movie;

        console.log(poster_path)

        if (poster_path != null) {
            const movieEl = document.createElement('div');
            movieEl.classList.add('movie');
            movieEl.innerHTML = `<img src="${IMG_URL + poster_path}"
        alt="${title}" class="movie-img">

    <div id="movie-info" class="movie-info">
        <h3>${title}</h3>
        <span>${vote_average}</span>
    </div>

    <div class="overview">
        <h3>Overview</h3>
        ${overview}
    </div>`


            main.appendChild(movieEl);
        }
        return;
    })
}

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const searchTerm = search.value;

    if (searchTerm) {
        getMovies(SEARCH_URL + '&query=' + searchTerm);
    } else {
        getMovies(API_URL);
    }
})
