// 1. Добавить роут для лидерборда.
// 2. Сверстать страницу лидерборда.
// Добавлен роут для лидерборда, при переходе авторизованного пользователя на этот экран отображается список моковых рекордов.
// Лидерборд представляет собой список рекордов пользователей вашей игры.

import React from "react";
import { Flex, List, Space, Typography } from "antd";

type TLeaderBoardItem = {
    position: number;
    username: string;
    score: number;
};
type TLeaderBoardItemProps = {
    item: TLeaderBoardItem;
};
type TLeaderBoardListProps = {
    list: TLeaderBoardItem[];
};
const LeaderBoardItem: React.FC<TLeaderBoardItemProps> = (props) => {
    const { Text } = Typography;
    const { Item } = List;
    return (
        <Item
            style={{
                display: "flex",
                fontSize: "24px",
                gap: "8px",
            }}
        >
            <Flex
                gap={16}
                style={{
                    justifyContent: "space-between",
                    width: "100%",
                    alignItems: "center",
                }}
            >
                <Space align="center">
                    <Text>{props.item.position}</Text>
                    <Text>{props.item.username}</Text>
                </Space>
                <Text>{props.item.score}</Text>
            </Flex>
        </Item>
    );
};

export const LeaderBoardList: React.FC<TLeaderBoardListProps> = (props) => {
    return (
        <List>
            {props.list.map((item: TLeaderBoardItem) => (
                <LeaderBoardItem item={item} />
            ))}
        </List>
    );
};
