import React from "react";
import ReactDOM from "react-dom/server";
import { Provider } from "react-redux";
import { Request as ExpressRequest } from "express";
import {
    createStaticHandler,
    createStaticRouter,
    StaticRouterProvider,
} from "react-router-dom/server";
import { configureStore } from "@reduxjs/toolkit";

import { createFetchRequest } from "./entry-server.utils";
import { reducer } from "./store";
import "./index.css";
import { routers } from "./pages";

export const render = async (req: ExpressRequest) => {
    const { query, dataRoutes } = createStaticHandler(routers);
    const fetchRequest = createFetchRequest(req);
    const context = await query(fetchRequest);

    if (context instanceof Response) {
        throw context;
    }

    const store = configureStore({
        reducer,
    });

    const router = createStaticRouter(dataRoutes, context);

    return {
        html: ReactDOM.renderToString(
            <Provider store={store}>
                <StaticRouterProvider router={router} context={context} />
            </Provider>,
        ),
        initialState: store.getState(),
    };
};
