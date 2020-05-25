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

let oneDay = '';

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

    renderMarkup(
        fiveDaysTmpl,
        changedData.list[0].date,
        refs.daysContainer,
        'beforeend',
    );

    let days = [];
    let hours = [];

    console.log(days);
    changedData.list.map((a, e) => {
        console.log(a);
        days.push(tranformDay(e, a));
        console.log(e);
    });

    changedData.list[1].forecast.map(e => {
        hours.push(tranformHours(e));
    });

    updateDaysMarkup(days);
    updateMoreInfoMarkup(hours);
});

const tranformDay = (a, data) => {
    return {
        dayWeek: new Date(data.date * 1000).toLocaleString('en-US', {
            weekday: 'long',
        }),
        dayMonth: new Date(data.date * 1000).toLocaleString('en-US', {
            month: 'short',
            day: 'numeric',
        }),
        index: a,
    };
};

const tranformHours = data => {
    return {
        hours: new Date(data.dt * 1000).toLocaleString('en-US', {
            hour12: false,
            hour: '2-digit',
            minute: '2-digit',
        }),
        temp: Math.round(data.main.temp),
        tempMin: Math.round(data.main.temp_min),
        tempMax: Math.round(data.main.temp_max),
        humidity: data.main.humidity,
        pressure: data.main.pressure,
        wind: data.wind.speed,
        icon:
            'http://openweathermap.org/img/wn/' + data.weather[0].icon + '.png',
    };
};

function updateDaysMarkup(day) {
    const markup = fiveDaysTmpl(day);
    refs.daysContainer.insertAdjacentHTML('beforeend', markup);
}

function updateMoreInfoMarkup(forThreeHours) {
    const markup = dayMoreInfoTmpl(forThreeHours);
    refs.daysContainerMoreInfo.insertAdjacentHTML('beforeend', markup);
}

refs.daysContainer.addEventListener('click', showMoreInformation);

function showMoreInformation(e) {
    if (e.target.nodeName !== 'A') {
        return;
    }
    oneDay = Number(e.target.dataset.index);
    console.log(oneDay);
    console.log(typeof oneDay);
}
