import { Redirect } from "react-router-dom";
import { routes } from "../../service";

export const DefaultPage = () => {
    return <Redirect to={routes.signIn.path} />;
};
