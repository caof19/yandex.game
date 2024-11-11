import { Flex, List, Space, Typography } from "antd/lib";
import styles from "./styles.module.css";
type TLeaderBoardItem = {
    id: number;
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
const LeaderBoardItem = (props: TLeaderBoardItemProps) => {
    return (
        <List.Item className={styles["leaderboard-row"]}>
            <Flex gap={16} className={styles["leaderboard-row-inner"]}>
                <Space align="center">
                    <Typography.Text>{props.item.position}</Typography.Text>
                    <Typography.Text>{props.item.username}</Typography.Text>
                </Space>
                <Typography.Text>{props.item.score}</Typography.Text>
            </Flex>
        </List.Item>
    );
};

export const LeaderBoardList = (props: TLeaderBoardListProps) => {
    return (
        <List>
            {props.list.map((leaderboardItem) => (
                <LeaderBoardItem
                    item={leaderboardItem}
                    key={leaderboardItem.id}
                />
            ))}
        </List>
    );
};
