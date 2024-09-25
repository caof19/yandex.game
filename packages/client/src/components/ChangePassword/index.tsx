import { ChangePasswordArgs } from "@/service/api/user";
import { Button, Form, Input, Space } from "antd";
import { InputRegexps } from "../ProfileInfo";

type ChangePasswordFormProps = {
    // TODO: Удалить any
    onSubmit: (data: any) => void;
    onCancel: VoidFunction;
};

export function ChangePasswordForm({
    onSubmit,
    onCancel,
}: ChangePasswordFormProps) {
    const [form] = Form.useForm();

    const handleClickCancel = () => {
        form.resetFields();

        onCancel();
    };

    return (
        <Form
            form={form}
            initialValues={{ oldPassword: "", newPassword: "" }}
            layout="vertical"
            onFinish={onSubmit}
        >
            <Form.Item<ChangePasswordArgs>
                name="oldPassword"
                label="Старый пароль"
                rules={[
                    { required: true, message: "Это поле обязательно" },
                    {
                        pattern: InputRegexps.password.regexp,
                        message: InputRegexps.password.message,
                    },
                ]}
            >
                <Input.Password
                    placeholder="Старый пароль"
                    autoComplete="current-password"
                />
            </Form.Item>
            <Form.Item<ChangePasswordArgs>
                name="newPassword"
                label="Новый пароль"
                rules={[
                    { required: true, message: "Это поле обязательно" },
                    {
                        pattern: InputRegexps.password.regexp,
                        message: InputRegexps.password.message,
                    },
                ]}
            >
                <Input.Password
                    placeholder="Новый пароль"
                    autoComplete="new-password"
                />
            </Form.Item>
            <Form.Item>
                <Space>
                    <Button type="primary" htmlType="submit">
                        Сохранить
                    </Button>
                    <Button danger onClick={handleClickCancel}>
                        Отменить
                    </Button>
                </Space>
            </Form.Item>
        </Form>
    );
}
