// Стили
import './scss/styles.scss';

// Отображение текущего времени и даты
import showCurrentData from './js/show-current-data';

// Добавление в список избранных городов
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
import './js/add-cities-list';

// Кнопки "Today" и "5 days"
import onBtnClick from './js/button-switch';

// Геолокация
import getCurrentPosition from './js/geolocation';

// Запрос на 1 день
import './js/date-time';

// Запрос на 5 дней
import './js/5days';
// $('.days').slick({
//     dots: true,
//     infinite: false,
//     speed: 300,
//     slidesToShow: 4,
//     slidesToScroll: 4,
//     responsive: [
//         {
//             breakpoint: 1024,
//             settings: {
//                 slidesToShow: 3,
//                 slidesToScroll: 3,
//                 infinite: true,
//                 dots: true,
//             },
//         },
//         {
//             breakpoint: 600,
//             settings: {
//                 slidesToShow: 2,
//                 slidesToScroll: 2,
//             },
//         },
//         {
//             breakpoint: 480,
//             settings: {
//                 slidesToShow: 1,
//                 slidesToScroll: 1,
//             },
//         },
//         // You can unslick at a given breakpoint now by adding:
//         // settings: "unslick"
//         // instead of a settings object
//     ],
// });
