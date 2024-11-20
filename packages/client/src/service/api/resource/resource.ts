import { AxiosRequestConfig } from "axios";

import { YandexApi } from "..";
import { Yandex_URL } from "../config";

// TODO: Убрать any
export function getResourceByPath(
    path: string,
    params: AxiosRequestConfig<any>,
) {
    return YandexApi.get(`${Yandex_URL}/resources/${path}`, params);
}
