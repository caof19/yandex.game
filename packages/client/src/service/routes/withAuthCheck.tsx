import React from "react";
import { routes } from "./routeMap";
import { useAuth } from "@/service/hook";
import { Navigate } from "react-router-dom";

export const withAuthCheck = <T extends object>(
    WrappedComponent: React.ComponentType<T>,
) => {
    return function (props: T) {
        if (!useAuth()) {
            return <Navigate to={routes.signIn.path} />;
        }

        return <WrappedComponent {...props} />;
    };
};
