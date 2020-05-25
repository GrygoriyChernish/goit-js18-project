function renderMarkup(templ, data, link, position) {
    const markup = templ(data);
    return link.insertAdjacentHTML(position, markup);
}

export default renderMarkup;
