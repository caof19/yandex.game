import React, { useEffect, useState } from "react";
import { Divider, Flex, Layout, Space, Typography } from "antd";
import Title from "antd/es/typography/Title";
import peachIcon from "../../assets/svg/peach.svg";
import { Link } from "react-router-dom";
import { relativeRoutes } from "../../service/routes/routeMap";
import { LeaderBoardList } from "../../Components/LeaderBoardList";
import { leaderBoardData } from "./leaderboardData";
import styles from "./styles.module.css";

export const LeaderBoard = () => {
    const [isAuthorized, setAuthorized] = useState(false);
    useEffect(() => {
        //проверка авторизации
        setAuthorized(Math.random() > 0.5);
    }, []);
    return (
        <Layout className={styles.page}>
            <Flex gap={32} vertical className={styles.container}>
                <Flex vertical align="center">
                    <Space className={styles.header}>
                        <Space align="center">
                            <img className={styles.logo} src={peachIcon} />
                            <Title>PeachesFiller</Title>
                        </Space>
                        <Space align="center">
                            {isAuthorized ? (
                                <Link
                                    to={relativeRoutes.profile.path}
                                    component={Typography.Link}
                                    className={styles["nav-link"]}
                                >
                                    Профиль
                                </Link>
                            ) : (
                                <>
                                    <Link
                                        to={relativeRoutes.singUp.path}
                                        component={Typography.Link}
                                        className={styles["nav-link"]}
                                    >
                                        Регистрация
                                    </Link>
                                    <Link
                                        to={relativeRoutes.signIn.path}
                                        component={Typography.Link}
                                        className={styles["nav-link"]}
                                    >
                                        Вход
                                    </Link>
                                </>
                            )}
                        </Space>
                    </Space>
                    <Divider className={styles.divider}>Список лидеров</Divider>
                    <Space>
                        <LeaderBoardList list={leaderBoardData} />
                    </Space>
                </Flex>
                <Link
                    to={relativeRoutes.game.path}
                    className={styles["link"]}
                    component={Typography.Link}
                >
                    Играть
                </Link>
            </Flex>
        </Layout>
    );
};
