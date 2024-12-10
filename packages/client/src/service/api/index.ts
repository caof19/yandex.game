import axios from "axios";
import { baseConfig, yandexConfig } from "./config";

export const YandexApi = axios.create(yandexConfig);
export const BaseApi = axios.create(baseConfig);
