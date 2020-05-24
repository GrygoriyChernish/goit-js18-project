import cityItem from '../template/cityItem.hbs';

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

//Listiners

refs.starInput.addEventListener('click', addToFavoriteCities);

//Render List
function renderCitiesList(cities) {
    const markup = cityItem(cities);
    return refs.citiesList.insertAdjacentHTML('beforeend', markup);
}

// Add To Favorites

function addToFavoriteCities() {
    const cityName = refs.cityInput.value.trim();
    if (favouriteCities.includes(cityName) || cityName === '') {
        return;
    }
    favouriteCities.push(cityName);
    localStorage.setItem('cities', JSON.stringify(favouriteCities));
    renderCitiesList(favouriteCities);
    //cityName = '';
}

renderCitiesList(favouriteCities);

// Удаление из списка

refs.citiesList.addEventListener('click', onCloseIconClick);

function onCloseIconClick(event) {
    if (event.target.nodeName === 'SPAN') {
        const listItem = event.target.parentElement;
        const inputList = listItem.parentElement;
        const inputListArray = Array.from(inputList.children);
        const cityId = inputListArray.indexOf(listItem) - 1;
        parseCities.splice(cityId, 1);
        localStorage.setItem('cities', JSON.stringify(parseCities));
        listItem.remove();
    }
}
