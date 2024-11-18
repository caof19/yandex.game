import { addReaction } from "../controllers/reactionController";
import { Router } from "express";
import { deleteReaction } from "../controllers/reactionController";

const reactionRouter = Router();
reactionRouter.post("/", addReaction);
reactionRouter.delete("/:id", deleteReaction);

export { reactionRouter };
