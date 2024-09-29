import { Button, Flex, Form } from "antd";
import TextArea from "antd/es/input/TextArea";
import React, { ChangeEvent, useState } from "react";

export type TCommentFormField = {
    comment: string;
};
export type TCommentFormProps = {
    onSubmit: (message: string) => void;
};
export const CommentForm: React.FC<TCommentFormProps> = (props) => {
    const [message, setMessage] = useState<string>("");
    const submitHandler = () => {
        props.onSubmit(message);
    };
    const changeHandler = (e: ChangeEvent) => {
        setMessage((e.target as HTMLTextAreaElement).value);
    };
    return (
        <Form autoComplete="off" onFinish={submitHandler.bind(this)}>
            <Flex vertical>
                <Form.Item<TCommentFormField>
                    name="comment"
                    vertical
                    rules={[
                        {
                            required: true,
                            message: "Введите сообщение",
                        },
                    ]}
                >
                    <TextArea
                        placeholder="Введите Ваш комменатрий"
                        onChange={changeHandler.bind(this)}
                    />
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        Отправить
                    </Button>
                </Form.Item>
            </Flex>
        </Form>
    );
};
