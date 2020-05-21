const refs = {
    btnWrap: document.querySelector('.btn__wrap'),
    citySection: document.querySelector('.city__section'),
    degree: document.querySelector('.degree'),
    wrapDateQuote: document.querySelector('.wrap'),
};

refs.btnWrap.addEventListener('click', onBtnClick);

function onBtnClick(event) {
    if (event.target.nodeName === 'BUTTON') {
        if (event.target.classList.contains('js-days')) {
            refs.degree.classList.add('is-hidden');
            refs.wrapDateQuote.classList.add('is-hidden');
            refs.citySection.classList.remove('is-hidden');
        } else {
            refs.degree.classList.remove('is-hidden');
            refs.wrapDateQuote.classList.remove('is-hidden');
            refs.citySection.classList.add('is-hidden');
        }
    }
}

export default onBtnClick;
