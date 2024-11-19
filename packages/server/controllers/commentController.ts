import { Topic } from "../models/Topic.model";
import { Comment } from "../models/Comment.model";

import { Request, Response } from "express";
import { Reply } from "../models/Reply.model";

export const createComment = async (req: Request, res: Response) => {
    const { topic_id } = req.body;
    const topic = await Topic.findOne({ where: { id: topic_id } });
    if (topic) {
        const comment = await Comment.create({ ...req.body });
        if (comment) {
            res.status(200).json(comment);
        } else {
            res.status(500).send({
                message: "Something went wrong",
            });
        }
    }
};

export const getAllComments = async (req: Request, res: Response) => {
    const { id } = req.params;
    const comments = await Comment.findAll({
        where: { id },
        include: [Reply],
    });
    if (comments) res.status(200).json(comments);
    else
        res.status(500).json({
            message: "Something went wrong",
        });
};

export const deleteComment = async (req: Request, res: Response) => {
    const { id } = req.params;
    const comment = await Comment.findOne({ where: { id: Number(id) } });
    if (comment) {
        await comment.destroy();
        res.status(200).json({ status: "ok" });
    } else {
        res.status(500).json({
            message: "Something went wrong",
        });
    }
};
export const updateComment = async (req: Request, res: Response) => {
    const { id } = req.params;
    const comment = await Comment.update(req.body, {
        where: { id: Number(id) },
    });
    if (comment) {
        res.status(200).json({ status: "ok" });
    } else {
        res.status(500).json({
            message: "Something went wrong",
        });
    }
};
