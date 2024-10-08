import { useEffect, useState } from "react";
import peachIcon from "../../assets/svg/peach.svg";
import { TTopic } from "../../components/Topics";
import { Link, useParams } from "react-router-dom";
import { Card, Divider, Flex, Layout, Space, Typography } from "antd";
import { relativeRoutes } from "../../service/routes/routeMap";
import styles from "./styles.module.css";
import { testComments, testTopics } from "./testData";
import { convertDate } from "../../utils/converDate";
import { Comments, TComment } from "../../components/Comments";
import { CommentForm } from "../../components/CommentForm";
import { Loader } from "../../components/Loader";

export const Topic = () => {
    const params: { id: string } = useParams();
    const isAuthenticated = false;
    const [comments, setComments] = useState<Array<TComment> | undefined>();
    const [topic, setTopic] = useState<TTopic | undefined>();
    useEffect(() => {
        setTimeout(() => {
            setTopic(testTopics.find((data) => data.id === Number(params.id)));
            setComments(testComments);
        }, 2000);
    }, []);
    const addCommentHandler = (comment: string) => {
        setComments((prevState) => {
            return [
                ...(prevState as TComment[]),
                {
                    author: "me",
                    date: new Date().toDateString(),
                    text: comment,
                },
            ];
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
                                <Link
                                    to={relativeRoutes.profile.path}
                                    component={Typography.Link}
                                    className={styles.link}
                                >
                                    Профиль
                                </Link>
                            ) : (
                                <>
                                    <Link
                                        to={relativeRoutes.singUp.path}
                                        component={Typography.Link}
                                        className={styles.link}
                                    >
                                        Регистрация
                                    </Link>
                                    <Link
                                        to={relativeRoutes.signIn.path}
                                        component={Typography.Link}
                                        className={styles.link}
                                    >
                                        Вход
                                    </Link>
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
                                <Typography.Text>
                                    {topic?.message}
                                </Typography.Text>
                                <Divider />
                                <Flex justify="space-between">
                                    <Typography.Text>
                                        {`Автор: ${topic?.author}`}
                                    </Typography.Text>
                                    <Typography.Text>
                                        {`Дата создания: ${convertDate(
                                            topic?.createDate as string,
                                        )}`}
                                    </Typography.Text>
                                </Flex>
                            </Card>
                            <Divider>Комментарии</Divider>
                            <Space direction="vertical">
                                {comments && <Comments comments={comments} />}
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
