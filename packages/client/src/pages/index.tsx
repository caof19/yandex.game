import { RouteObject, createBrowserRouter } from "react-router-dom";
import { routes } from "../service";
import { SingIn } from "./SignIn";
import { SingUp } from "./SignUp";
import { Profile } from "./Profile";
import { LeaderBoard } from "./LeaderBoard";
import { Game } from "./Game";
import { Login } from "./Login/Loign";
import { Forum } from "./Forum";
import { ServerError } from "./ServerError";
import { ClientError } from "./ClientError";
import { DefaultPage } from "./DefaultPage";
import { StartPage } from "./StartPage";

import { withAuthCheck } from "@/service/routes/withAuthCheck";
import { Topic } from "./Topic";
import { Layout } from "@/components";

const GameWithAuthCheck = withAuthCheck(Game);
const ForumWithAuthCheck = withAuthCheck(Forum);
const ProfileWIthAuthCheck = withAuthCheck(Profile);
const TopicWithAuthCheck = withAuthCheck(Topic);

// TODO: Вынести от сюда
export const routers: RouteObject[] = [
    {
        path: "/",
        Component: Layout,
        children: [
            { path: routes.startPage.path, Component: StartPage },

            { path: routes.clientError.path, Component: ClientError },
            { path: routes.serverError.path, Component: ServerError },
            { path: routes.login.path, Component: Login },
            { path: routes.leaderBoard.path, Component: LeaderBoard },

            { path: routes.signIn.path, Component: SingIn },
            { path: routes.singUp.path, Component: SingUp },

            { path: routes.topic.path, Component: TopicWithAuthCheck },
            { path: routes.forum.path, Component: ForumWithAuthCheck },

            { path: routes.game.path, Component: GameWithAuthCheck },

            { path: routes.profile.path, Component: ProfileWIthAuthCheck },
        ],
    },
    { path: "*", Component: DefaultPage },
];
