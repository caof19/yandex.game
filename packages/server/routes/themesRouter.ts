import { Router } from "express";
import { getTheme, createTheme } from "../controllers/themesController";

const themesRouter = Router();

themesRouter.get("/:id", getTheme);
themesRouter.post("/", createTheme);

export { themesRouter };
