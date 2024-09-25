import { Route, Switch } from "react-router-dom";
import { routes, AuthGuard } from "../service";
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

export const Routes = () => {
    return (
        <Switch>
            <Route path={routes.startPage.path} component={StartPage} />
            <Route path={routes.clientError.path} component={ClientError} />
            <Route path={routes.serverError.path} component={ServerError} />
            <Route path={routes.leaderBoard.path} component={LeaderBoard} />
            <Route path={routes.signIn.path} component={SingIn} />
            <Route path={routes.singUp.path} component={SingUp} />
            <Route path={routes.forum.path}>
                <AuthGuard>
                    <Forum />
                </AuthGuard>
            </Route>
            <Route path={routes.game.path}>
                <AuthGuard>
                    <Game />
                </AuthGuard>
            </Route>
            <Route path={routes.profile.path}>
                <AuthGuard>
                    <Profile />
                </AuthGuard>
            </Route>
            <Route path="*" component={DefaultPage} />
        </Switch>
    );
};
