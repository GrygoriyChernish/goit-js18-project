function renderMarkup(templ, data, link) {
    const markup = templ(data);
    return link.insertAdjacentHTML('beforeend', markup);
}

export default renderMarkup;
