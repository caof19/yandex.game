import { useHistory } from "react-router-dom";
import style from "./ServerError.module.css";

export const ServerError = () => {
    const history = useHistory();

    return (
        <div className={style.wrapper}>
            <span className={style.big}>500</span>
        </div>
    );
};
