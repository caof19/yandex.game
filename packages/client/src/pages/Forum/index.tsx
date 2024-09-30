import React, { useEffect, useState } from "react";
import { Divider, Flex, Layout, Space, Typography } from "antd";
import Title from "antd/es/typography/Title";
import peachIcon from "../../assets/svg/peach.svg";
import { Link } from "react-router-dom";
import { relativeRoutes } from "../../service/routes/routeMap";
import { Topics, TTopic } from "../../Components/Topics";
import { testData } from "./testData";
import styles from "./styles.module.css";

export const Forum: React.FC<object> = () => {
    const [topics, setTopics] = useState<TTopic[] | undefined>();
    const isAuthenticated = false;
    useEffect(() => {
        setTopics(testData);
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
                        <Flex justify="center">
                            {topics && <Topics topics={topics} />}
                        </Flex>
                    </Space>
                </Flex>
            </Space>
        </Layout>
    );
};
