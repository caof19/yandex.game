import { Router } from "react-router-dom";
import "./App.css";
import { history } from "./service";
import { ConfigProvider, theme } from "antd";
import { Routes } from "./pages";

function App() {
    const isDark = false;

    return (
        <Router history={history}>
            <ConfigProvider
                theme={{
                    algorithm: isDark
                        ? theme.darkAlgorithm
                        : theme.compactAlgorithm,
                }}
            >
                <Routes />
            </ConfigProvider>
        </Router>
    );
}

export default App;
