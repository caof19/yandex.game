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
         * Временное решение, потом состояние будет браться из Redux
         * По хорошему можно вообще сделать, чтоб неавторизованному пользователю на любой странице возвращать авторизацию, а при авторизации менять состояние и показывать компонент
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
