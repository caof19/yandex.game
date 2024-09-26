import React, { useState } from "react";
import { Form, Input, Button, message } from "antd";
import { useHistory } from "react-router-dom";
import style from "./SignIn.module.css";
import axios from "axios";
import Auth from "../../service/user/Auth";

const userFields = [
    {
        name: "login",
        placeholder: "Введите ваш логин",
        type: "text",
    },
    {
        name: "password",
        placeholder: "Введите пароль",
        type: "password",
    },
];

const YANDEX_API_URL = "https://ya-praktikum.tech/api/v2";

export const SingIn: React.FC = () => {
    const history = useHistory();

    const handleFinish = (val) => {
        axios
            .post(YANDEX_API_URL + "/auth/signin", val)
            .then(() => {
                message.open({
                    type: "success",
                    content: "Вы успешно авторизовались",
                });

                const auth = new Auth();
                auth.setSignIn();

                setTimeout(() => {
                    history.push("/play"); // Укажите путь к целевой странице
                }, 3000);
            })
            .catch((res) => {
                const errText = res.response?.data?.reason;

                message.error({
                    content: errText,
                    duration: 3, // Время исчезновения через 3 секунды
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
