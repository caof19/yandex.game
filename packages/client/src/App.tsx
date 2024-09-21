import { useEffect } from "react";
import { Router } from "react-router-dom";
import "./App.css";
import { history } from "./service";
import { ConfigProvider, theme } from "antd";

function App() {
    useEffect(() => {
        const fetchServerData = async () => {
            const url = `http://localhost:${__SERVER_PORT__}`;
            const response = await fetch(url);
            const data = await response.json();
            console.log(data);
        };

        fetchServerData();
    }, []);

    const isDark = Math.random() > 0.5;

    return (
        <Router history={history}>
            <ConfigProvider
                theme={{
                    algorithm: isDark
                        ? theme.darkAlgorithm
                        : theme.compactAlgorithm,
                }}
            >
                <div className="App">Вот тут будет жить ваше приложение :)</div>
            </ConfigProvider>
        </Router>
    );
}

export default App;
