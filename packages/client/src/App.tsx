import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./App.css";
import { ConfigProvider, theme } from "antd/lib";
import { RootErrorBoundary } from "./components";
import { Router } from "@remix-run/router";

import { store } from "./store";
import { Provider } from "react-redux";
import { routers } from "./pages";

// TODO: Вынести от сюда
let browserRouter: Router;
if (typeof window !== undefined) {
    browserRouter = createBrowserRouter(routers);
}

export const router = browserRouter;

function App() {
    const isDark = false;

    return (
        <Provider store={store}>
            <RootErrorBoundary>
                <ConfigProvider
                    theme={{
                        algorithm: isDark
                            ? theme.darkAlgorithm
                            : theme.compactAlgorithm,
                    }}
                >
                    <RouterProvider router={router} />
                </ConfigProvider>
            </RootErrorBoundary>
        </Provider>
    );
}

export default App;
