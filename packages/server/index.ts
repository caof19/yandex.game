import dotenv from "dotenv";
import cors from "cors";
import express from "express";

import { sequelize } from "./config/db";

import { getBody } from "./middlewares/getBody";
import { checkAuth } from "./middlewares/checkAuth";

import { Comment } from "./models/Comment.model";
import { Reply } from "./models/Reply.model";
import { Topic } from "./models/Topic.model";

import { commentRouter } from "./routes/commentRoutes";
import { replyRouter } from "./routes/replyRoutes";
import { topicRouter } from "./routes/topicRoutes";
import xssShield from "xss-shield/build/main/lib/xssShield";
import { reactionRouter } from "./routes/reactionRoutes";
import { Reaction } from "./models/Reaction.model";

dotenv.config();
const app = express();
app.use(cors());
app.use(xssShield());
const port = Number(process.env.SERVER_PORT) || 3001;
sequelize.addModels([Comment, Topic, Reply, Reaction]);
sequelize.sync({ force: true });
app.use(getBody);
app.use(checkAuth);
app.use("/topics", topicRouter);
app.use("/comments", commentRouter);
app.use("/replies", replyRouter);
app.use("/reactions", reactionRouter);
app.listen(port, () => {
    console.log(`  ➜ 🎸 Server is listening on port: ${port}`);
});
