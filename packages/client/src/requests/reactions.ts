import axios from "axios";

const rootApi = axios.create({
    baseURL: "http://localhost:3001",
    withCredentials: true,
});

type Reactions = {
    id: number;
    emoji: string;
    author: string;
    topic_id: number;
};

type ReactionsRequestConfig = AxiosRequestConfig<Reactions>;

class ReactionsRequests {
    private static baseUrl: string;

    constructor() {
        ReactionsRequests.baseUrl = "/reactions";
    }

    getReaction() {
        return rootApi.get<Reactions>(`${ReactionsRequests.baseUrl}`);
    }

    addReactions({ params, config }: ReactionsRequestConfig) {
        return rootApi.post(`${ReactionsRequests.baseUrl}`, params, config);
    }
}

export default ReactionsRequests;
