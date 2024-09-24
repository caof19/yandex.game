import React from "react";
import { Form, Input, Button } from "antd";
import "./style.css";

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

export const SingIn: React.FC = () => {
    return (
        <div className="form-container">
            <Form className="custom-form">
                {userFields.map((field) => (
                    <Form.Item key={field.name} name={field.name}>
                        <Input
                            type={field.type}
                            placeholder={field.placeholder}
                            className="custom-input"
                        />
                    </Form.Item>
                ))}

                <Form.Item>
                    <Button
                        type="primary"
                        htmlType="submit"
                        className="custom-button"
                    >
                        Зарегистрироваться
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};
