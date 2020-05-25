import fiveDaysTmpl from '../template/five-days.hbs';
import renderMarkup from './components/render-markup';
import dayMoreInfoTmpl from '../template/five-days-more-info.hbs';
// import slickSkrollMoreinfo from './slick-skrol-more-info';

const refs = {
    daysContainer: document.querySelector('.js-five-days'),
    moreInfoContainer: document.querySelector('.js-more-info'),
    moreInfoItem: document.querySelector('.js-more-info__item'),
    daysContainerMoreInfo: document.querySelector('.js-more-info'),
    moreInfoPrev: document.querySelector('.js-more-info-arrow__prev'),
    moreInfoNext: document.querySelector('.js-more-info-arrow__next'),
};

const apiKey = '73ee7931741da6d4344aba83af577859';

function getCurrencyCity(serchQuery = 'kiev') {
    return fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${serchQuery}&units=metric&appid=${apiKey}`,
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
    // console.log(response.list);
    const dates = response.list
        .map(element => getDate(element))
        .filter((el, idx, arr) => arr.indexOf(el) === idx);
    // массив из 5 дней
    // console.log(dates);
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

    renderMarkup(fiveDaysTmpl, changedData.list[0].date, refs.daysContainer);

    let days = [];
    let hours = [];
    let tempMax = [];

    changedData.list.map(e => {
        console.log(e);
        days.push(tranformDay(e));
    });

    changedData.list[1].forecast.map(e => {
        tempMax.push(e.main.temp_max);
        console.log(e.main.temp_max);
        hours.push(tranformHours(e));
    });

    renderMarkup(fiveDaysTmpl, days, refs.daysContainer);
    renderMarkup(dayMoreInfoTmpl, hours, refs.daysContainerMoreInfo);
});

const tranformDay = data => {
    return {
        dayWeek: new Date(data.date * 1000).toLocaleString('en-US', {
            weekday: 'long',
        }),
        dayMonth: new Date(data.date * 1000).toLocaleString('en-US', {
            month: 'short',
            day: 'numeric',
        }),
    };
};

const tranformHours = data => {
    return {
        // sunrise: timeConversion((data.sys.sunrise + data.timezone) * 1000),
        // sunset: timeConversion((data.sys.sunset + data.timezone) * 1000),
        // country: data.sys.country,
        // name: data.name,
        dayWeek: new Date(data.dt * 1000).toLocaleString('en-US', {
            weekday: 'long',
        }),
        dayMonth: new Date(data.dt * 1000).toLocaleString('en-US', {
            month: 'short',
            day: 'numeric',
        }),
        hours: new Date(data.dt * 1000).toLocaleString('en-US', {
            hour12: false,
            hour: '2-digit',
            minute: '2-digit',
        }),
        temp: Math.round(data.main.temp),
        tempMin: Math.round(data.main.temp_min),
        tempMax: Math.round(data.main.temp_max),
        tempAverage: average(Array(data.main.temp_max, data.main.temp_min)),
        humidity: data.main.humidity,
        pressure: data.main.pressure,
        wind: data.wind.speed,
        icon:
            'http://openweathermap.org/img/wn/' + data.weather[0].icon + '.png',
    };

    console.log(tranformHours.tempAverage);
};

console.log(tranformHours.tempAverage);

function average(nums) {
    return nums.reduce((a, b) => a + b) / nums.length;
}
