import { User } from "@/service/api/user";
import { Button, Form, Input, Space } from "antd";

// TODO: Вынести это
export const InputRegexps = {
    login: {
        regexp: new RegExp(/^(?=.*[a-zA-Z])([a-zA-Z0-9_-]{3,20})$/),
        message:
            "Логин должен быть от 3 до 20 символов, содержать только буквы, цифры, но не состоять из них, допустимы дефис и подчеркивание",
    },
    password: {
        regexp: new RegExp(/^(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,40}$/),
        message:
            "Пароль должен быть от 8 до 40 символов и содержать хотя бы одну заглавную букву и одну цифру",
    },
    name: {
        regexp: new RegExp(/^[A-ZА-Я][a-zA-Zа-яА-Я-]*$/),
        message:
            "Первая буква должна быть заглавной, без пробелов и цифр, допустим только дефис",
    },
    email: {
        regexp: new RegExp(/^[\w-]+@([\w-]+\.)+[\w-]{2,4}$/),
        message: "Введите правильный адрес электронной почты",
    },
    phone: {
        regexp: new RegExp(/^(?=.*[a-zA-Z])([a-zA-Z0-9_-]{3,20})$/),
        message: "Введите правильный номер телефона",
    },
};

interface ProfileInfoProps {
    isEdit: boolean;
    onSubmit: (data: any) => void;
    onCancelEdit: VoidFunction;
}

export function ProfileInfo({
    isEdit,
    onSubmit,
    onCancelEdit,
}: ProfileInfoProps) {
    // TODO: useSelector(selectUser)
    const user = {} as User;

    return (
        <Form
            initialValues={{
                email: user?.email ?? "",
                login: user?.login ?? "",
                first_name: user?.first_name ?? "",
                second_name: user?.second_name ?? "",
                display_name: user?.display_name ?? "",
                phone: user?.phone ?? "",
            }}
            layout="vertical"
            onFinish={onSubmit}
        >
            <Form.Item<User>
                name="email"
                label="Почта"
                layout="vertical"
                rules={[
                    { required: true, message: "Это поле обязательно" },
                    {
                        pattern: InputRegexps.email.regexp,
                        message: InputRegexps.email.message,
                    },
                ]}
            >
                <Input
                    placeholder="example@email.ru"
                    readOnly={!isEdit}
                    autoComplete="email"
                />
            </Form.Item>
            <Form.Item<User>
                name="login"
                label="Логин"
                layout="vertical"
                rules={[
                    { required: true, message: "Это поле обязательно" },
                    {
                        pattern: InputRegexps.login.regexp,
                        message: InputRegexps.login.message,
                    },
                ]}
            >
                <Input
                    placeholder="test_1234"
                    readOnly={!isEdit}
                    autoComplete="nickname"
                />
            </Form.Item>
            <Form.Item<User>
                name="first_name"
                label="Имя"
                rules={[
                    { required: true, message: "Это поле обязательно" },
                    {
                        pattern: InputRegexps.name.regexp,
                        message: InputRegexps.name.message,
                    },
                ]}
                layout="vertical"
            >
                <Input
                    placeholder="Иван"
                    readOnly={!isEdit}
                    autoComplete="given-name"
                />
            </Form.Item>
            <Form.Item<User>
                name="second_name"
                label="Фамилия"
                rules={[
                    { required: true, message: "Это поле обязательно" },
                    {
                        pattern: InputRegexps.name.regexp,
                        message: InputRegexps.name.message,
                    },
                ]}
                layout="vertical"
            >
                <Input
                    placeholder="Иванов"
                    readOnly={!isEdit}
                    autoComplete="family-name"
                />
            </Form.Item>
            <Form.Item<User>
                name="display_name"
                label="Имя в игре"
                rules={[
                    { required: true, message: "Это поле обязательно" },
                    {
                        pattern: InputRegexps.name.regexp,
                        message: InputRegexps.name.message,
                    },
                ]}
                layout="vertical"
            >
                <Input
                    placeholder="ivanivanov"
                    readOnly={!isEdit}
                    autoComplete="name"
                />
            </Form.Item>
            <Form.Item<User>
                name="phone"
                label="Телефон"
                rules={[
                    { required: true },
                    {
                        pattern: InputRegexps.phone.regexp,
                        message: InputRegexps.phone.message,
                    },
                ]}
                layout="vertical"
            >
                <Input
                    placeholder="+7 (999) 999-99-99"
                    readOnly={!isEdit}
                    autoComplete="tel"
                />
            </Form.Item>
            {isEdit ? (
                <Form.Item>
                    <Space>
                        <Button type="primary" htmlType="submit">
                            Сохранить
                        </Button>
                        <Button danger onClick={onCancelEdit}>
                            Отменить
                        </Button>
                    </Space>
                </Form.Item>
            ) : null}
        </Form>
    );
}
