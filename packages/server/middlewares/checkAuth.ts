import type { NextFunction, Request, Response } from "express";

export const checkAuth = (
    _req: Request,
    _res: Response,
    next: NextFunction,
) => {
    //TODO
    next();
};
