import React from "react";
import { Form, Input, Button, message } from "antd";
import { useHistory } from "react-router-dom";
import style from "./SignUp.module.css";
import { API } from "@/service";

const validationSchema = {
    upperFirstLetter: new RegExp(/^[A-ZА-Я]/),
    noDigitsNoSpaces: new RegExp(/^[^\d\s]+$/),
    onlyLatAndDigits: new RegExp(/^[A-Za-z0-9]+$/),
    email: new RegExp(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/),
    haveUppercase: new RegExp(/[A-Z]/),
    haveDigital: new RegExp(/\d/),
    haveLowercase: new RegExp(/[a-z]/),
    checkPassLength: new RegExp(/^.{8,}$/),
    checkPhone: new RegExp(/^(\+7|7)?\(?\d{3}\)?\d{3}-?\d{2}-?\d{2}$/),
};

const userFields = [
    {
        name: "first_name",
        placeholder: "Введите ваше имя",
        type: "text",
        validate: [
            {
                name: "upperFirstLetter",
                errMsg: "Имя должно начинаться с большой буквы",
            },
            {
                name: "noDigitsNoSpaces",
                errMsg: "Имя не должно содержать пробелы или цифры",
            },
        ],
    },
    {
        name: "second_name",
        placeholder: "Введите вашу фамилию",
        type: "text",
        validate: [
            {
                name: "upperFirstLetter",
                errMsg: "Фамилия должна начинаться с большой буквы",
            },
            {
                name: "noDigitsNoSpaces",
                errMsg: "Фамилия не должна содержать пробелы или цифры",
            },
        ],
    },
    {
        name: "login",
        placeholder: "Введите ваш логин",
        type: "text",
        validate: [
            {
                name: "onlyLatAndDigits",
                errMsg: "Логин может содержать только цифры и латинские буквы",
            },
        ],
    },
    {
        name: "email",
        placeholder: "Введите вашу почту",
        type: "text",
        validate: [
            {
                name: "email",
                errMsg: "Введите действующий email",
            },
        ],
    },
    {
        name: "password",
        placeholder: "Введите пароль",
        type: "password",
        validate: [
            {
                name: "haveUppercase",
                errMsg: "Пароль должен содержать хоть одну заглавную букву",
            },
            {
                name: "haveDigital",
                errMsg: "Пароль должен содержать хоть одну цифру",
            },
            {
                name: "haveLowercase",
                errMsg: "Пароль должен содержать хоть одну строчную букву",
            },
            {
                name: "checkPassLength",
                errMsg: "Пароль должен быть больше 8 символов",
            },
        ],
    },
    {
        name: "phone",
        placeholder: "Введите ваш телефон",
        type: "text",
        validate: [
            {
                name: "checkPhone",
                errMsg: "Введите действующий телефон",
            },
        ],
    },
];

export const SingUp: React.FC = () => {
    const history = useHistory();

    const handleFinish = (val) => {
        API.post("/auth/signup", val)
            .then(() => {
                message.open({
                    type: "success",
                    content: "Регистрация прошла успешно!",
                });

                setTimeout(() => {
                    history.push("/auth/sign-in"); // Укажите путь к целевой странице
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
            <Form onFinish={handleFinish} className={style.custom_form}>
                {userFields.map((field) => (
                    <Form.Item
                        key={field.name}
                        name={field.name}
                        rules={[
                            { required: true, message: "Это поле обязательно" },
                            ...field.validate.map((item) => ({
                                pattern: validationSchema[item.name],
                                message: item.errMsg,
                            })),
                        ]}
                    >
                        <Input
                            type={field.type}
                            placeholder={field.placeholder}
                            className={style.custom_input}
                        />
                    </Form.Item>
                ))}

                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        Зарегистрироваться
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};
