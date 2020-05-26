const apiKey = '73ee7931741da6d4344aba83af577859';
export default {
    searchQuery: '',
    getCurrencyCity() {
        return fetch(
            `https://api.openweathermap.org/data/2.5/forecast?q=${this.query}&units=metric&appid=${apiKey}`,
        )
            .then(response => {
                if (response.ok) return response.json();
                throw new Error('Error fetching data');
            })
            .catch(err => {
                console.error('Error: ', err);
            });
    },
    hits: '',
    oneDay: 0,
    hours: [],
    days: [],
    get query() {
        return this.searchQuery;
    },

    set query(value) {
        this.searchQuery = value;
    },
};
