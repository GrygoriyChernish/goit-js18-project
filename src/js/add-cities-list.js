import cityItem from '../template/cityItem.hbs';

//REFS

const refs = {
    inputList: document.querySelector('.js-input-list'),
    starInput: document.querySelector('.js-star'),
    cityInput: document.querySelector('.js-form__input'),
    inputList: document.querySelector('.input-list'),
};

let favouriteCities = localStorage.getItem('cities')
    ? JSON.parse(localStorage.getItem('cities'))
    : [];

localStorage.setItem('cities', JSON.stringify(favouriteCities));
const parseCities = JSON.parse(localStorage.getItem('cities'));

//Listiners

refs.starInput.addEventListener('click', addToFavoriteCities);
refs.starInput.addEventListener('click', event => {
    if (event.target.nodeName === 'SPAN') {
        console.log('CLICK!');
        renderCitiesList(parseCities);
    }
});

// Add To Favorites

function addToFavoriteCities(e) {
    const cityName = refs.cityInput.value.trim();

    if (favouriteCities.includes(cityName) || cityName === '') {
        return;
    }

    favouriteCities.push(cityName);
    localStorage.setItem('cities', JSON.stringify(favouriteCities));
}

//Render List

function renderCitiesList(cities) {
    const markup = cities.reduce((acc, city) => acc + cityItem(city), '');
    return refs.inputList.insertAdjacentHTML('beforeend', markup);
}

refs.inputList.addEventListener('click', onCloseIconClick);

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
    }
}
