import { Topic } from "../models/Topic.model";

import { Request, Response } from "express";

export const createTopic = async (req: Request, res: Response) => {
    const topic = await Topic.create({ ...req.body });
    if (topic) {
        res.status(200).send(topic.toJSON());
    } else {
        res.status(500).send({
            message: "Something went wrong",
        });
    }
};

export const getAllTopics = async (_req: Request, res: Response) => {
    const topics = await Topic.findAll({
        include: { all: true, nested: true },
    });
    if (topics) res.status(200).json(topics);
    else
        res.status(500).json({
            message: "Something went wrong",
        });
};

export const getTopicById = async (req: Request, res: Response) => {
    const { id } = req.params;
    const topic = await Topic.findOne({
        where: { id: Number(id) },
        include: { all: true, nested: true },
    });
    if (topic) res.status(200).json(topic);
    else
        res.status(500).json({
            message: "Something went wrong",
        });
};
export const deleteTopic = async (req: Request, res: Response) => {
    const { id } = req.params;
    const topic = await Topic.findOne({ where: { id: Number(id) } });
    if (topic) {
        await topic.destroy();
        res.status(200).json({ status: "ok" });
    } else {
        res.status(500).json({
            message: "Something went wrong",
        });
    }
};
export const updateTopic = async (req: Request, res: Response) => {
    const { id } = req.params;
    const topic = await Topic.update(req.body, { where: { id: Number(id) } });
    if (topic) {
        res.status(200).json({ status: "ok" });
    } else {
        res.status(500).json({
            message: "Something went wrong",
        });
    }
};
