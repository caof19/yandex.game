import { Topic } from "../models/Topic.model";
import { Request, Response } from "express";
import { Reaction } from "../models/Reaction.model";

export const addReaction = async (req: Request, res: Response) => {
    const { topic_id } = req.body;
    const topic = await Topic.findOne({ where: { id: topic_id } });
    if (topic) {
        const reaction = await Reaction.create({ ...req.body });
        if (reaction) {
            res.status(201).json(reaction);
        } else {
            res.status(500).send({
                message: "Something went wrong",
            });
        }
    }
};

export const deleteReaction = async (req: Request, res: Response) => {
    const { id } = req.params;
    const reaction = await Reaction.findOne({ where: { id: Number(id) } });
    if (reaction) {
        await reaction.destroy();
        res.status(200);
    } else {
        res.status(500).json({
            message: "Something went wrong",
        });
    }
};
