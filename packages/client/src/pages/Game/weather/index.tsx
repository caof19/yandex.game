import React from "react";
import axios from "axios";
import { NotificationInstance } from "antd/es/notification/interface";

type Weather = {
    current: {
        temperature_2m: string;
    };
    current_units: {
        temperature_2m: string;
    };
};

export const getWeather = (instance: NotificationInstance) => {
    const success = async (position: GeolocationPosition) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        const { data }: { data: Weather } = await axios.get(
            `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m`,
        );
        instance.info({
            message: "Погода",
            description: `Сейчас температура в вашем регионе: ${data.current.temperature_2m} ${data.current_units.temperature_2m}`,
        });
    };

    const error = () => {
        instance.error({
            message: "Ошибка",
            description:
                "Не удалось получить данные о погоде, попробуйте позднее.",
        });
    };

    navigator.geolocation.getCurrentPosition(success, error);
};
