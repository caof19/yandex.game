import React, { useEffect, useState } from "react";
import {
    Carousel,
    Divider,
    Flex,
    Image,
    Layout,
    Space,
    Typography,
} from "antd";
import Title from "antd/es/typography/Title";
import fillerImageFirst from "../../assets/images/filler.jpg";
import fillerImageSecond from "../../assets/images/filler2.jpg";
import leaderboardImage from "../../assets/images/leaderboard.png";
import peachIcon from "../../assets/svg/peach.svg";
import { data } from "./data";
import { Link } from "react-router-dom";
import { relativeRoutes } from "../../service/routes/routeMap";

export const StartPage: React.FC<object> = () => {
    const { Text } = Typography;
    const linkStyle: React.CSSProperties = {
        padding: "8px 16px",
        borderRadius: "16px",
        backgroundColor: "#ffc53d",
        color: "#000",
        fontSize: "16px",
    };
    const navLinkStyle: React.CSSProperties = {
        color: "#ffc53d",
        fontSize: "16px",
    };
    const [isAuthorized, setAuthorized] = useState(false);
    useEffect(() => {
        //проверка авторизации
        setAuthorized(Math.random() > 0.5);
    }, []);
    return (
        <Layout>
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
                        Описание игры
                    </Divider>
                    <Flex gap={32}>
                        <Carousel
                            arrows
                            style={{ width: "400px" }}
                            autoplay
                            autoplaySpeed={4000}
                        >
                            <div>
                                <Image
                                    width={400}
                                    height={200}
                                    src={fillerImageFirst}
                                    preview={false}
                                />
                            </div>
                            <div>
                                <Image
                                    width={400}
                                    height={200}
                                    src={fillerImageSecond}
                                    preview={false}
                                />
                            </div>
                        </Carousel>
                        <Text>{data.about}</Text>
                    </Flex>
                    <Divider style={{ fontSize: "24px" }}>
                        Список лидеров
                    </Divider>
                    <Flex gap={32}>
                        <Space>
                            <Image
                                width={256}
                                height={256}
                                src={leaderboardImage}
                                preview={false}
                            />
                        </Space>
                        <Flex vertical align="center" justify="center" gap={32}>
                            <Text>{data.leaderboard}</Text>
                            <Link
                                to={relativeRoutes.leaderBoard.path}
                                style={linkStyle}
                                component={Typography.Link}
                            >
                                Перейти
                            </Link>
                        </Flex>
                    </Flex>
                    <Divider style={{ fontSize: "24px" }}>Форум</Divider>
                    <Flex vertical align="center" justify="center" gap={32}>
                        <Text>{data.forum}</Text>
                        <Link
                            to={relativeRoutes.forum.path}
                            style={linkStyle}
                            component={Typography.Link}
                        >
                            Перейти
                        </Link>
                    </Flex>
                </Flex>
            </Flex>
        </Layout>
    );
};
