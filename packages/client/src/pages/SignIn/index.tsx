import { Form, Input, Button, message } from "antd";
import { useHistory } from "react-router-dom";
import style from "./SignIn.module.css";
import axios from "axios";
import { useAppDispatch } from "@/service/hook";
import { login } from "@/store/slice/auth";
import { useEffect } from "react";

const YANDEX_API_URL = "https://ya-praktikum.tech/api/v2";

export const SingIn = () => {
    const history = useHistory();
    const dispatch = useAppDispatch();

    const handleFinish = (val) => {
        axios
            .post(YANDEX_API_URL + "/auth/signin", val, {
                withCredentials: true,
            })
            .then(() => {
                message.open({
                    type: "success",
                    content: "Вы успешно авторизовались",
                });

                dispatch(login(val));

                setTimeout(() => {
                    history.push("/play");
                }, 1000);
            })
            .catch((res) => {
                const errText = res.response?.data?.reason;

                message.error({
                    content: errText,
                    duration: 3,
                });
            });
    };

    return (
        <div className={style.form_container}>
            <Form className={style.custom_form} onFinish={handleFinish}>
                <Form.Item
                    key="login"
                    name="login"
                    rules={[
                        { required: true, message: "Это поле обязательно" },
                    ]}
                >
                    <Input
                        type="text"
                        placeholder="Введите ваш логин"
                        className={style.custom_input}
                    />
                </Form.Item>
                <Form.Item
                    key="password"
                    name="password"
                    rules={[
                        { required: true, message: "Это поле обязательно" },
                    ]}
                >
                    <Input
                        type="password"
                        placeholder="Введите пароль"
                        className={style.custom_input}
                    />
                </Form.Item>
                <Form.Item>
                    <Button
                        type="primary"
                        htmlType="submit"
                        className={style.custom_button}
                    >
                        Войти
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};
