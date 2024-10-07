import { Card, Flex, List, Typography } from "antd";
import React from "react";
import styles from "./styles.module.css";
import { Link } from "react-router-dom";
import { convertDate } from "../../utils/converDate";
import { routes } from "../../service";

export type TTopic = {
    id: number;
    title: string;
    message: string;
    lastMessageDate: string;
    createDate: string;
    messagesCount: number;
    author: string;
};
export type TTopicsProps = {
    topics: TTopic[];
};
export type TTopicProps = {
    topic: TTopic;
};

const Topic: React.FC<TTopicProps> = (props) => {
    return (
        <List.Item>
            <Card
                title={props.topic.title}
                className={styles["topic-card"]}
                extra={
                    <Link to={`${routes.forum.path}/${props.topic.id}`}>
                        Перейти
                    </Link>
                }
            >
                <Flex justify="space-between">
                    <Typography.Text>{props.topic.message}</Typography.Text>
                    <Typography.Text>
                        {convertDate(props.topic.lastMessageDate)}
                    </Typography.Text>
                </Flex>
            </Card>
        </List.Item>
    );
};
export const Topics: React.FC<TTopicsProps> = (props) => {
    return (
        <List>
            {props.topics.map((topic, index) => (
                <Topic topic={topic} key={index} />
            ))}
        </List>
    );
};
