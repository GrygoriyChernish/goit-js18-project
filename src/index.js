// Стили
import './scss/styles.scss';

// Отображение текущего времени и даты
import showCurrentData from './js/show-current-data';

// Добавление в список избранных городов
// import $ from 'jquery';
// import 'slick-carousel';
// import 'slick-carousel/slick/slick.css';
// import slickSkroll from './js/slick-skroll';
import './js/add-cities-list';

// Кнопки "Today" и "5 days"
import onBtnClick from './js/button-switch';

// Геолокация
import getCurrentPosition from './js/geolocation';
// console.log(dataGeoLocation);

// Запрос на 1 день
import './js/date-time';

// Запрос на 5 дней
import './js/5days';

// Цитаты
// $('.js-five-days').slick({
//     infinite: false,
//     slidesToShow: 3,
//     variableWidth: false,
//     mobileFirst: true,
//     nextArrow: $('.js-btn__five-days-next'),
//     prevArrow: $('.js-btn__five-days-prev'),
// });
