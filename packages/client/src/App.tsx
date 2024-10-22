import { Router } from "react-router-dom";
import "./App.css";
import { history } from "./service";
import { ConfigProvider, theme } from "antd";
import { Routes } from "./pages";
import { RootErrorBoundary } from "./components";
import { Layout } from "./components/Layout";

function App() {
    const isDark = false;

    return (
        <RootErrorBoundary>
            <Router history={history}>
                <ConfigProvider
                    theme={{
                        algorithm: isDark
                            ? theme.darkAlgorithm
                            : theme.compactAlgorithm,
                    }}
                >
                    <Layout>
                        <Routes />
                    </Layout>
                </ConfigProvider>
            </Router>
        </RootErrorBoundary>
    );
}

export default App;
