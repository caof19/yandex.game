import { Button, Divider, Flex, Typography } from "antd";
import React, { Dispatch, SetStateAction } from "react";
import styles from "./startScreen.module.css";
import { Content } from "antd/es/layout/layout";
import { NavLink } from "react-router-dom";
import { GameState } from ".";

export const StartScreen = (props: {
    setGameState: Dispatch<SetStateAction<GameState>>;
}) => {
    const { setGameState } = props;
    return (
        <Flex
            className={styles.wrapper}
            align="center"
            vertical
            justify="center"
        >
            <Flex className={styles.container} vertical gap={32}>
                <Content>
                    <Flex vertical gap={32}>
                        <Button
                            onClick={() => {
                                setGameState({
                                    condition: "game",
                                });
                            }}
                        >
                            Начать игру
                        </Button>
                    </Flex>
                    <Divider className={styles.divider}>
                        <NavLink to={"/main"}>Описание игры</NavLink>
                    </Divider>
                </Content>
            </Flex>
        </Flex>
    );
};
