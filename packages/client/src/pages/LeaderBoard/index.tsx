import React, { useEffect, useState } from "react";
import { Divider, Flex, Layout, Space, Typography } from "antd";
import Title from "antd/es/typography/Title";
import peachIcon from "../../assets/svg/peach.svg";
import { Link } from "react-router-dom";
import { relativeRoutes } from "../../service/routes/routeMap";
import { LeaderBoardList } from "../../Components/LeaderBoardList";
import { leaderBoardData } from "./leaderboardData";

export const LeaderBoard: React.FC<object> = () => {
    const navLinkStyle: React.CSSProperties = {
        color: "#ffc53d",
        fontSize: "16px",
    };
    const linkStyle: React.CSSProperties = {
        padding: "8px 16px",
        borderRadius: "16px",
        backgroundColor: "#ffc53d",
        color: "#000",
        fontSize: "16px",
        alignSelf: "center",
    };
    const [isAuthorized, setAuthorized] = useState(false);
    useEffect(() => {
        //проверка авторизации
        setAuthorized(Math.random() > 0.5);
    }, []);
    return (
        <Layout style={{ height: "100vh" }}>
            <Flex
                gap={32}
                vertical
                style={{
                    margin: "0 auto",
                    maxWidth: "1024px",
                    width: "100%",
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
                            {isAuthorized ? (
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
                    <Divider style={{ fontSize: "24px" }}>
                        Список лидеров
                    </Divider>
                    <Space>
                        <LeaderBoardList list={leaderBoardData} />
                    </Space>
                </Flex>
                <Link
                    to={relativeRoutes.game.path}
                    style={linkStyle}
                    component={Typography.Link}
                >
                    Играть
                </Link>
            </Flex>
        </Layout>
    );
};
