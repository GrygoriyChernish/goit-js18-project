// const getCurrentPosition = () => {
//     const options = {
//         timeout: 5000
//     };
//     return new Promise((resolve, reject) => {
//         navigator.geolocation.getCurrentPosition(resolve, reject);
//     });
// };

// getCurrentPosition()
//     .then((location) => {
//         console.log(location);
//     })
//     .catch((error) => {
//         console.log(error);
//     });

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
        console.log(data);
    });
}

function error(err) {
    console.warn(`ERROR(${err.code}): ${err.message}`);
}

navigator.geolocation.getCurrentPosition(success, error, options);
