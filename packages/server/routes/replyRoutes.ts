import {
    deleteReply,
    createReply,
    updateReply,
} from "../controllers/replyController";
import { Router } from "express";

const replyRouter = Router();

replyRouter.put("/", createReply);
replyRouter.delete("/:id", deleteReply);
replyRouter.patch("/:id", updateReply);

export { replyRouter };
