const apiKey = '16340198-dc2f265d0add10e2fffcbdf49';

const options = {
    headers: {
        'Access-Control-Allow-Origin': '*',
    },
};

export function fetchBackgroundImage(inputValue) {
    return fetch(
        `https://pixabay.com/api/?image_type=photo&orientation=horizontal&q=${inputValue}&key=${apiKey}`,
        { options }
    )
        .then(res => res.json())
        .catch(error => console.log(error));
}