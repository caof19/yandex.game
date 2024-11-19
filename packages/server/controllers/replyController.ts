import { Comment } from "../models/Comment.model";

import { Request, Response } from "express";
import { Reply } from "../models/Reply.model";

export const createReply = async (req: Request, res: Response) => {
    const { comment_id } = req.body;
    const comment = await Comment.findOne({ where: { id: comment_id } });
    if (comment) {
        const reply = await Reply.create({ ...req.body });
        if (reply) {
            res.status(200).json(reply);
        } else {
            res.status(500).send({
                message: "Something went wrong",
            });
        }
    }
};

export const deleteReply = async (req: Request, res: Response) => {
    const { id } = req.params;
    const reply = await Reply.findOne({ where: { id: Number(id) } });
    if (reply) {
        await reply.destroy();
        res.status(200).json({ status: "ok" });
    } else {
        res.status(500).json({
            message: "Something went wrong",
        });
    }
};
export const updateReply = async (req: Request, res: Response) => {
    const { id } = req.params;
    const reply = await Reply.update(req.body, {
        where: { id: Number(id) },
    });
    if (reply) {
        res.status(200).json({ status: "ok" });
    } else {
        res.status(500).json({
            message: "Something went wrong",
        });
    }
};
