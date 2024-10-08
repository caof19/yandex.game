import React, { PropsWithChildren } from "react";
import { Redirect } from "react-router-dom";
import { routes } from "./routeMap";
import Auth from "../user/Auth";

export const AuthGuard: React.FC<PropsWithChildren<any>> = ({ children }) => {
    const auth = new Auth();
    const authentificate = auth.getAuthStatus();

    if (!authentificate) {
        return <Redirect to={routes.signIn.path} />;
    }

    return children;
};
