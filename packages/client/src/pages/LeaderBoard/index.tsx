import { Divider, Flex, Space } from "antd";
import { Link } from "react-router-dom";
import { relativeRoutes } from "../../service/routes/routeMap";
import { LeaderBoardList } from "@/components";
import { leaderBoardData } from "./leaderboardData";
import styles from "./styles.module.css";

export const LeaderBoard = () => {
    return (
        <Flex vertical justify="center" align="center">
            <Divider className={styles.divider}>Список лидеров</Divider>
            <Space>
                <LeaderBoardList list={leaderBoardData} />
            </Space>
            <Link to={relativeRoutes.game.path} className={styles["link"]}>
                Играть
            </Link>
        </Flex>
    );
};
