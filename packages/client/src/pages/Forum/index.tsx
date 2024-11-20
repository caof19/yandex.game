import { ChangeEvent, useEffect, useState } from "react";
import {
    Button,
    Divider,
    Flex,
    Form,
    Input,
    Modal,
    Space,
    Typography,
} from "antd/lib";
import { Topics, TTopic } from "@/components/Topics";
import styles from "./styles.module.css";
import { Loader } from "@/components";
import { PlusCircleOutlined } from "@ant-design/icons/lib";
import { BaseApi } from "@/service/api";
import { useUsername } from "@/service/hook";

export type TCreateTopicFormField = {
    title: string;
    text: string;
    author: string;
};
export const Forum = () => {
    const [topics, setTopics] = useState<TTopic[] | undefined>();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const username = useUsername()!;
    const [form, setForm] = useState<TCreateTopicFormField>({
        title: "",
        text: "",
        author: username,
    });

    const toggleModal = () => {
        setIsModalOpen(!isModalOpen);
    };
    const submitHandler = () => {
        BaseApi.put("/api/topics", form).then(() =>
            BaseApi.get<TTopic[]>("/api/topics").then((res) => {
                setForm({ ...form, text: "" });
                setTopics(res.data);
                setIsModalOpen(false);
            }),
        );
    };
    const changeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };
    useEffect(() => {
        BaseApi.get<TTopic[]>("/api/topics").then((res) => setTopics(res.data));
    }, []);

    const [update, setUpdate] = useState(false);
    useEffect(() => {
        if (update) {
            BaseApi.get<TTopic[]>("/api/topics").then((res) => {
                setTopics(res.data);
                setUpdate(false);
            });
        }
    }, [update]);

    return (
        <Space direction="vertical">
            <Divider>
                <Typography.Title level={2}>
                    <h2>Форум</h2>
                </Typography.Title>
            </Divider>
            <Button
                icon={<PlusCircleOutlined />}
                className={styles["add-button"]}
                onClick={toggleModal}
            >
                Создать тему
            </Button>
            <Modal
                title="Создать топик"
                open={isModalOpen}
                onCancel={toggleModal}
                onOk={submitHandler}
                closable
            >
                <Form autoComplete="off" onFinish={submitHandler}>
                    <Flex vertical>
                        <Form.Item<TCreateTopicFormField>
                            name="title"
                            vertical
                            rules={[
                                {
                                    required: true,
                                    message: "Введите тему топика!",
                                },
                            ]}
                        >
                            <Input
                                placeholder="Введите тему топика"
                                name="title"
                                value={form.title}
                                onChange={changeHandler}
                            />
                        </Form.Item>{" "}
                        <Form.Item<TCreateTopicFormField>
                            name="text"
                            vertical
                            rules={[
                                {
                                    required: true,
                                    message: "Введите сообщение!",
                                },
                            ]}
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
            <Flex justify="center">
                {topics ? (
                    <Topics topics={topics} setUpdate={setUpdate} />
                ) : (
                    <Loader />
                )}
            </Flex>
        </Space>
    );
};
