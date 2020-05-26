import fiveDaysTmpl from '../template/five-days.hbs';
import dayMoreInfoTmpl from '../template/five-days-more-info.hbs';
import fiveDayService from './apiServiceFiveDay';

const refs = {
    daysContainer: document.querySelector('.js-five-days'),
    moreInfoContainer: document.querySelector('.js-more-info'),
    moreInfoItem: document.querySelector('.js-more-info__item'),
    daysContainerMoreInfo: document.querySelector('.js-more-info'),
    moreInfoPrev: document.querySelector('.js-more-info-arrow__prev'),
    moreInfoNext: document.querySelector('.js-more-info-arrow__next'),
    fiveDaysBtn: document.querySelector('.js-days'),
    jsMoreInfoContainer: document.querySelector('.js-more-info__container'),
};

refs.fiveDaysBtn.addEventListener('click', getweatherFiveDay);
refs.daysContainer.addEventListener('click', setActiveTag);

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
        tempMax: Math.round(
            data.forecast.reduce((acc, value) => acc + value.main.temp_max, 0) /
                data.forecast.length,
        ),
        tempMin: Math.round(
            data.forecast.reduce((acc, value) => acc + value.main.temp_min, 0) /
                data.forecast.length,
        ),
        icon:
            'http://openweathermap.org/img/wn/' +
            data.forecast[0].weather[0].icon +
            '.png',
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
    refs.daysContainerMoreInfo.innerHTML = markup;
}

function getweatherFiveDay(event) {
    fiveDayService.days.length = 0;
    fiveDayService.hits = fiveDayService.getCurrencyCity();

    fiveDayService.hits.then(response => {
        const getDate = data => new Date(data.dt * 1000).getDate();

        const dates = response.list
            .map(element => getDate(element))
            .filter((el, idx, arr) => arr.indexOf(el) === idx);

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
        changedData.list.map((a, e) => {
            fiveDayService.days.push(tranformDay(e, a));
        });
        updateDaysMarkup(fiveDayService.days);
    });
}

function showMoreInformation() {
    fiveDayService.hours.length = 0;
    fiveDayService.hits.then(response => {
        const getDate = data => new Date(data.dt * 1000).getDate();

        const dates = response.list
            .map(element => getDate(element))
            .filter((el, idx, arr) => arr.indexOf(el) === idx);

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

        changedData.list[fiveDayService.oneDay].forecast.map(e => {
            fiveDayService.hours.push(tranformHours(e));
        });
        updateMoreInfoMarkup(fiveDayService.hours);
    });
}

function setActiveTag(e) {
    if (e.target.nodeName !== 'A') {
        return;
    }
    fiveDayService.oneDay = Number(e.target.dataset.index);
    const nextActiveTag = e.target.parentNode;
    const currentActiveTag = refs.daysContainer.querySelector(
        '.day__item--active',
    );
    if (currentActiveTag) {
        currentActiveTag.classList.remove('day__item--active');
        refs.daysContainerMoreInfo.innerHTML = '';
        showMoreInformation();
    } else {
        nextActiveTag.classList.add('day__item--active');
        refs.jsMoreInfoContainer.classList.remove('is-hidden');
        refs.daysContainerMoreInfo.innerHTML = '';
        showMoreInformation();
    }
    if (currentActiveTag === nextActiveTag) {
        removeActiveTag(currentActiveTag);
    }
}

function removeActiveTag(event) {
    if (event) {
        event.classList.remove('day__item--active');
        refs.jsMoreInfoContainer.classList.add('is-hidden');
        refs.daysContainerMoreInfo.innerHTML = '';
    }
}
