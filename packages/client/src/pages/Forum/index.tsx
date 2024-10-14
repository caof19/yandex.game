import { ChangeEvent, useEffect, useState } from "react";
import {
    Button,
    Divider,
    Flex,
    Form,
    Input,
    Layout,
    Modal,
    Space,
    Typography,
} from "antd";
import Title from "antd/es/typography/Title";
import peachIcon from "../../assets/svg/peach.svg";
import { Link } from "react-router-dom";
import { relativeRoutes } from "../../service/routes/routeMap";
import { Topics, TTopic } from "../../components/Topics";
import { testData } from "./testData";
import styles from "./styles.module.css";
import { Loader } from "../../components/Loader";
import { PlusCircleOutlined } from "@ant-design/icons";

export type TCreateTopicFormField = {
    title: string;
    message: string;
};
export const Forum = () => {
    const [topics, setTopics] = useState<TTopic[] | undefined>();
    const isAuthenticated = false;
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [form, setForm] = useState({ title: "", message: "" });

    const toggleModal = () => {
        setIsModalOpen(!isModalOpen);
    };
    const submitHandler = () => {
        // TODO
        console.log(form);
    };
    const changeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };
    useEffect(() => {
        setTimeout(() => {
            setTopics(testData);
        }, 2000);
    }, []);
    return (
        <Layout className={styles.page}>
            <Space className={styles.container}>
                <Flex vertical align="center" className={styles.content}>
                    <Flex className={styles.header}>
                        <Space align="center">
                            <img src={peachIcon} className={styles.logo} />
                            <Title>PeachesFiller</Title>
                        </Space>
                        <Space align="center">
                            {isAuthenticated ? (
                                <Link
                                    to={relativeRoutes.profile.path}
                                    component={Typography.Link}
                                    className={styles.link}
                                >
                                    Профиль
                                </Link>
                            ) : (
                                <>
                                    <Link
                                        to={relativeRoutes.singUp.path}
                                        className={styles.link}
                                        component={Typography.Link}
                                    >
                                        Регистрация
                                    </Link>
                                    <Link
                                        to={relativeRoutes.signIn.path}
                                        className={styles.link}
                                        component={Typography.Link}
                                    >
                                        Вход
                                    </Link>
                                </>
                            )}
                        </Space>
                    </Flex>
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
                                            value={form.message}
                                            onChange={changeHandler}
                                        />
                                    </Form.Item>{" "}
                                    <Form.Item<TCreateTopicFormField>
                                        name="message"
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
                                            name="message"
                                            value={form.message}
                                            onChange={changeHandler}
                                        />
                                    </Form.Item>
                                </Flex>
                            </Form>
                        </Modal>
                        <Flex justify="center">
                            {topics ? <Topics topics={topics} /> : <Loader />}
                        </Flex>
                    </Space>
                </Flex>
            </Space>
        </Layout>
    );
};
