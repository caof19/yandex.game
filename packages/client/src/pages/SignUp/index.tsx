import React, { useState } from "react";
import { Form, Input, Button, message } from "antd";
import axios from "axios";
import { useHistory } from "react-router-dom";
import "./style.css";

const validationSchema = {
    upperFirstLetter: function (value: string) {
        return /^[A-ZА-Я]/.test(value);
    },
    noDigitsNoSpaces: function (value: string) {
        return /^[^\d\s]+$/.test(value);
    },
    onlyLatAndDigits: function (value: string) {
        return /^[A-Za-z0-9]+$/.test(value);
    },
    email: function (value: string) {
        return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value);
    },
    haveUppercase: function (value: string) {
        return /[A-Z]/.test(value);
    },
    haveDigital: function (value: string) {
        return /\d/.test(value);
    },
    haveLowercase: function (value: string) {
        return /[a-z]/.test(value);
    },
    checkPassLength: function (value: string) {
        return value.length >= 8;
    },
    checkPhone: function (value: string) {
        return /^(\+7|7)?\(?\d{3}\)?\d{3}-?\d{2}-?\d{2}$/.test(value);
    },
    checkEmpty: function (value: string) {
        return value.length > 0;
    },
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
            {
                name: "checkEmpty",
                errMsg: "Введите имя",
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
            {
                name: "checkEmpty",
                errMsg: "Введите фамилию",
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
            {
                name: "checkEmpty",
                errMsg: "Введите логин",
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
            {
                name: "checkEmpty",
                errMsg: "Введите почту",
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
            {
                name: "checkEmpty",
                errMsg: "Введите пароль",
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
            {
                name: "checkEmpty",
                errMsg: "Введите телефон",
            },
        ],
    },
];
const YANDEX_API_URL = "https://ya-praktikum.tech/api/v2";

export const SingUp: React.FC = () => {
    const [errors, setErrors] = useState<{ [key: string]: string | null }>({});
    const history = useHistory();

    const handleBlur = (fieldName: string, value: string, validateRule) => {
        const validationErrors: { [key: string]: string | null } = {};
        validateRule.forEach((rule) => {
            if (!validationSchema[rule.name](value)) {
                validationErrors[fieldName] = rule.errMsg;
            }
        });

        setErrors(validationErrors);
    };

    const handleFinish = (val) => {
        const validationErrors: { [key: string]: string | null } = {};

        Object.keys(val).forEach((key) => {
            const neddleFields = userFields.find((field) => field.name === key);

            neddleFields.validate.forEach((rule) => {
                const valueForm = val[key] || "";
                if (!validationSchema[rule.name](valueForm)) {
                    validationErrors[key] = rule.errMsg;
                }
            });
        });
        setErrors(validationErrors);

        if (Object.keys(validationErrors).length === 0) {
            axios
                .post(YANDEX_API_URL + "/auth/signup", val)
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
                        style: {
                            color: "#ff4d4f", // Красный цвет текста
                        },
                    });
                });
        }
    };

    return (
        <div className="form-container">
            <Form onFinish={handleFinish} className="custom-form">
                {userFields.map((field) => (
                    <Form.Item
                        key={field.name}
                        name={field.name}
                        validateStatus={
                            errors[field.name] ? "error" : undefined
                        }
                        help={errors[field.name]}
                    >
                        <Input
                            type={field.type}
                            placeholder={field.placeholder}
                            onBlur={(e) =>
                                handleBlur(
                                    field.name,
                                    e.target.value,
                                    field.validate,
                                )
                            }
                            className="custom-input"
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
