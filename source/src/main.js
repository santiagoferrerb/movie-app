const api  =  axios.create({
    baseURL: 'https://api.themoviedb.org/3/',
    headers:{
        'Content-Type': 'application/json;charset=utf-8',
    },
    params: {
        'api_key': API_KEY,
        'language': 'es',
    },

});

// Utils

const lazyLoader = new IntersectionObserver((entries) => {
    entries.forEach( entry => {
        // console.log(entry);
        const srcUrl = entry.target.attributes[0].value;
        // console.log(srcUrl);
        entry.isIntersecting == true ? entry.target.src = srcUrl : "";
    })
});

const scrollObserver = new IntersectionObserver(entry => {
    if(location.hash.includes('#category')){
    entry[0].isIntersecting == true && pagNum <= pagMax ? getPaginatedMoviesByCategory(location.hash.split('=')[1]): '';
    } else if (location.hash.includes('#trends')) {
        entry[0].isIntersecting == true && pagNum <= pagMax ? getPaginatedTrendingMovies(): '';
    }
})

scrollObserver.observe(fondo);

function lazySet() {
    const movieImg = document.querySelectorAll('.movie-img');
    const movieImgArr = Array.from(movieImg);

    movieImgArr.forEach(item => lazyLoader.observe(item));
};

function htmlMovieLoad(array) {
    return array.map(item =>
                `
                <div class="movie-container">
                    <img
                    data-src="https://image.tmdb.org/t/p/w300/${item.poster_path}"
                    class="movie-img"
                    alt="${item.original_title}"
                    />
                </div>
                `
            ).join('');
};

function hashMovie(containers, movies){
    containers.forEach(container => {
        container.addEventListener('click', () => location.hash = `#movie=${movies[containers.indexOf(container)].id}`)
    })
};

// API Llamados
async function getTrendingMoviesPreview() {
    const {data} = await api('trending/movie/day');
    const movies = data.results;
    // console.log(movies);

    trendingMoviesPreviewList.innerHTML = htmlMovieLoad(movies.slice(0,6));

    const movieContainers = document.querySelectorAll('.trendingPreview-movieList .movie-container');
    const movieContainersArr = Array.from(movieContainers);

    movieContainersArr.forEach(item => item.addEventListener('click', () =>
        location.hash = `#movie=${movies[movieContainersArr.indexOf(item)].id}`
    ))

    lazySet();
};

async function getMoviesGenre() {
    const {data} = await api('genre/movie/list');

    const categories = data.genres;

    const categoriesHTML = categories.map(category =>
        `
        <div class="category-container">
            <h3 id="id${category.id}" class="category-title">${category.name}</h3>
        </div>
        `
    ).join('');

    categoriesPreviewList.innerHTML = categoriesHTML;

    const categoryTitle = document.querySelectorAll('.category-container');
    const categoryTitleArr = Array.from(categoryTitle);

    categoryTitleArr.forEach(title => title.addEventListener('click',() =>
        location.hash = `#category=${categories[categoryTitleArr.indexOf(title)].id}=${categories[categoryTitleArr.indexOf(title)].name}`
    ));
};

// async function getMoviesByCategory(id) {
//     const {data} = await api('discover/movie', {
//         params : {
//             with_genres: id,
//         },
//     });

//     const movies = data.results;

//     genericSection.innerHTML = htmlMovieLoad(movies);

//     const movieContainers = document.querySelectorAll('.genericList-container .movie-container')
//     const movieContainersArr = Array.from(movieContainers);


//     hashMovie(movieContainersArr, movies);
//     lazySet();



// };

async function getPaginatedMoviesByCategory(id) {
    pagNum == 1 ? genericSection.innerHTML= '' : '';

    console.log(pagNum, id);

    const {data} = await api('discover/movie', {
        params : {
            with_genres: id,
            page : pagNum,
            }
        });

        pagNum++;

        const movies = data.results
        movies.forEach(movie => movie.poster_path === null ? movie.poster_path = '/w3rXpniqssYcppC5UwuQfP1scVB.jpg' : '');

        moviesTotal.push(...movies);
        console.log(moviesTotal);

        genericSection.innerHTML += htmlMovieLoad(movies);

        const movieContainers = document.querySelectorAll('.genericList-container .movie-container');
        const movieContainersArr = Array.from(movieContainers);

        hashMovie(movieContainersArr, moviesTotal);

        lazySet();


}

