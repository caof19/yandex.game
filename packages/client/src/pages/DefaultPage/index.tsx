import { useNavigate } from "react-router-dom";
import style from "./DefaultPage.module.css";
import { routes } from "@/service";

export const DefaultPage = () => {
    const navigate = useNavigate();

    return (
        <div className={style.wrapper}>
            <span className={style.big}>404</span>

            <button
                className={style.button}
                onClick={() => {
                    navigate(routes.signIn.path);
                }}
            >
                Вернуться на главную
            </button>
        </div>
    );
};
