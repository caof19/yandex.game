import PlusCircleOutlined from "@ant-design/icons/lib/icons/PlusCircleOutlined";
import { convertDate } from "../../utils/converDate";
import styles from "./styles.module.css";
import {
    Card,
    Flex,
    List,
    Typography,
    Button,
    Modal,
    Form,
    Input,
} from "antd/lib";
import { ChangeEvent, useEffect, useState } from "react";
import { useUsername } from "@/service/hook";
import { BaseApi } from "@/service";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";

export type TComment = {
    id: number;
    author: string;
    createdAt: string;
    text: string;
    topic_id: number;
    replies: TReply[];
};
export type TReply = {
    id: number;
    author: string;
    createdAt: string;
    text: string;
    topic_id: number;
};
export type TCommentsProps = {
    comments: TComment[];
    topic_id: number;
    isReply?: boolean;
};
export type TCommentProps = {
    comment: TComment;
    isReply?: boolean;
    setUpdateComments: React.Dispatch<React.SetStateAction<boolean>>;
    comment_id: number;
};
type TCreateReplyType = {
    text: string;
    author: string;
    topic_id: number;
    comment_id: number;
};

export const Comment = ({
    comment,
    isReply,
    setUpdateComments,
    comment_id,
}: TCommentProps) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const username = useUsername()!;
    const [form, setForm] = useState<TCreateReplyType>({
        text: comment.text,
        author: username,
        topic_id: comment.topic_id,
        comment_id: comment_id,
    });

    useEffect(() => {
        setForm({
            text: comment.text,
            author: username,
            topic_id: comment.topic_id,
            comment_id: comment_id,
        });
    }, [comment]);
    const [isEdit, setIsEdit] = useState(false);
    const [isReplyAction, setIsReplyAction] = useState(false);
    const toggleModal = () => {
        setIsModalOpen(!isModalOpen);
    };
    const submitHandler = async () => {
        !isEdit
            ? await BaseApi.put("/api/replies", form)
            : isReplyAction
            ? await BaseApi.patch(`/api/replies/${comment.id}`, {
                  ...form,
                  id: comment.id,
              })
            : await BaseApi.patch(`/api/comments/${comment.id}`, {
                  id: comment.id,
                  text: form.text,
                  author: form.author,
                  topic_id: form.topic_id,
              });
        setForm({ ...form, text: "" });
        setUpdateComments(true);
        setIsEdit(false);
        setIsModalOpen(false);
        setIsReplyAction(false);
    };
    const changeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };
    return (
        <List.Item style={isReply ? { paddingLeft: "20px" } : {}}>
            <Card title={comment.author} className={styles["comment-card"]}>
                <Flex justify="space-between" style={{ paddingBottom: "10px" }}>
                    <Typography.Text>{comment.text}</Typography.Text>
                    <Typography.Text>
                        {convertDate(comment.createdAt)}
                    </Typography.Text>
                </Flex>
                {!isReply && (
                    <Button
                        shape="circle"
                        title="Добавить ответ"
                        icon={<PlusCircleOutlined />}
                        onClick={() => {
                            setIsReplyAction(true);
                            toggleModal();
                        }}
                    />
                )}
                {username === comment.author && (
                    <>
                        <Button
                            shape="circle"
                            title="Редактировать"
                            icon={<EditOutlined />}
                            onClick={() => {
                                setIsEdit(true);
                                isReply && setIsReplyAction(true);
                                toggleModal();
                            }}
                        />
                        <Button
                            shape="circle"
                            icon={<DeleteOutlined />}
                            title="Удалить"
                            onClick={async () => {
                                await BaseApi.delete(
                                    isReply
                                        ? `/api/replies/${comment.id}`
                                        : `/api/comments/${comment.id}`,
                                );
                                setUpdateComments(true);
                            }}
                        />
                    </>
                )}
            </Card>
            <Modal
                title={
                    isReplyAction
                        ? isEdit
                            ? "Редактировать ответ"
                            : "Ответить"
                        : "Редактировать комментарий"
                }
                open={isModalOpen}
                onCancel={toggleModal}
                onOk={async () => await submitHandler()}
                closable
                destroyOnClose
            >
                <Form
                    autoComplete="off"
                    onFinish={async () => await submitHandler()}
                >
                    <Flex vertical>
                        <Form.Item<TCreateReplyType>
                            name="text"
                            vertical
                            rules={[
                                {
                                    required: true,
                                    message:
                                        (isEdit
                                            ? "Редактировать "
                                            : "Введите ") +
                                        (isReplyAction
                                            ? "ответ"
                                            : "комментарий"),
                                },
                            ]}
                            initialValue={isEdit ? form.text : ""}
                        >
                            <Input
                                placeholder={
                                    (isEdit ? "Редактировать " : "Введите ") +
                                    (isReplyAction ? "ответ" : "комментарий")
                                }
                                name="text"
                                value={form.text}
                                onChange={changeHandler}
                            />
                        </Form.Item>
                    </Flex>
                </Form>
            </Modal>
        </List.Item>
    );
};

export const Comments = ({ comments, topic_id }: TCommentsProps) => {
    const [updateCommnents, setUpdateComments] = useState(false);
    const [initComments, setInitComments] = useState(comments);
    useEffect(() => {
        if (updateCommnents) {
            BaseApi.get(`/api/topics/${topic_id}`).then((res) =>
                setInitComments(res.data.comments),
            );
            setUpdateComments(false);
        }
    }, [updateCommnents]);

    useEffect(() => {
        setUpdateComments(true);
    }, [comments]);

    return (
        <List>
            {initComments.map((comment, index) => (
                <>
                    <Comment
                        comment={comment}
                        key={index}
                        setUpdateComments={setUpdateComments}
                        comment_id={comment.id}
                    />
                    {!!comment.replies.length && (
                        <Flex vertical>
                            <Typography.Text style={{ textAlign: "center" }}>
                                Ответы
                            </Typography.Text>
                            {comment.replies
                                .sort(
                                    (a, b) =>
                                        new Date(a.createdAt).getTime() -
                                        new Date(b.createdAt).getTime(),
                                )
                                .map((reply, index) => (
                                    <Comment
                                        comment={reply as TComment}
                                        key={index}
                                        isReply
                                        setUpdateComments={setUpdateComments}
                                        comment_id={comment.id}
                                    />
                                ))}
                        </Flex>
                    )}
                </>
            ))}
        </List>
    );
};
