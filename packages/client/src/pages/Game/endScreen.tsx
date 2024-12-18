import { Button, Flex, Typography } from "antd/lib";
import React from "react";
import { Content } from "antd/lib/layout/layout";
import { NavLink } from "react-router-dom";
import styles from "./endScreen.module.css";
import { GameProps } from ".";

export const EndScreen = (props: GameProps) => {
    const { setGameState, params } = props;

    return (
        <Flex
            className={styles.wrapper}
            align="center"
            vertical
            justify="center"
        >
            <Flex vertical gap={32}>
                <Typography.Text>{`${
                    params.isWinner
                        ? "Поздравляем с победой!!!"
                        : "В следующий раз обязательно повезет!"
                }`}</Typography.Text>
                <Content>
                    <Flex vertical gap={32} align="center">
                        <Button
                            onClick={() => {
                                setGameState({
                                    condition: "game",
                                });
                            }}
                        >
                            Начать заново
                        </Button>
                        <NavLink to={"/leader-board"}>
                            К таблице чемпионов
                        </NavLink>
                        <NavLink to={"/forum"}>На форум</NavLink>
                        <NavLink to={"/main"}>Описание игры</NavLink>
                    </Flex>
                </Content>
            </Flex>
        </Flex>
    );
};
