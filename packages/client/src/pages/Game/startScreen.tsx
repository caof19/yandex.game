import { Button, Divider, Flex, Input, Typography } from "antd";
import React, { Dispatch, SetStateAction, useState } from "react";
import styles from "./startScreen.module.css";
import { Content } from "antd/es/layout/layout";
import { NavLink } from "react-router-dom";
import { GameState } from ".";

export const StartScreen = (props: {
    setGameState: Dispatch<SetStateAction<GameState>>;
}) => {
    const { setGameState } = props;
    const [name, setName] = useState("");
    return (
        <Flex
            className={styles.wrapper}
            align="center"
            vertical
            justify="center"
        >
            <Flex className={styles.container} vertical gap={32}>
                <Typography.Text>Укажите ваше имя:</Typography.Text>
                <Content>
                    <Flex vertical gap={32}>
                        <Input
                            onChange={(value) => {
                                setName(value.target.value);
                            }}
                        />
                        <Button
                            onClick={() => {
                                setGameState({
                                    condition: "game",
                                    params: { userName: name },
                                });
                            }}
                            disabled={!name}
                        >
                            Начать игру
                        </Button>
                    </Flex>
                    <Divider className={styles.divider}>
                        <NavLink to={"/gamedoc"}>Описание игры</NavLink>
                    </Divider>
                </Content>
            </Flex>
        </Flex>
    );
};
