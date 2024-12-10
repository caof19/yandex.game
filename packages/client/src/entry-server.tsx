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

import {
    createCache,
    extractStyle,
    StyleProvider,
} from "@ant-design/cssinjs/lib";

import { createFetchRequest } from "./entry-server.utils";
import { reducer } from "./store/index";
import "./index.css";
import { routers } from "./pages";

export const render = async (req: ExpressRequest) => {
    const { query, dataRoutes } = createStaticHandler(routers);
    const fetchRequest = createFetchRequest(req);
    const context = await query(fetchRequest);

    const cache = createCache();
    const styleText = extractStyle(cache);

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
                <StyleProvider cache={cache}>
                    <StaticRouterProvider router={router} context={context} />
                </StyleProvider>
            </Provider>,
        ),
        initialState: store.getState(),
        styles: {
            ant: styleText,
        },
    };
};