async function getMoviesBySearch(query) {
    const {data} = await api('search/movie', {
        params: {
            query: query,
        }
    })
    const movies = data.results;

    movies.forEach(movie => movie.poster_path === null ? movie.poster_path = '/w3rXpniqssYcppC5UwuQfP1scVB.jpg' : '');

    genericSection.innerHTML = htmlMovieLoad(movies);

    const movieContainers = document.querySelectorAll('.genericList-container .movie-container');
    const movieContainersArr = Array.from(movieContainers);

    hashMovie(movieContainersArr, movies);
    lazySet();

};


// async function getTrendingMovies() {
//     pagNum == 1 ? genericSection.innerHTML = '' :'';
//     const {data} = await api('trending/movie/day');
//     const movies = data.results;

//     genericSection.innerHTML += htmlMovieLoad(movies);

//     const movieContainers = document.querySelectorAll('.genericList-container .movie-container');
//     const movieContainersArr = Array.from(movieContainers);

//     hashMovie(movieContainersArr,movies);
//     lazySet();
//     console.log(pagNum);
//     pagNum > 1 ? backPaginatedTrending() : '';

// };


async function getPaginatedTrendingMovies() {

    pagNum == 1 ? genericSection.innerHTML= '' : '';

        console.log(pagNum);

        const {data} = await api('trending/movie/day', {
            params: {
                page: pagNum,
            }
        });

        pagNum++;

        const movies = data.results;

        moviesTotal.push(...movies);

        genericSection.innerHTML += htmlMovieLoad(movies);

        const movieContainers = document.querySelectorAll('.genericList-container .movie-container');
        const movieContainersArr = Array.from(movieContainers);

        hashMovie(movieContainersArr, moviesTotal);

        lazySet();
};

function backPaginatedTrending() {
    console.log('funciono');
    const movieContainers = document.querySelectorAll('.genericList-container .movie-container');
        const movieContainersArr = Array.from(movieContainers);

    hashMovie(movieContainersArr.slice((pagNum*-20)+20),moviesTotal);
    lazySet();
}

async function getMovie(id) {
    const {data : movie} = await api('movie/'+id);
    // console.log(movie);

    const imgUrl = 'https://image.tmdb.org/t/p/w500/'+movie.poster_path;

    headerSection.style.background = `
        linear-gradient(180deg, rgba(0, 0, 0, 0.35) 19.27%, rgba(0, 0, 0, 0) 29.17%),
        url(${imgUrl})
        `;

    movieDetailTitle.innerText = movie.original_title;
    movieDetailDescription.innerText = movie.overview;
    movieDetailScore.innerText = movie.vote_average.toFixed(1);

    const movieCategoryHtml = movie.genres.map(item =>
        `
        <div class="category-container">
            <h3 id="id${item.id}" class="category-title">${item.name}</h3>
        </div>
        `).join('');

    movieDetailCategoriesList.innerHTML = movieCategoryHtml;


};

async function getSimilarMovies(id) {
    const {data} = await api(`movie/${id}/recommendations`);

    // console.log(`movie/${id}/recommendations`);

    const movies = data.results;
    // console.log(movies);

    const random = Math.floor(Math.random()*movies.length);

    movies.forEach(movie => movie.poster_path === null ? movie.poster_path = '/w3rXpniqssYcppC5UwuQfP1scVB.jpg' : '');

    const relatedMoviesHtml = movies.map(movie =>
        `
        <div class="movie-container">
          <img
            src="https://image.tmdb.org/t/p/w300/${movie.poster_path}"
            class="movie-img"
            alt="Nombre de la película"
          />
        </div>
        `).slice(0,6).join('');

    relatedMoviesContainer.innerHTML = relatedMoviesHtml;

    const movieContainers = document.querySelectorAll('.relatedMovies-scrollContainer .movie-container');
    const movieContainersArr = Array.from(movieContainers);

    movieContainers.forEach(item => item.addEventListener('click', () =>
        location.hash = `#movie=${movies[movieContainersArr.indexOf(item)].id}`
    ))
};