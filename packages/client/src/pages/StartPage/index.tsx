import React from "react";
import { Carousel, Divider, Flex, Image, Space, Typography } from "antd";
import fillerImageFirst from "../../assets/images/filler.jpg";
import fillerImageSecond from "../../assets/images/filler2.jpg";
import leaderboardImage from "../../assets/images/leaderboard.png";
import { data } from "./data";
import { Link, useHistory } from "react-router-dom";
import { relativeRoutes } from "../../service/routes/routeMap";
import styles from "./styles.module.css";

export const StartPage = () => {
    const { Text } = Typography;
    const history = useHistory();
    return (
        <Flex vertical gap={16}>
            <Divider className={styles.divider}>Описание игры</Divider>
            <Flex gap={32}>
                <Carousel
                    arrows
                    className={styles.carousel}
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
            <Divider className={styles.divider}>Список лидеров</Divider>
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
                        className={styles.link}
                        component={Typography.Link}
                        onClick={(e) => {
                            e.preventDefault();
                            history.push("/leader-board"); // Укажите путь к целевой странице
                        }}
                    >
                        Перейти
                    </Link>
                </Flex>
            </Flex>
            <Divider className={styles.divider}>Форум</Divider>
            <Flex vertical align="center" justify="center" gap={32}>
                <Text>{data.forum}</Text>
                <Link
                    to={relativeRoutes.forum.path}
                    className={styles.link}
                    component={Typography.Link}
                    onClick={(e) => {
                        e.preventDefault();
                        history.push("/forum");
                    }}
                >
                    Перейти
                </Link>
            </Flex>
        </Flex>
    );
};
