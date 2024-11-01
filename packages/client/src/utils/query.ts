export function setNewGet(key, value) {
    const currentUrl = new URL(window.location);
    // Используем URLSearchParams для управления параметрами
    const params = new URLSearchParams(currentUrl.search);

    // Добавляем или обновляем параметр
    params.set(key, value);

    // Обновляем адресную строку без перезагрузки страницы
    window.history.pushState(
        {},
        "",
        `${currentUrl.pathname}?${params.toString()}`,
    );
}

export function getQueryParam(key) {
    const params = new URLSearchParams(window.location.search);
    return params.get(key);
}

export function removeQueryParam(param) {
    const url = new URL(window.location.href);
    url.searchParams.delete(param);

    // Обновляем адресную строку без перезагрузки страницы
    window.history.replaceState(null, "", url.toString());
}

export default {};
