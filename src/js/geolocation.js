import { fetchBackgroundImage } from './apiService-bg';
import {
    updateWeatherResult,
    getRandomNumber,
    setBackgroundImage,
} from './date-time';

const options = {
    timeout: 5000,
};

function success(position) {
    const coord = position.coords;

    const latitude = coord.latitude;
    const longitude = coord.longitude;

    const apiKey =
        'pk.eyJ1IjoiYW5kcmVpY2gwOSIsImEiOiJja2Fuc2I5aWExaGFxMnNwNmNhcWRnbjVmIn0.CIj-nmzJMXKmauKYGG5Ncg';

    // Запрос на текущий город по текущим кординатам

    const queryApi = () => {
        const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${longitude},${latitude}.json?language=en&types=place&access_token=${apiKey}`;

        return fetch(url)
            .then(response => response.json())
            .then(data => data)
            .catch(err => console.warn(err));
    };

    queryApi().then(data => {
        const locationCity = data.features[0].text_en;

        // Запрос на API погоды и рендер на страницу полученых данных

        updateWeatherResult(locationCity);

        // Запрос и установка заднего фона по текущему местонахождению
        fetchBackgroundImage(locationCity)
            .then(({ hits }) => {
                setBackgroundImage(hits[getRandomNumber()].largeImageURL);
            })
            .catch(error => console.log(error));
    });
}

function error(err) {
    console.warn(`ERROR(${err.code}): ${err.message}`);
}

// Запрос на получение текущего местонахождения

navigator.geolocation.getCurrentPosition(success, error, options);
