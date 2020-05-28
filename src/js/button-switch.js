const refs = {
    mainBackground: document.querySelector('.background'),
    btnWrap: document.querySelector('.btn__wrap'),
    citySection: document.querySelector('.city__section'),
    degree: document.querySelector('.js-degree'),
    wrapDateQuote: document.querySelector('.js-wrapper'),
    fiveDaysBtn: document.querySelector('.js-days'),
    todayBtn: document.querySelector('.js-today'),
    daysContainer: document.querySelector('.js-five-days'),
};

refs.btnWrap.addEventListener('click', onBtnClick);

function onBtnClick(event) {
    if (event.target.nodeName === 'BUTTON') {
        if (event.target.classList.contains('js-days')) {
            addClassList(refs.degree, 'is-hidden');
            addClassList(refs.wrapDateQuote, 'is-hidden');
            addClassList(refs.btnWrap, 'btn__wrap-fix');
            addClassList(refs.mainBackground, 'background-fix');
            removeClassList(refs.citySection, 'is-hidden');

            refs.fiveDaysBtn.disabled = true;
            refs.todayBtn.disabled = false;
        } else {
            removeClassList(refs.degree, 'is-hidden');
            removeClassList(refs.wrapDateQuote, 'is-hidden');
            removeClassList(refs.btnWrap, 'btn__wrap-fix');
            removeClassList(refs.mainBackground, 'background-fix');
            addClassList(refs.citySection, 'is-hidden');
            refs.daysContainer.innerHTML = '';

            refs.fiveDaysBtn.disabled = false;
            refs.todayBtn.disabled = true;
        }
    }
}

function addClassList(ref, style) {
    return ref.classList.add(style);
}

function removeClassList(ref, style) {
    return ref.classList.remove(style);
}

export default onBtnClick;
