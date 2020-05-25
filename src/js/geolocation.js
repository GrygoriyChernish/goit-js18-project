import { fetchBackgroundImage } from './apiService-bg';
import { getRandomNumber, setBackgroundImage, clearHtml, createHtml, tranformData } from './date-time';

const options = {
    timeout: 5000
};

function success(position) {
    const coord = position.coords;

    const latitude = coord.latitude;
    const longitude = coord.longitude;

    const apiKey = '73ee7931741da6d4344aba83af577859';

    const queryApi = () => {
        const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}`;

        return fetch(url).then((response) => response.json()).then((data) => data).catch((err) => console.warn(err));
    };

    queryApi().then((data) => {
        function updateWeatherResult() {
            clearHtml();
            queryApi()
                .then((data) => {
                    const days = tranformData(data);
                    createHtml(days);
                })
                .catch((err) => {
                    console.error('Error: ', err);
                    alert(`По запросу "${appState.currentCity}" найдено 0 местоположений`);
                });
        }

        tranformData(data);

        clearHtml();

        getRandomNumber();

        fetchBackgroundImage(data.weather[0].main)
            .then(({ hits }) => {
                setBackgroundImage(hits[getRandomNumber()].largeImageURL);
            })
            .catch((error) => console.log(error));
        updateWeatherResult();
    });
}

function error(err) {
    console.warn(`ERROR(${err.code}): ${err.message}`);
}

navigator.geolocation.getCurrentPosition(success, error, options);
