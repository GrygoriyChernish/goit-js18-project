import './scss/styles.scss';
import './js/add-cities-list';
import showCurrentData from './js/show-current-data';
import onBtnClick from './js/button-switch';
import slickSkroll from './js/slick-skroll';
import getCurrentPosition from './js/geolocation';
console.log(dataGeoLocation);

onBtnClick();
import $ from 'jquery';
import 'slick-carousel';
import 'slick-carousel/slick/slick.css';

const refs = {
    moreInfoContainer: document.querySelector('.js-more-info'),
    moreInfoItem: document.querySelector('.js-more-info__item'),
    daysContainer: document.querySelector('.js-five-days')
};

$('.js-input-list').slick({
    dots: true,
    infinite: true,
    autoplay: true,
    speed: 300,
    slidesToShow: 1,
    centerMode: true,
    variableWidth: true,
    nextArrow: document.querySelector('.arrow__prev'),
    prevArrow: document.querySelector('.arrow__next'),
    appendDots: false
});
