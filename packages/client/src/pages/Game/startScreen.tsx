import { Button, Divider, Flex, Input, Layout, Typography } from "antd";
import React, { useState } from "react";
import styles from "./startScreen.module.css";
import { Content } from "antd/es/layout/layout";
import { NavLink } from "react-router-dom";

export const StartScreen = (props: {
    // TODO: какая-то функция, которая будет изменять состояние и инициировать начало игры (рендерить игру)
    setGameState: (name: string) => void;
}) => {
    const { setGameState } = props;
    const [name, setName] = useState("");

    return (
        <Layout>
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
                                    setGameState(name);
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
        </Layout>
    );
};
