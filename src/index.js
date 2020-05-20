import './scss/styles.scss';
// import currentDate from './js/current-date';
// console.log(currentDate);

import moment from 'moment';

const currentDay = moment().format('dddd').slice(0, -6);
// const currentTime = moment().format('LTS');
// console.log(moment().format('LL').split(' ')[0]);

// const time = document.querySelector('#time');
// const currentMounth = document.querySelector('#mounth');
// const currentTime = moment().format('LTS');

// const showTime = () => {
//     time.innerHTML = `${currentTime}`;
// };

// showTime();
const time = document.querySelector('#time');
const currentMounth = document.querySelector('#mounth');

const showTime = () => {
    time.innerHTML = `${moment().format('LTS')}`;
    setTimeout(showTime, 1000);
};

showTime();

const addZero = number => (parseInt(number, 10) < 10 ? '0' : '') + number;

const showMounth = () => {
    let mounth = new Date();
    let current = mounth.getMonth();

    currentMounth.textContent = `${current}`;
};

// showMounth();
