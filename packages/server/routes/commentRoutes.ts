import {
    getAllComments,
    createComment,
} from "../controllers/commentController";
import { Router } from "express";

const commentRouter = Router();
commentRouter.put("/", createComment);
commentRouter.get("/:topic_id", getAllComments);
export { commentRouter };
