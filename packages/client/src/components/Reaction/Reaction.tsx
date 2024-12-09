import { useMemo, useState, Dispatch, useEffect, useCallback } from "react";

import { Flex } from "antd";

import addReactionIcon from "../../assets/svg/add-reaction.svg";

import { EmojiPicker } from "../../features/EmojiPicker";
import classes from "./Reaction.module.css";
import React from "react";
import { BaseApi } from "@/service";
import { useUsername } from "@/service/hook";

export type TReaction = {
    id: number;
    emoji: string;
    author: string;
    topic_id: number;
};

export type TCreateReaction = {
    emoji: string;
    author: string;
    topic_id: number;
};

export const Reactions = (props: {
    setUpdate: Dispatch<React.SetStateAction<boolean>>;
    reactions: TReaction[];
    topic_id: number;
}) => {
    const [isEmojiPickerOpen, setIsEmojiPickerOpen] = useState(false);
    const [reactions, setReactions] = useState<TReaction[]>(props.reactions);
    const username = useUsername();
    const switchEmojiPicker = () =>
        setIsEmojiPickerOpen((prevState) => !prevState);

    const addReaction = async (reaction: string) => {
        await BaseApi.post("/api/reactions", {
            emoji: reaction,
            author: username,
            topic_id: props.topic_id,
        });
        props.setUpdate(true);
    };

    const deleteReaction = async (emoji: string) => {
        const reaction = reactions.find(
            (x) => x.emoji === emoji && x.author === username,
        );
        await BaseApi.delete(`/api/reactions/${reaction?.id}`);
        props.setUpdate(true);
    };

    useEffect(() => {
        setReactions(props.reactions);
    }, [props.reactions]);

    return (
        <>
            <Flex gap={10}>
                <Flex
                    justify="center"
                    align="center"
                    className={classes.reactionContainer}
                >
                    <img
                        src={addReactionIcon}
                        className={classes.addReaction}
                        onClick={switchEmojiPicker}
                    />

                    {isEmojiPickerOpen && (
                        <EmojiPicker
                            onClose={() => setIsEmojiPickerOpen(false)}
                            onEmojiClick={addReaction}
                        />
                    )}
                </Flex>
                <Flex className={classes.reaction} gap={5}>
                    {Object.entries(
                        reactions.reduce((acc, curr) => {
                            acc[curr.emoji] = (acc[curr.emoji] || 0) + 1;
                            return acc;
                        }, {} as { [key: string]: number }),
                    ).map(([key, value]) => (
                        <Flex
                            align="center"
                            justify="center"
                            key={key}
                            className={classes.reactionItem}
                        >
                            <span
                                onClick={async () => await deleteReaction(key)}
                            >
                                {key}
                            </span>
                            <span>{value > 1 ? value : ""}</span>
                        </Flex>
                    ))}
                </Flex>
            </Flex>
        </>
    );
};
