import { Request, Response } from "express";

import { Themes } from "../models/Themes.model";

export const getTheme = async (req: Request, res: Response) => {
    try {
        const { theme } = req.body;

        const searchTheme = await Themes.findOne({ where: { theme } });

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

export const createTheme = async (req: Request, res: Response) => {
    try {
        const createdTheme = await Themes.create({ ...req.body });

        res.status(200).json(createdTheme);
    } catch (error) {
        res.status(500).json({
            message: "Something went wrong",
        });
    }
};
