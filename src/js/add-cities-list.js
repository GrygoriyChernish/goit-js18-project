import cityItem from '../template/cityItem.hbs';

//REFS

const starInput = document.querySelector('.js-star');
const citiesList = document.querySelector('.js-input-list');
const cityInput = document.querySelector('.js-form__input');

let favouriteCities = localStorage.getItem('cities')
    ? JSON.parse(localStorage.getItem('cities'))
    : [];

localStorage.setItem('cities', JSON.stringify(favouriteCities));
const parseCities = JSON.parse(localStorage.getItem('cities'));

//Listiners

starInput.addEventListener('click', addToFavoriteCities);

// Add To Favorites

function addToFavoriteCities() {
    const cityName = cityInput.value.trim();

    if (favouriteCities.includes(cityName) || cityName === '') {
        return;
    }

    favouriteCities.push(cityName);
    localStorage.setItem('cities', JSON.stringify(favouriteCities));
}

//Render List

function renderCitiesList(cities) {
    const markup = cities.reduce((acc, city) => acc + cityItem(city), '');
    return citiesList.insertAdjacentHTML('beforeend', markup);
}

renderCitiesList(parseCities);
