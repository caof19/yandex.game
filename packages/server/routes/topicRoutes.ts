import {
    getAllTopics,
    createTopic,
    getTopicById,
    deleteTopic,
    updateTopic,
} from "../controllers/topicController";
import { Router } from "express";

const topicRouter = Router();
topicRouter.get("/:id", getTopicById);
topicRouter.delete("/:id", deleteTopic);
topicRouter.patch("/:id", updateTopic);
topicRouter.get("/", getAllTopics);
topicRouter.put("/", createTopic);
export { topicRouter };
