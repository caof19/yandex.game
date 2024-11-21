export const reactionConvert = (reaction: string[]): Record<string, number> => {
    const reactionWithInfo: Record<string, number> = {};

    reaction.forEach((emoji) => {
        if (emoji in reactionWithInfo) {
            reactionWithInfo[emoji] += 1;
        } else {
            reactionWithInfo[emoji] = 1;
        }
    });

    return reactionWithInfo;
};
