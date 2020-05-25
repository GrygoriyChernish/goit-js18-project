import date from '../template/date-one-day.hbs';
import degree from '../template/degree.hbs';
import fiveDaysHeadingTmpl from '../template/heading-5days.hbs';
import quote from '../template/blockquote.hbs';
import { fetchBackgroundImage } from './apiService-bg';
import blockquotes from './blockquote';
import renderMarkup from './components/render-markup';

const apiKey = '73ee7931741da6d4344aba83af577859';

const refs = {
    oneDayBtn: document.querySelector('.js-today'),
    oneDayData: document.querySelector('.js-sun'),
    oneDayDegree: document.querySelector('.js-degree'),
    searchForm: document.querySelector('.form'),
    background: document.querySelector('.background'),
    fiveDaysBtn: document.querySelector('.js-days'),
    fiveDayHeading: document.querySelector('.js-heading'),
    quoteChange: document.querySelector('.quote'),
};

const defaultCity = 'kiev';

// Сохранение текущего города, который ввели в поле поиска или по умолчанию

const appState = {
    currentCity: defaultCity,
};

// Запрос данных API

function fetchData(geoSearch = defaultCity) {
    return fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${geoSearch}&appid=${apiKey}`,
    ).then(response => {
        if (response.ok) return response.json();
        throw new Error('Error fetching data');
    });
}

function updateWeatherResult(params) {
    clearHtml();
    fetchData(params)
        .then(data => {
            const days = tranformData(data);
            createHtml(days);
        })
        .catch(err => {
            console.error('Error: ', err);
            alert(
                `По запросу "${appState.currentCity}" найдено 0 местоположений`,
            );
        });
}

// Конвертация времени

function timeConversion(duration) {
    let minutes = Math.floor((duration / (1000 * 60)) % 60);
    let hours = Math.floor((duration / (1000 * 60 * 60)) % 24);

    hours = hours < 10 ? '0' + hours : hours;
    minutes = minutes < 10 ? '0' + minutes : minutes;

    return hours + ':' + minutes;
}

// Преобразование данных

const tranformData = data => {
    return {
        sunrise: timeConversion((data.sys.sunrise + data.timezone) * 1000),
        sunset: timeConversion((data.sys.sunset + data.timezone) * 1000),
        country: data.sys.country,
        name: data.name,
        temp: Math.round(data.main.temp - 273.15),
        tempMin: Math.round(data.main.temp_min - 273.15),
        tempMax: Math.round(data.main.temp_max - 273.15),
        icon:
            'http://openweathermap.org/img/wn/' + data.weather[0].icon + '.png',
    };
};

// Создание разметки и очистка

function createHtml(days) {
    renderMarkup(degree, days, refs.oneDayDegree, 'beforeend');

    renderMarkup(date, days, refs.oneDayData, 'beforeend');

    renderMarkup(fiveDaysHeadingTmpl, days, refs.fiveDayHeading, 'beforeend');

    renderMarkup(
        quote,
        blockquotes[getRandomNumber()],
        refs.quoteChange,
        'beforeend',
    );
}

function clearHtml() {
    refs.oneDayDegree.innerHTML = '';
    refs.oneDayData.innerHTML = '';
    refs.fiveDayHeading.innerHTML = '';
    refs.quoteChange.innerHTML = '';
}

// Добавляем стили на бекграунд с картинкой из запроса

function setBackgroundImage(imageSrc) {
    const css = `
        linear-gradient(
            0deg,
            rgba(0, 0, 0, 0.65) 0%,
            rgba(0, 0, 0, 0.05) 100%
        ),
        url(${imageSrc})
    `;

    refs.background.style.backgroundImage = css;
}

// Генерируем случайное число для выбора картинки

const getRandomNumber = () => Math.floor(Math.random() * 20);

// Запрос к серверу по сабмиту

refs.searchForm.addEventListener('submit', event => {
    event.preventDefault();

    const form = event.target;
    const searchQuery = form.elements.query.value;
    appState.currentCity = form.elements.query.value;

    updateWeatherResult(searchQuery);

    // Установка картинки с API

    fetchBackgroundImage(searchQuery)
        .then(({ hits }) => {
            setBackgroundImage(hits[getRandomNumber()].largeImageURL);
        })
        .catch(error => console.log(error));
});

console.log(appState);

// Запрос к серверу по клику на кнопку "TODAY"

refs.oneDayBtn.addEventListener('click', e => {
    e.preventDefault();

    const city = appState.currentCity;
    updateWeatherResult(city);
});

// Запрос к серверу по клику на кнопку "5 дней"

refs.fiveDaysBtn.addEventListener('click', () => {
    console.log('Click!');
    // const city = appState.currentCity;
    // updateWeatherResult(city);
});

// Default call

updateWeatherResult();

export { updateWeatherResult };
