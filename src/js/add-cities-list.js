import cityItem from '../template/cityItem.hbs';

import $ from 'jquery';
import 'slick-carousel';
import 'slick-carousel/slick/slick.css';

$('.js-input-list').slick({
    dots: true,
    infinite: true,
    autoplay: false,
    speed: 500,
    slidesToShow: 1,
    centerMode: true,
    variableWidth: true,
    nextArrow: document.querySelector('.arrow__prev'),
    prevArrow: document.querySelector('.arrow__next'),
    appendDots: false,
});

//REFS

const refs = {
    starInput: document.querySelector('.js-star'),
    citiesList: document.querySelector('.js-input-list'),
    cityInput: document.querySelector('.js-form__input'),
};

let favouriteCities = localStorage.getItem('cities')
    ? JSON.parse(localStorage.getItem('cities'))
    : [];
localStorage.setItem('cities', JSON.stringify(favouriteCities));
const parseCities = JSON.parse(localStorage.getItem('cities'));

// Listiners
refs.starInput.addEventListener('click', addToFavoriteCities);

// Render List
function renderCitiesList(cities) {
    const markup = cityItem(cities);
    return refs.citiesList.insertAdjacentHTML('beforeend', markup);
}

// Add To Favorites
function addToFavoriteCities(e) {
    const cityName = refs.cityInput.value.trim();
    if (favouriteCities.includes(cityName) || cityName === '') {
        return;
    }

    favouriteCities.push(cityName);

    localStorage.setItem('cities', JSON.stringify(favouriteCities));

    renderCitiesList(parseCities);
}

renderCitiesList(parseCities);

// Удаление из списка

refs.citiesList.addEventListener('click', onCloseIconClick);

function onCloseIconClick(event) {
    if (event.target.nodeName === 'SPAN') {
        const listItem = event.target.parentElement;
        const inputList = listItem.parentElement;
        const inputListArray = Array.from(inputList.children);
        const cityId = inputListArray.indexOf(listItem);
        const savedCities = JSON.parse(localStorage.getItem('cities'));
        savedCities.splice(cityId, 1);
        localStorage.setItem('cities', JSON.stringify(savedCities));
        listItem.remove();
        localStorage.removeItem(savedCities);
    }
}
