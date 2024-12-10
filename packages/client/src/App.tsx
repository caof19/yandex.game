import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./App.css";
import { ConfigProvider, theme } from "antd/lib";
import { RootErrorBoundary } from "./components";
import { Router } from "@remix-run/router";

import { routers } from "./pages";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setTheme } from "./store/slice/theme";

// TODO: Вынести от сюда
let browserRouter: Router;
if (typeof window !== undefined) {
    browserRouter = createBrowserRouter(routers);
}

export const router = browserRouter;

function App() {
    const dispatch = useDispatch();
    const isLightTheme = false;

    useEffect(() => {
        if (window) {
            const keyValue = localStorage.getItem("theme");

            if (keyValue) {
                const theme = keyValue;

                dispatch(setTheme(theme));
            } else {
                localStorage.setItem("theme", JSON.stringify("light"));
                dispatch(setTheme("light"));
            }
        }
    }, []);

    return (
        <RootErrorBoundary>
            <ConfigProvider
                theme={{
                    algorithm: isLightTheme
                        ? theme.compactAlgorithm
                        : theme.darkAlgorithm,
                }}
            >
                <RouterProvider router={router} />
            </ConfigProvider>
        </RootErrorBoundary>
    );
}

export default App;
