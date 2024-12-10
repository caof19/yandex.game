import { Router } from "express";
import {
    createUserTheme,
    getUserTheme,
} from "../controllers/userThemeController";

const userThemeRouter = Router();

userThemeRouter.get("/:id", getUserTheme);
userThemeRouter.post("/:id", createUserTheme);

export { userThemeRouter };
