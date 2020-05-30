import cityItem from '../template/cityItem.hbs';
//REFS
const refs = {
    citiesList: document.querySelector('.js-input-list'),
    starInput: document.querySelector('.js-star'),
    cityInput: document.querySelector('.js-form__input'),
    prevBtn: document.querySelector('.arrow__prev'),
    nextBtn: document.querySelector('.arrow__next'),
};
let favouriteCities = localStorage.getItem('cities')
    ? JSON.parse(localStorage.getItem('cities'))
    : [];
localStorage.setItem('cities', JSON.stringify(favouriteCities));

//Listiners
// refs.starInput.addEventListener('click', addToFavoriteCities);
// refs.citiesList.addEventListener('click', onCloseIconClick);
// refs.cityInput.addEventListener('click', Active);

//Render List
function renderCitiesList(cities) {
    if (refs.citiesList.firstChild) {
        refs.citiesList.innerHTML = '';
        refs.prevBtn.classList.add('is-hidden');
        refs.nextBtn.classList.add('is-hidden');
    } else {
        refs.prevBtn.classList.remove('is-hidden');
        refs.nextBtn.classList.remove('is-hidden');
        const markup = cities.reduce((acc, city) => acc + cityItem(city), '');
        return refs.citiesList.insertAdjacentHTML('beforeend', markup);
    }
}
//isActive
function Active() {
    refs.starInput.disabled = false;
    refs.starInput.classList.remove('star--active');
}
// Add To Favorites
function addToFavoriteCities() {
    event.preventDefault();
    const cityName = refs.cityInput.value.trim();
    renderCitiesList(favouriteCities);
    refs.cityInput.value = '';
    if (favouriteCities.includes(cityName) || cityName === '') {
        refs.starInput.classList.add('star--active');
        refs.starInput.disabled = true;
        return;
    } else {
        refs.starInput.classList.add('star--active');
        favouriteCities.push(cityName);
        localStorage.setItem('cities', JSON.stringify(favouriteCities));
        renderCitiesList(favouriteCities);
    }
}
renderCitiesList(favouriteCities);

//Delete

function onCloseIconClick(event) {
    if (event.target.nodeName === 'BUTTON') {
        const listItem = event.target.parentElement;
        const inputList = listItem.parentElement;
        const inputListArray = Array.from(inputList.children);
        const cityId = inputListArray.indexOf(listItem) - 1;
        favouriteCities.splice(cityId, 1);
        localStorage.setItem('cities', JSON.stringify(favouriteCities));
        listItem.remove();
    }
}
