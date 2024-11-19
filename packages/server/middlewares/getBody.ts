import type { NextFunction, Request, Response } from "express";

export const getBody = (req: Request, _res: Response, next: NextFunction) => {
    let body = "";
    req.on("data", (chunk) => {
        body += chunk.toString();
    });
    req.on("end", () => {
        console.log(body);
        if (body) req.body = JSON.parse(body);
        next();
    });
};
