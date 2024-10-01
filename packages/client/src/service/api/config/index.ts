import { CreateAxiosDefaults } from "axios";

export const BASE_URL = "https://ya-praktikum.tech/api/v2";

export const config: CreateAxiosDefaults = {
    baseURL: BASE_URL,
    withCredentials: true,
};
