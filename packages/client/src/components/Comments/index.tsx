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

export const Comment = ({ comment }: TCommentProps) => {
    return (
        <List.Item>
            <Card title={comment.author} className={styles["comment-card"]}>
                <Flex justify="space-between">
                    <Typography.Text>{comment.text}</Typography.Text>
                    <Typography.Text>
                        {convertDate(comment.date)}
                    </Typography.Text>
                </Flex>
            </Card>
        </List.Item>
    );
};

export const Comments = ({ comments }: TCommentsProps) => {
    return (
        <List>
            {comments.map((comment, index) => (
                <Comment comment={comment} key={index} />
            ))}
        </List>
    );
};
