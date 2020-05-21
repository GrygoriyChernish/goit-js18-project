import $ from 'jquery';
import 'slick-carousel';
import 'slick-carousel/slick/slick.css';

export default $('.js-input-list').slick({
    dots: true,
    infinite: true,
    autoplay: true,
    speed: 300,
    slidesToShow: 1,
    centerMode: true,
    variableWidth: true,
    nextArrow: document.querySelector('.arrow__prev'),
    prevArrow: document.querySelector('.arrow__next'),
    appendDots: false,
});