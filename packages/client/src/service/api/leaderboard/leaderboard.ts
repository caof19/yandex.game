import { API } from "..";
import {
    AddLeaderboardRequestArgs,
    GetAllLeaderboardRequestArgs,
} from "./types";

export const getLeaderboard = (data: GetAllLeaderboardRequestArgs) => {
    return API.post("/leaderboard/all", data);
};

export const addUserToLeaderboard = (data: AddLeaderboardRequestArgs) => {
    return API.post("/leaderboard", data);
};
