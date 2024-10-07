import { Button, Flex, Form } from "antd";
import TextArea from "antd/es/input/TextArea";
import { ChangeEvent, useState } from "react";

export type TCommentFormField = {
    comment: string;
};
export type TCommentFormProps = {
    onSubmit: (message: string) => void;
};
export const CommentForm = ({ onSubmit }: TCommentFormProps) => {
    const [comment, setComment] = useState<string>("");
    const submitHandler = () => {
        onSubmit(comment);
        setComment("");
    };
    const changeHandler = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setComment(e.target.value);
    };
    return (
        <Form autoComplete="off" onFinish={submitHandler}>
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
                        value={comment}
                        onChange={changeHandler}
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
