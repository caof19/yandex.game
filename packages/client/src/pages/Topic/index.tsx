import { useEffect, useState } from "react";
import peachIcon from "../../assets/svg/peach.svg";
import { TTopic } from "../../components/Topics";
import { Link, useParams } from "react-router-dom";
import {
    Button,
    Card,
    Divider,
    Flex,
    Layout,
    Space,
    Typography,
} from "antd/lib";
import { relativeRoutes } from "../../service/routes/routeMap";
import styles from "./styles.module.css";
import { convertDate } from "../../utils/converDate";
import { Comments, TComment } from "../../components/Comments";
import { CommentForm } from "../../components/CommentForm";
import { Loader } from "../../components/Loader";
import { BaseApi } from "@/service";
import { useUsername } from "@/service/hook";

export const Topic = () => {
    const params = useParams<{ id: string }>();
    const isAuthenticated = false;
    const [topic, setTopic] = useState<TTopic | undefined>();
    const username = useUsername();
    useEffect(() => {
        BaseApi.get<TTopic>(`/api/topics/${params.id}`).then((res) =>
            setTopic(res.data),
        );
    }, []);

    const addCommentHandler = (comment: string) => {
        BaseApi.put("/api/comments", {
            topic_id: params.id,
            author: username,
            text: comment,
        }).then(() => {
            BaseApi.get<TTopic>(`/api/topics/${params.id}`).then((res) =>
                setTopic(res.data),
            );
        });
    };
    return (
        <Layout className={styles.page}>
            <Flex className={styles.content}>
                <Flex
                    align="center"
                    vertical
                    className={styles["content-inner"]}
                >
                    <Space className={styles.header}>
                        <Space align="center">
                            <img src={peachIcon} className={styles.logo} />
                            <Typography.Title>PeachesFiller</Typography.Title>
                        </Space>
                        <Space align="center">
                            {isAuthenticated ? (
                                <Button type="link">
                                    <Link
                                        to={relativeRoutes.profile.path}
                                        className={styles.link}
                                    >
                                        Профиль
                                    </Link>
                                </Button>
                            ) : (
                                <>
                                    <Button type="link">
                                        <Link
                                            to={relativeRoutes.singUp.path}
                                            className={styles.link}
                                        >
                                            Регистрация
                                        </Link>
                                    </Button>
                                    <Button type="link">
                                        <Link
                                            to={relativeRoutes.signIn.path}
                                            className={styles.link}
                                        >
                                            Вход
                                        </Link>
                                    </Button>
                                </>
                            )}
                        </Space>
                    </Space>
                    {topic ? (
                        <Space direction="vertical" className={styles.forum}>
                            <Card
                                title={`Тема: ${topic?.title}`}
                                className={styles["topic-info"]}
                            >
                                <Typography.Text>{topic?.text}</Typography.Text>
                                <Divider />
                                <Flex justify="space-between">
                                    <Typography.Text>
                                        {`Автор: ${topic?.author}`}
                                    </Typography.Text>
                                    <Typography.Text>
                                        {`Дата создания: ${convertDate(
                                            topic?.createdAt,
                                        )}`}
                                    </Typography.Text>
                                </Flex>
                            </Card>
                            <Divider>Комментарии</Divider>
                            <Space direction="vertical">
                                {topic.comments && (
                                    <Comments
                                        comments={topic.comments.sort(
                                            (a, b) =>
                                                new Date(
                                                    a.createdAt,
                                                ).getTime() -
                                                new Date(b.createdAt).getTime(),
                                        )}
                                        topic_id={topic.id}
                                    />
                                )}
                                <CommentForm onSubmit={addCommentHandler} />
                            </Space>
                        </Space>
                    ) : (
                        <Loader />
                    )}
                </Flex>
            </Flex>
        </Layout>
    );
};
