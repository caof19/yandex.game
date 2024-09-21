import React, { PropsWithChildren } from "react";
import { Redirect } from "react-router-dom";
import { routes } from "./routeMap";

export const AuthGuard: React.FC<PropsWithChildren<any>> = ({ children }) => {
    const authentificate = true;

    if (!authentificate) {
        return <Redirect to={routes.signIn.path} />;
    }

    return children;
};
