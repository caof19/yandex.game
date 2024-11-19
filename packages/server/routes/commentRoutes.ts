import {
    getAllComments,
    createComment,
    deleteComment,
    updateComment,
} from "../controllers/commentController";
import { Router } from "express";

const commentRouter = Router();
commentRouter.put("/", createComment);
commentRouter.get("/:id", getAllComments);
commentRouter.delete("/:id", deleteComment);
commentRouter.patch("/:id", updateComment);
export { commentRouter };
