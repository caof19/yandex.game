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

dotenv.config({ path: "../../.env" });
const app = express();
app.use(cors());
app.use(xssShield());
const port = Number(process.env.SERVER_PORT) || 3001;

const db = sequelize();
db.addModels([Comment, Topic, Reply]);
db.sync({ force: true });
app.use(getBody);
app.use(checkAuth);
app.use("/topics", topicRouter);
app.use("/comments", commentRouter);
app.use("/replies", replyRouter);

app.get("/user", (_, res) => {
    res.json({ name: "</script>Степа", secondName: "Степанов" });
});

app.get("/", (_, res) => {
    res.json("👋 Howdy from the server :)");
});

app.listen(port, () => {
    console.log(`  ➜ 🎸 Server is listening on port: ${port}`);
});
