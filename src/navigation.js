let pagNum = 1;
let infiniteScroll;
let moviesTotal = [];
let pagMax=3;

trendingBtn.addEventListener('click', () => location.hash = '#trends');

// searchFormBtn.addEventListener('click', () => {
//     location.hash = '#search='+searchFormInput.value.toLowerCase();
// });

searchFormInput.addEventListener('keyup', () => location.hash ='#search='+searchFormInput.value.toLowerCase());
arrowBtn.addEventListener('click', () => location.hash.includes('search')?location.hash='#home':history.back());

logo.addEventListener('click', () => location.hash = '#home');


window.addEventListener('DOMContentLoaded', navigation, false);
window.addEventListener('hashchange', navigation, false);

function navigation() {

    window.scroll(0,0);

    if(location.hash.startsWith('#trends')) {
        trendsPage();

    } else if (location.hash.startsWith('#search=')) {
        searchPage();

    } else if (location.hash.startsWith('#movie=')) {
        moviePage();

    } else if (location.hash.startsWith('#category=')) {
        categoryPage();

    } else {
        homePage();

    }

};

function homePage(){
    searchFormInput.value = '';

    headerSection.classList.remove('header-container--long');
    headerSection.style.background = '';
    arrowBtn.classList.add('inactive');
    arrowBtn.classList.remove('header-arrow--white');
    headerTitle.classList.remove('inactive');
    headerCategoryTitle.classList.add('inactive');
    searchForm.classList.remove('inactive');

    trendingPreviewSection.classList.remove('inactive');
    categoriesPreviewSection.classList.remove('inactive');
    genericSection.classList.add('inactive');
    movieDetailSection.classList.add('inactive');
    fondo.classList.add('inactive');

    mensajeFondo.classList.add('inactive');

    genericSection.innerHTML='';
    pagNum=1;

    getTrendingMoviesPreview();
    getMoviesGenre();
    moviesTotal=[];

    likeSection.classList.remove('inactive');

    getLikedMovies();
};

function trendsPage(){

    headerSection.classList.remove('header-container--long');
    headerSection.style.background = '';
    arrowBtn.classList.remove('inactive');
    arrowBtn.classList.remove('header-arrow--white');
    headerTitle.classList.add('inactive');
    headerCategoryTitle.classList.remove('inactive');
    searchForm.classList.add('inactive');

    trendingPreviewSection.classList.add('inactive');
    categoriesPreviewSection.classList.add('inactive');
    genericSection.classList.remove('inactive');
    movieDetailSection.classList.add('inactive');

    fondo.classList.remove('inactive');

    mensajeFondo.classList.remove('inactive');

    headerCategoryTitle.innerText = '🔥 Tendencias';

    likeSection.classList.add('inactive');

};

function searchPage(){

    getMoviesBySearch(decodeURI(location.hash.split('=')[1]));

    headerCategoryTitle.innerText = decodeURI(location.hash.split('=')[1]);

    headerSection.classList.remove('header-container--long');
    headerSection.style.background = '';
    arrowBtn.classList.remove('inactive');
    arrowBtn.classList.remove('header-arrow--white');
    headerTitle.classList.add('inactive');
    headerCategoryTitle.classList.add('inactive');
    searchForm.classList.remove('inactive');

    trendingPreviewSection.classList.add('inactive');
    categoriesPreviewSection.classList.add('inactive');
    genericSection.classList.remove('inactive');
    movieDetailSection.classList.add('inactive');

    likeSection.classList.add('inactive');



};

function moviePage(){

    getMovie(location.hash.split('=')[1]);
    getSimilarMovies(location.hash.split('=')[1]);

    headerSection.classList.add('header-container--long');
    headerSection.style.background = '';
    arrowBtn.classList.remove('inactive');
    arrowBtn.classList.add('header-arrow--white');
    headerTitle.classList.add('inactive');
    headerCategoryTitle.classList.add('inactive');
    searchForm.classList.add('inactive');

    trendingPreviewSection.classList.add('inactive');
    categoriesPreviewSection.classList.add('inactive');
    genericSection.classList.add('inactive');
    movieDetailSection.classList.remove('inactive');
    fondo.classList.add('inactive');

    mensajeFondo.classList.remove('inactive');

    likeSection.classList.add('inactive');



};

function categoryPage(){

    // getPaginatedMoviesByCategory(location.hash.split('=')[1]);

    headerCategoryTitle.innerText = decodeURI(location.hash.split('=')[2]);

    headerSection.classList.remove('header-container--long');
    headerSection.style.background = '';
    arrowBtn.classList.remove('inactive');
    arrowBtn.classList.remove('header-arrow--white');
    headerTitle.classList.add('inactive');
    headerCategoryTitle.classList.remove('inactive');
    searchForm.classList.add('inactive');

    trendingPreviewSection.classList.add('inactive');
    categoriesPreviewSection.classList.add('inactive');
    genericSection.classList.remove('inactive');
    movieDetailSection.classList.add('inactive');
    fondo.classList.remove('inactive');

    mensajeFondo.classList.remove('inactive');

    likeSection.classList.add('inactive');

};