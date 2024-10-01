import { useHistory } from "react-router-dom";
import style from "./DefaultPage.module.css";

export const DefaultPage = () => {
    const history = useHistory();

    return (
        <div className={style.wrapper}>
            <span className={style.big}>404</span>

            <button
                className={style.button}
                onClick={() => {
                    history.push("/auth/sign-in"); // Укажите путь к целевой странице
                }}
            >
                Вернуться на главную
            </button>
        </div>
    );
};
