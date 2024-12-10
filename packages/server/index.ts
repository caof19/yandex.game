import dotenv from "dotenv";
import cors from "cors";
import express from "express";

import { sequelize } from "./config/db";

import { getBody } from "./middlewares/getBody";
import { checkAuth } from "./middlewares/checkAuth";

import { Comment } from "./models/Comment.model";
import { Reply } from "./models/Reply.model";
import { Topic } from "./models/Topic.model";
import { UserTheme } from "./models/UserTheme.model";
import { Themes } from "./models/Themes.model";

import { commentRouter } from "./routes/commentRoutes";
import { replyRouter } from "./routes/replyRoutes";
import { topicRouter } from "./routes/topicRoutes";
import { themesRouter } from "./routes/themesRouter";
import { userThemeRouter } from "./routes/userThemeRoutes";

import xssShield from "xss-shield/build/main/lib/xssShield";

dotenv.config();
const app = express();
app.use(cors());
app.use(xssShield());
const port = Number(process.env.SERVER_PORT) || 3001;

sequelize.addModels([Comment, Topic, Reply, Themes, UserTheme]);
sequelize.sync({ force: true });
app.use(getBody);
app.use(checkAuth);
app.use("/topics", topicRouter);
app.use("/comments", commentRouter);
app.use("/replies", replyRouter);
app.use("/themes", themesRouter);
app.use("/user/themes", userThemeRouter);

app.get("/user", (_, res) => {
    res.json({ name: "</script>Степа", secondName: "Степанов" });
});

app.get("/", (_, res) => {
    res.json("👋 Howdy from the server :)");
});

app.listen(port, () => {
    console.log(`  ➜ 🎸 Server is listening on port: ${port}`);
});
