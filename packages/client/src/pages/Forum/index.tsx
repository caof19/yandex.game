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
    const navLinkStyle: React.CSSProperties = {
        color: "#ffc53d",
        fontSize: "16px",
    };
    useEffect(() => {
        setTopics(testData);
    }, []);
    return (
        <Layout className={styles.page}>
            <Flex
                style={{
                    margin: "0 auto",
                    maxWidth: "1024px",
                }}
            >
                <Flex style={{ flexDirection: "column" }} align="center">
                    <Space
                        style={{
                            justifyContent: "space-between",
                            width: "100%",
                        }}
                    >
                        <Space align="center">
                            <img
                                src={peachIcon}
                                style={{ width: "42px", height: "42px" }}
                            />
                            <Title>PeachesFiller</Title>
                        </Space>
                        <Space align="center">
                            {isAuthenticated ? (
                                <Link
                                    to={relativeRoutes.profile.path}
                                    component={Typography.Link}
                                    style={navLinkStyle}
                                >
                                    Профиль
                                </Link>
                            ) : (
                                <>
                                    <Link
                                        to={relativeRoutes.singUp.path}
                                        component={Typography.Link}
                                        style={navLinkStyle}
                                    >
                                        Регистрация
                                    </Link>
                                    <Link
                                        to={relativeRoutes.signIn.path}
                                        component={Typography.Link}
                                        style={navLinkStyle}
                                    >
                                        Вход
                                    </Link>
                                </>
                            )}
                        </Space>
                    </Space>
                    <Space direction="vertical">
                        <Divider>
                            <Typography.Title level={2}>
                                <h2>Форум</h2>
                            </Typography.Title>
                        </Divider>
                        <Space direction="vertical">
                            {topics && <Topics topics={topics} />}
                        </Space>
                    </Space>
                </Flex>
            </Flex>
        </Layout>
    );
};
