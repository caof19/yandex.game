import { useEffect } from "react";
import { getQueryParam } from "@/utils/query";
import { API } from "@/service";
import { REDIRECT_URI } from "@/service/const";
import { User } from "@/service/api/user";
import { message } from "antd";
import { login } from "@/store/slice/auth";
import { useHistory } from "react-router-dom";
import { useAppDispatch } from "@/service/hook";

export const Login = () => {
    const history = useHistory();
    const dispatch = useAppDispatch();

    useEffect(() => {
        const code = getQueryParam("code");

        if (code) {
            API.post("/oauth/yandex", {
                code,
                redirect_uri: REDIRECT_URI,
            })
                .then(() => API.get<User>("/auth/user"))
                .then(({ data }) => {
                    message.open({
                        type: "success",
                        content: "Вы успешно авторизовались",
                    });

                    dispatch(login(data));

                    history.push("/play");
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
