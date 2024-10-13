import React from "react";
import { Redirect } from "react-router-dom";
import { routes } from "./routeMap";
import { useAuth } from "@/service/hook";

export const withAuthCheck = <T extends object>(
    WrappedComponent: React.ComponentType<T>,
) => {
    return function (props: T) {
        if (!useAuth()) {
            return <Redirect to={routes.signIn.path} />;
        }

        return <WrappedComponent {...props} />;
    };
};
