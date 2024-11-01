import { LeaderboardData } from "./models";

export interface GetAllLeaderboardRequestArgs {
    ratingFieldName: string;
    cursor: number;
    limit: number;
}
export interface AddLeaderboardRequestArgs {
    data: LeaderboardData;
    ratingFieldName: "peachFillerScore";
}
export type GetAllLeaderoardResponse = {
    data: LeaderboardData;
}[];
