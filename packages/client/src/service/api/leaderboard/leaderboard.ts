import { AxiosResponse } from "axios";
import { API } from "..";
import {
    GetAllLeaderboardRequestArgs,
    GetAllLeaderoardResponse,
} from "./types";

export const getLeaderboard = (data: GetAllLeaderboardRequestArgs) => {
    return API.post("/leaderboard/all", data);
};
export const getUserScore = async (username: string) => {
    let userScore = 0;
    await getLeaderboard({
        ratingFieldName: "peachFillerScore",
        cursor: 0,
        limit: 100,
    }).then((response: AxiosResponse<GetAllLeaderoardResponse>) => {
        const userData = response.data.find(
            (responseItem) => responseItem.data.username === username,
        );
        if (userData) userScore = userData.data.peachFillerScore;
    });
    return userScore;
};
export const addUserToLeaderboard = async (username: string) => {
    const userScore = (await getUserScore(username)) + 1;
    const requestData = {
        data: {
            username,
            peachFillerScore: userScore,
        },
        ratingFieldName: "peachFillerScore",
    };
    return API.post("/leaderboard", requestData);
};
