// import cityItem from '../template/cityItem.hbs';
// // import slickSkroll from './slick-skroll';

// //REFS

// const refs = {
//     starInput: document.querySelector('.js-star'),
//     citiesList: document.querySelector('.js-input-list'),
//     cityInput: document.querySelector('.js-form__input'),
// };

// console.log(refs.starInput);
// console.log(refs.citiesList);
// console.log(refs.cityInput);

// // let favouriteCities = localStorage.getItem('cities')
// //     ? JSON.parse(localStorage.getItem('cities'))
// //     : [];
// // localStorage.setItem('cities', JSON.stringify(favouriteCities));
// // const parseCities = JSON.parse(localStorage.getItem('cities'));

// let favouriteCities = [];

// // //Listiners
// // refs.starInput.addEventListener('click', addToFavoriteCities);
// refs.starInput.addEventListener('click', e => {
//     console.log(e.target);

//     refs.starInput.style.backgroundColor = 'red';

//     const cityName = refs.cityInput.value.trim();

//     if (!favouriteCities) {
//         return;
//     }

//     favouriteCities.push(cityName);
//     renderCitiesList(favouriteCities);
//     refs.cityInput.value = '';

//     // localStorage.setItem('cities', JSON.stringify(favouriteCities));
// });

// // //Render List
// function renderCitiesList(cities) {
//     const markup = cityItem(cities);
//     return refs.citiesList.insertAdjacentHTML('beforeend', markup);
// }

// // // Add To Favorites
// // function addToFavoriteCities(e) {
// //     const cityName = refs.cityInput.value.trim();
// //     if (favouriteCities.includes(cityName) || cityName === '') {
// //         return;
// //     }
// //     favouriteCities.push(cityName);
// //     localStorage.setItem('cities', JSON.stringify(favouriteCities));
// //     renderCitiesList(parseCities);
// //     //cityName = '';
// // }

// // renderCitiesList(parseCities);
