import React, { PropsWithChildren } from "react";
import { Redirect } from "react-router-dom";
import { routes } from "./routeMap";
import Auth from "../user/Auth";

export const withAuthCheck = <T extends object>(
    WrappedComponent: React.ComponentType<T>,
) => {
    return function (props: T) {
        /**
         *
         * Временное решение, потом состояние будет браться и заносится в Redux
         *
         */
        const auth = new Auth();
        const isAuth = auth.getAuthStatus();

        if (!isAuth) {
            return <Redirect to={routes.signIn.path} />;
        }

        return <WrappedComponent {...props} />;
    };
};
