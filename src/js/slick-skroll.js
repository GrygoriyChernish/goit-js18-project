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
