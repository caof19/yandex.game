import { useEffect } from "react";
import { getQueryParam } from "@/utils/query";
import { REDIRECT_URI } from "@/service/const";
import { User } from "@/service/api/user";
import { message } from "antd";
import { login } from "@/store/slice/auth";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "@/service/hook";
import { YandexApi } from "@/service/api";

export const Login = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    useEffect(() => {
        const code = getQueryParam("code");

        if (code) {
            YandexApi.post("/oauth/yandex", {
                code,
                redirect_uri: REDIRECT_URI,
            })
                .then(() => YandexApi.get<User>("/auth/user"))
                .then(({ data }) => {
                    message.open({
                        type: "success",
                        content: "Вы успешно авторизовались",
                    });

                    dispatch(login(data));

                    navigate("/play");
                })
                .catch((res) => {
                    const errText = res.response?.data?.reason;

                    message.error({
                        content: errText,
                        duration: 1, // Время исчезновения через 3 секунды
                    });
                });
        }
    }, []);

    return <h1>Ожидайте авторизации</h1>;
};
