import { AxiosRequestConfig } from "axios";

import { API } from "..";
import { BASE_URL } from "../config";

// TODO: Убрать any
export function getResourceByPath(
    path: string,
    params: AxiosRequestConfig<any>,
) {
    return API.get(`${BASE_URL}/resources/${path}`, params);
}
