import cityItem from '../template/cityItem.hbs';

//REFS

const refs = {
    citiesList: document.querySelector('.js-input-list'),
    starInput: document.querySelector('.js-star'),
    citiesList: document.querySelector('.js-input-list'),
    cityInput: document.querySelector('.js-form__input'),
};

let isActive = false;
let favouriteCities = localStorage.getItem('cities')
    ? JSON.parse(localStorage.getItem('cities'))
    : [];

localStorage.setItem('cities', JSON.stringify(favouriteCities));

//Listiners

refs.starInput.addEventListener('click', addToFavoriteCities);
refs.citiesList.addEventListener('click', onCloseIconClick);

//Render List
function renderCitiesList(cities) {
    const markup = cityItem(cities);
    return refs.citiesList.insertAdjacentHTML('beforeend', markup);
}


// Add To Favorites

function addToFavoriteCities() {
    const cityName = refs.cityInput.value.trim();

    renderCitiesList(parseCities);
    refs.cityInput.value = '';
    // isActive = false;
    // refs.starInput.classList.remove('star--active');
    if (favouriteCities.includes(cityName) || cityName === '') {
        return;
    } else {
        isActive = true;
        refs.starInput.classList.add('star--active');
        favouriteCities.push(cityName);
        localStorage.setItem('cities', JSON.stringify(favouriteCities));

        // renderCitiesList(parseCities);
        //resetRequest();
    }

    if (favouriteCities.includes(cityName) || cityName === '') {
        return;
    }
    favouriteCities.push(cityName);
    localStorage.setItem('cities', JSON.stringify(favouriteCities));
    renderCitiesList(favouriteCities);
    //cityName = '';

}

renderCitiesList(favouriteCities);


function renderCitiesList(cities) {
    //refs.citiesList.innerHTML = '';
    refs.starInput.classList.remove('star--active');
    const markup = cities.reduce((acc, city) => acc + cityItem(city), '');
    return refs.citiesList.insertAdjacentHTML('beforeend', markup);
}

//Reset

function resetRequest() {
    refs.cityInput.value = '';
    isActive = false;
    refs.starInput.classList.remove('star--active');
    console.log('RESET INPUT');
}

//Delete

// Удаление из списка

refs.citiesList.addEventListener('click', onCloseIconClick);


function onCloseIconClick(event) {
    if (event.target.nodeName === 'SPAN') {
        const listItem = event.target.parentElement;
        const inputList = listItem.parentElement;
        const inputListArray = Array.from(inputList.children);

        const cityId = inputListArray.indexOf(listItem);
        //const savedCities = JSON.parse(localStorage.getItem('cities'));
        parseCities.splice(cityId, 1);
        localStorage.setItem('cities', JSON.stringify(parseCities));

        const cityId = inputListArray.indexOf(listItem) - 1;
        favouriteCities.splice(cityId, 1);
        localStorage.setItem('cities', JSON.stringify(favouriteCities));
        listItem.remove();
        //resetRequest();
    }
}
