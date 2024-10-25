import { Divider, Flex, Space } from "antd";
import { Link } from "react-router-dom";
import { relativeRoutes } from "../../service/routes/routeMap";
import { LeaderBoardList, Loader } from "@/components";
import styles from "./styles.module.css";
import { useEffect, useState } from "react";
import { getLeaderboard } from "@/service/api/leaderboard";

export const LeaderBoard = () => {
    const [leaderboardList, setLeaderboardList] = useState([]);
    const [isLoading, setLoading] = useState(false);
    useEffect(() => {
        setLoading(true);
        getLeaderboard({
            ratingFieldName: "persikiFillerScore",
            cursor: 0,
            limit: 50,
        }).then((res) => {
            setLeaderboardList(res.data);
            setLoading(false);
        });
    }, []);
    return (
        <Flex vertical justify="center" align="center">
            <Divider className={styles.divider}>Список лидеров</Divider>
            <Space>
                {isLoading ? (
                    <Loader />
                ) : (
                    leaderboardList && (
                        <LeaderBoardList list={leaderboardList} />
                    )
                )}
            </Space>
            <Link to={relativeRoutes.game.path} className={styles["link"]}>
                Играть
            </Link>
        </Flex>
    );
};
