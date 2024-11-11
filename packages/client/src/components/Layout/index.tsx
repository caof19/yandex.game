import { Space, Typography } from "antd/lib";
import styles from "./styles.module.css";
import peachIcon from "@/assets/svg/peach.svg";
import { useAuth } from "@/service/hook";
import { relativeRoutes } from "@/service/routes/routeMap";
import { Link, Outlet } from "react-router-dom";

export const Layout = () => {
    const isAuthenticated = useAuth();
    return (
        <div className={styles.page}>
            <div className={styles.container}>
                <div className={styles.content}>
                    <header className={styles.header}>
                        <Space align="center">
                            <img src={peachIcon} className={styles.logo} />
                            <Typography.Title>PeachesFiller</Typography.Title>
                        </Space>
                        <nav className={styles.nav}>
                            {isAuthenticated ? (
                                <>
                                    <Link
                                        to={relativeRoutes.game.path}
                                        className={styles.link}
                                    >
                                        Играть
                                    </Link>
                                    <Link
                                        to={relativeRoutes.startPage.path}
                                        className={styles.link}
                                    >
                                        Описание
                                    </Link>
                                    <Link
                                        to={relativeRoutes.leaderBoard.path}
                                        className={styles.link}
                                    >
                                        Лидеры
                                    </Link>
                                    <Link
                                        to={relativeRoutes.forum.path}
                                        className={styles.link}
                                    >
                                        Форум
                                    </Link>
                                    <Link
                                        to={relativeRoutes.profile.path}
                                        className={styles.link}
                                    >
                                        Профиль
                                    </Link>
                                </>
                            ) : (
                                <>
                                    <Link
                                        to={`${relativeRoutes.auth.path}${relativeRoutes.singUp.path}`}
                                        className={styles.link}
                                    >
                                        Регистрация
                                    </Link>
                                    <Link
                                        to={`${relativeRoutes.auth.path}${relativeRoutes.signIn.path}`}
                                        className={styles.link}
                                    >
                                        Вход
                                    </Link>
                                </>
                            )}
                        </nav>
                    </header>
                    <Outlet />
                </div>
            </div>
        </div>
    );
};
