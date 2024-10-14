import { Form, Input, Button, message } from "antd";
import { useHistory } from "react-router-dom";
import style from "./SignIn.module.css";
import { useAppDispatch } from "@/service/hook";
import { login } from "@/store/slice/auth";
import { API } from "@/service";
import { User } from "@/service/api/user";

export const SingIn = () => {
    const history = useHistory();
    const dispatch = useAppDispatch();

    const handleFinish = async (val) => {
        API.post("/auth/signin", val)
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
                if (
                    res?.response?.data?.reason?.includes(
                        "User already in system",
                    )
                ) {
                    // TODO: Это переписать надо, вынести в redux thunks
                    API.get<User>("/auth/user").then(({ data }) => {
                        message.open({
                            type: "success",
                            content: "Вы успешно авторизовались",
                        });

                        dispatch(login(data));

                        history.push("/play");
                    });
                    return;
                }
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
