trendingBtn.addEventListener('click', () => location.hash = '#trends');
// searchFormBtn.addEventListener('click', () => {
//     location.hash = '#search='+searchFormInput.value.toLowerCase();
// });
searchFormInput.addEventListener('keyup', () => location.hash ='#search='+searchFormInput.value.toLowerCase());
arrowBtn.addEventListener('click', () => location.hash = '#home');

window.addEventListener('DOMContentLoaded', navigator, false);
window.addEventListener('hashchange', navigator, false);

function navigator() {
    window.scroll(0,0);
    // document.documentElement.scrollTop = 0;
    // document.body.scrollTop = 0;

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
}

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

    getTrendingMoviesPreview();
    getMoviesGenre();
}

function trendsPage(){

    getTrendingMovies();

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

    headerCategoryTitle.innerText = '🔥 Tendencias';



}

function searchPage(){

    getMoviesBySearch(decodeURI(location.hash.split('=')[1]));

    headerCategoryTitle.innerText = decodeURI(location.hash.split('=')[1]);

    headerSection.classList.remove('header-container--long');
    headerSection.style.background = '';
    arrowBtn.classList.remove('inactive');
    arrowBtn.classList.remove('header-arrow--white');
    headerTitle.classList.add('inactive');
    headerCategoryTitle.classList.remove('inactive');
    searchForm.classList.remove('inactive');

    trendingPreviewSection.classList.add('inactive');
    categoriesPreviewSection.classList.add('inactive');
    genericSection.classList.remove('inactive');
    movieDetailSection.classList.add('inactive');

}

function moviePage(){

    getMovie(location.hash.split('=')[1]);

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

}

function categoryPage(){

    getMoviesByCategory(location.hash.split('=')[1]);

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

}