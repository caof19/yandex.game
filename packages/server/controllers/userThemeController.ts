import { Request, Response } from "express";

import { UserTheme } from "../models/UserTheme.model";

export const getUserTheme = async (req: Request, res: Response) => {
    try {
        const { userId } = req.body;

        const searchTheme = await UserTheme.findOne({ where: { userId } });

        if (searchTheme) {
            res.status(200).json(searchTheme);
            return;
        }

        res.status(404).json("Not Found");
    } catch (error) {
        res.status(500).json({
            message: "Something went wrong",
        });
    }
};

export const createUserTheme = async (req: Request, res: Response) => {
    try {
        const createdTheme = await UserTheme.create({ ...req.body });

        res.status(200).json(createdTheme);
    } catch (error) {
        res.status(500).json({
            message: "Something went wrong",
        });
    }
};
