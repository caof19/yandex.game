import { Flex, List, Space, Typography } from "antd/lib";
import styles from "./styles.module.css";
import {
    GetAllLeaderoardResponse,
    LeaderboardData,
} from "@/service/api/leaderboard";

type TLeaderBoardItemProps = {
    item: LeaderboardData & { position: number };
};
type TLeaderBoardListProps = {
    list: GetAllLeaderoardResponse;
};
const LeaderBoardItem = (props: TLeaderBoardItemProps) => {
    return (
        <List.Item className={styles["leaderboard-row"]}>
            <Flex
                gap={32}
                align="center"
                className={styles["leaderboard-row-inner"]}
            >
                <Flex align="center" gap={16}>
                    <Typography.Text strong>
                        {props.item.position}
                    </Typography.Text>
                    <Typography.Text strong>
                        {props.item.username}
                    </Typography.Text>
                </Flex>
                <Typography.Text type="warning">
                    {props.item.peachFillerScore}
                </Typography.Text>
            </Flex>
        </List.Item>
    );
};

export const LeaderBoardList = (props: TLeaderBoardListProps) => {
    return (
        <List>
            {props.list.map((leaderboardItem, index) => (
                <LeaderBoardItem
                    item={{ ...leaderboardItem.data, position: index + 1 }}
                    key={index}
                />
            ))}
        </List>
    );
};
