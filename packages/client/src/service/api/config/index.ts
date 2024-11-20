import { CreateAxiosDefaults } from "axios";

export const Yandex_URL = "https://ya-praktikum.tech/api/v2";

export const yandexConfig: CreateAxiosDefaults = {
    baseURL: Yandex_URL,
    withCredentials: true,
};

export const baseConfig: CreateAxiosDefaults = {
    baseURL: "http://localhost:3001",
    withCredentials: true,
    headers: { "Content-type": "application/json" },
};
