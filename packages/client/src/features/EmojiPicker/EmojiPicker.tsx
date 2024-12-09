import { FC, useState } from "react";

import { Flex } from "antd";

import data from "./emojis-mock.json";

import classes from "./EmojiPicker.module.css";

type Props = {
    onClose: () => void;
    onEmojiClick: (emoji: string) => void;
};

export const EmojiPicker: FC<Props> = ({ onClose, onEmojiClick }) => {
    const [selectCategory, setSelectCategory] = useState("All");

    const categories = data.categories;
    const emojis = data.emojis;

    const filteredEmojis =
        selectCategory === "All"
            ? emojis
            : emojis.filter((emoji) => emoji.category === selectCategory) || [];

    const onReactionClick = (emoji: string) => {
        onEmojiClick(emoji);
    };

    return (
        <div className={classes.emojiPickerContainer} onClick={onClose}>
            <Flex vertical gap={20} className={classes.emojiPicker}>
                <Flex
                    gap={10}
                    justify="space-between"
                    className={classes.categories}
                >
                    <button
                        className={classes.category}
                        onClick={(event) => {
                            event.stopPropagation();
                            setSelectCategory("All");
                        }}
                    >
                        All
                    </button>
                    {categories.map((category) => {
                        return (
                            <button
                                className={classes.category}
                                key={category.categoryName}
                                onClick={(event) => {
                                    event.stopPropagation();
                                    setSelectCategory(category.categoryName);
                                }}
                            >
                                {category.symbol}
                            </button>
                        );
                    })}
                </Flex>
                <Flex gap={10} wrap>
                    {filteredEmojis.map((emoji) => {
                        return (
                            <button
                                key={emoji.code}
                                title={emoji.name}
                                className={classes.emoji}
                                onClick={() => onReactionClick(emoji.symbol)}
                            >
                                {emoji.symbol}
                            </button>
                        );
                    })}
                </Flex>
            </Flex>
        </div>
    );
};
