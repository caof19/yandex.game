import React from "react";
import { convertDate } from "../../utils/converDate";
import styles from "./styles.module.css";
import { Card, Flex, List, Typography } from "antd";

export type TComment = {
    author: string;
    date: string;
    text: string;
};
export type TCommentsProps = {
    comments: TComment[];
};
export type TCommentProps = {
    comment: TComment;
};

export const Comment: React.FC<TCommentProps> = (props) => {
    return (
        <List.Item>
            <Card
                title={props.comment.author}
                className={styles["comment-card"]}
            >
                <Flex justify="space-between">
                    <Typography.Text>{props.comment.text}</Typography.Text>
                    <Typography.Text>
                        {convertDate(props.comment.date)}
                    </Typography.Text>
                </Flex>
            </Card>
        </List.Item>
    );
};

export const Comments: React.FC<TCommentsProps> = (props) => {
    return (
        <List>
            {props.comments.map((comment, index) => (
                <Comment comment={comment} key={index} />
            ))}
        </List>
    );
};
