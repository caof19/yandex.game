import axios, { CreateAxiosDefaults } from "axios";

const config: CreateAxiosDefaults = {
    baseURL: `http://localhost:${__SERVER_PORT__}`,
};

export const api = axios.create(config);
