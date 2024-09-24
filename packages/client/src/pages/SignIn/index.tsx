import React, { useState } from "react";
import { Form, Input, Button, message } from "antd";
import { useHistory } from "react-router-dom";
import "./style.css";
import axios from "axios";
import Auth from "../../service/user/Auth";

const userFields = [
    {
        name: "login",
        placeholder: "Введите ваш логин",
        type: "text",
        validate: [
            {
                name: "checkEmpty",
                errMsg: "Введите логин",
            },
        ],
    },
    {
        name: "password",
        placeholder: "Введите пароль",
        type: "password",
        validate: [
            {
                name: "checkEmpty",
                errMsg: "Введите пароль",
            },
        ],
    },
];

const validationSchema = {
    checkEmpty: function (value: string) {
        return value.length > 0;
    },
};

const YANDEX_API_URL = "https://ya-praktikum.tech/api/v2";

export const SingIn: React.FC = () => {
    const history = useHistory();
    const [errors, setErrors] = useState<{ [key: string]: string | null }>({});

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
                        style: {
                            color: "#ff4d4f", // Красный цвет текста
                        },
                    });
                });
        }
    };

    return (
        <div className="form-container">
            <Form className="custom-form" onFinish={handleFinish}>
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
                            className="custom-input"
                            onBlur={(e) =>
                                handleBlur(
                                    field.name,
                                    e.target.value,
                                    field.validate,
                                )
                            }
                        />
                    </Form.Item>
                ))}

                <Form.Item>
                    <Button
                        type="primary"
                        htmlType="submit"
                        className="custom-button"
                    >
                        Войти
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};
