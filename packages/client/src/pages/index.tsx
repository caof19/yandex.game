import { Route, Switch } from "react-router-dom";
import { routes } from "../service";
import { SingIn } from "./SignIn";
import { SingUp } from "./SignUp";
import { Profile } from "./Profile";
import { LeaderBoard } from "./LeaderBoard";
import { Game } from "./Game";
import { Forum } from "./Forum";
import { ServerError } from "./ServerError";
import { ClientError } from "./ClientError";
import { DefaultPage } from "./DefaultPage";
import { StartPage } from "./StartPage";

import { withAuthCheck } from "@/service/routes/withAuthCheck";
import { Topic } from "./Topic";
import { Login } from "@/pages/Login/Loign";

const GameWithAuthCheck = withAuthCheck(Game);
const ForumWithAuthCheck = withAuthCheck(Forum);
const ProfileWIthAuthCheck = withAuthCheck(Profile);
const TopicWithAuthCheck = withAuthCheck(Topic);

export const Routes = () => {
    return (
        <Switch>
            <Route path={routes.login.path} component={Login} />
            <Route path={routes.startPage.path} component={StartPage} />
            <Route path={routes.clientError.path} component={ClientError} />
            <Route path={routes.serverError.path} component={ServerError} />
            <Route path={routes.leaderBoard.path} component={LeaderBoard} />
            <Route path={routes.signIn.path} component={SingIn} />
            <Route path={routes.singUp.path} component={SingUp} />
            <Route path={routes.topic.path}>
                <TopicWithAuthCheck />
            </Route>
            <Route path={routes.forum.path}>
                <ForumWithAuthCheck />
            </Route>
            <Route path={routes.game.path}>
                <GameWithAuthCheck />
            </Route>
            <Route path={routes.profile.path}>
                <ProfileWIthAuthCheck />
            </Route>
            <Route path="*" component={DefaultPage} />
        </Switch>
    );
};
