import { Card, Flex, Form, Input, List, Modal, Typography } from "antd/lib";
import React, { ChangeEvent, useEffect, useState } from "react";
import styles from "./styles.module.css";
import { Link } from "react-router-dom";
import { convertDate } from "../../utils/converDate";
import { BaseApi, routes } from "../../service";
import { TComment } from "../Comments";
import { useUsername } from "@/service/hook";
import { TCreateTopicFormField } from "@/pages/Forum";
import { Button } from "antd";
import DeleteOutlined from "@ant-design/icons/lib/icons/DeleteOutlined";
import { EditOutlined } from "@ant-design/icons";

export type TTopic = {
    id: number;
    title: string;
    text: string;
    createdAt: string;
    author: string;
    comments: TComment[];
};
export type TTopicsProps = {
    topics: TTopic[];
    setUpdate: React.Dispatch<React.SetStateAction<boolean>>;
};
export type TTopicProps = {
    topic: TTopic;
    setUpdate: React.Dispatch<React.SetStateAction<boolean>>;
};

const Topic = (props: TTopicProps) => {
    const [text, setText] = useState(props.topic.text);
    const [title, setTitle] = useState(props.topic.title);
    console.log(props.topic);

    useEffect(() => {
        setText(props.topic.text);
    }, [props.topic.text]);

    useEffect(() => {
        setTitle(props.topic.title);
    }, [props.topic.title]);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const username = useUsername()!;
    const [form, setForm] = useState({
        id: props.topic.id,
        title: props.topic.title,
        text: props.topic.text,
        author: username,
    });
    const toggleModal = () => {
        setIsModalOpen(!isModalOpen);
    };
    const submitHandler = async () => {
        await BaseApi.patch(`/api/topics/${props.topic.id}`, form);
        setTitle(form.title);
        setText(form.text);
        setIsModalOpen(false);
    };
    const changeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    return (
        <List.Item>
            <Card
                title={title}
                className={styles["topic-card"]}
                extra={
                    <Link to={`${routes.forum.path}/${props.topic.id}`}>
                        Перейти
                    </Link>
                }
            >
                <Modal
                    title="Редактировать топик"
                    open={isModalOpen}
                    onCancel={toggleModal}
                    onOk={submitHandler}
                    closable
                    destroyOnClose
                >
                    <Form autoComplete="off" onFinish={submitHandler}>
                        <Flex vertical>
                            <Form.Item<typeof form>
                                name="title"
                                vertical
                                rules={[
                                    {
                                        required: true,
                                        message: "Введите тему топика!",
                                    },
                                ]}
                                initialValue={form.title}
                            >
                                <Input
                                    placeholder="Введите тему топика"
                                    name="title"
                                    value={form.title}
                                    onChange={changeHandler}
                                />
                            </Form.Item>
                            <Form.Item<TCreateTopicFormField>
                                name="text"
                                vertical
                                rules={[
                                    {
                                        required: true,
                                        message: "Введите сообщение!",
                                    },
                                ]}
                                initialValue={form.text}
                            >
                                <Input
                                    placeholder="Введите сообщение"
                                    name="text"
                                    value={form.text}
                                    onChange={changeHandler}
                                />
                            </Form.Item>
                        </Flex>
                    </Form>
                </Modal>
                {username === props.topic.author && (
                    <>
                        <Button
                            shape="circle"
                            icon={<EditOutlined />}
                            onClick={() => {
                                setForm({
                                    ...form,
                                    id: props.topic.id,
                                    title: title,
                                    text: text,
                                });
                                setIsModalOpen(true);
                            }}
                        />
                        <Button
                            shape="circle"
                            icon={<DeleteOutlined />}
                            onClick={async () => {
                                await BaseApi.delete(
                                    `/api/topics/${props.topic.id}`,
                                );
                                props.setUpdate(true);
                            }}
                        />
                    </>
                )}
                <Flex justify="space-between">
                    <Typography.Text>{text}</Typography.Text>
                    <Typography.Text>
                        {convertDate(props.topic.createdAt)}
                    </Typography.Text>
                </Flex>
            </Card>
        </List.Item>
    );
};
export const Topics = (props: TTopicsProps) => {
    return (
        <List>
            {props.topics.map((topic, index) => (
                <Topic topic={topic} key={index} setUpdate={props.setUpdate} />
            ))}
        </List>
    );
};
