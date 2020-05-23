import './scss/styles.scss';
// import './js/add-cities-list';
import showCurrentData from './js/show-current-data';
import onBtnClick from './js/button-switch';
import slickSkroll from './js/slick-skroll';
import './js/date-time';

// onBtnClick();

// const refs = {
//     moreInfoContainer: document.querySelector('.js-more-info'),
//     moreInfoItem: document.querySelector('.js-more-info__item'),
//     daysContainer: document.querySelector('.js-five-days'),
// };

const apiKey = '73ee7931741da6d4344aba83af577859';
function getCurrencyCity(serchQuery = 'kiev') {
    return fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${serchQuery}&appid=${apiKey}`,
    )
        .then(response => {
            if (response.ok) return response.json();
            throw new Error('Error fetching data');
        })
        .then(data)
        .catch(err => {
            console.error('Error: ', err);
        });
}

getCurrencyCity().then(response => {
    const getDate = data => new Date(data.dt * 1000).getDate();
    console.log(response.list);

    const dates = response.list
        .map(element => getDate(element))
        .filter((el, idx, arr) => arr.indexOf(el) === idx);
    // массив из 5 дней console.log(dates);

    const list = dates
        .map(el => response.list.filter(elem => getDate(elem) === el))
        .map(element => ({
            date: element[0].dt,
            forecast: element,
        }));
    const changedData = {
        ...response,
        list,
    };

    console.log(changedData.list);
    changedData.list[1].forecast.map(e => {
        console.log(e);
    });
});
