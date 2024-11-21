import { FC, useCallback, useMemo, useState } from "react";

import { Flex } from "antd";

import addReactionIcon from "../../assets/svg/add-reaction.svg";

import { EmojiPicker } from "../../features/EmojiPicker";
import { reactionConvert } from "../../shared/helpers/reactionConvert";
import classes from "./Reaction.module.css";

export const Reaction: FC = () => {
    const [hasReaction, setHasReaction] = useState(false);
    const [isEmojiPickerOpen, setIsEmojiPickerOpen] = useState(false);
    const [reactions, setReactions] = useState<string[]>([]);

    const switchEmojiPicker = () =>
        setIsEmojiPickerOpen((prevState) => !prevState);

    const addReaction = useCallback(
        (reaction: string) => {
            setReactions((prevState) => [...prevState, reaction]);
            setHasReaction(true);
        },
        [reactions],
    );

    const displayReaction = useMemo(() => {
        const reactionCounts = reactionConvert(reactions);

        return Object.entries(reactionCounts).map(([emoji, count]) => (
            <Flex
                align="center"
                justify="center"
                key={emoji}
                className={classes.reactionItem}
            >
                <span>{emoji}</span>
                <span>{count > 1 ? count : ""}</span>
            </Flex>
        ));
    }, [reactions]);

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

                {hasReaction && (
                    <Flex className={classes.reaction} gap={5}>
                        {displayReaction}
                    </Flex>
                )}
            </Flex>
        </>
    );
};
