import { Button, Flex, Layout, Typography } from "antd";
import React from "react";
import { Content } from "antd/es/layout/layout";
import { NavLink } from "react-router-dom";
import styles from "./endScreen.module.css";

export const EndScreen = (props: {
    // TODO: какая-то функция, которая будет изменять состояние и инициировать начало игры (рендерить игру)
    name: string;
    isWinner: boolean;
    setGameState: (name: string) => void;
}) => {
    const { setGameState, name, isWinner } = props;

    return (
        <Layout>
            <Flex
                className={styles.wrapper}
                align="center"
                vertical
                justify="center"
            >
                <Flex vertical gap={32}>
                    <Typography.Text>{`${name}, ${
                        isWinner
                            ? "поздравляем с победой!!!"
                            : "в следующий раз обязательно повезет!"
                    }`}</Typography.Text>
                    <Content>
                        <Flex vertical gap={32} align="center">
                            <Button
                                onClick={() => {
                                    setGameState(name);
                                }}
                            >
                                Начать заново
                            </Button>
                            <NavLink to={"/leader-board"}>
                                К таблице чемпионов
                            </NavLink>
                            <NavLink to={"/forum"}>На форум</NavLink>
                            <NavLink to={"/gamedoc"}>Описание игры</NavLink>
                        </Flex>
                    </Content>
                </Flex>
            </Flex>
        </Layout>
    );
};
