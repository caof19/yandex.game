import {} from "react-router-dom";

export default function RootBoundary() {
    const error = useRouteError();
    const navigate = useNavigate();

    const refreshPage = () => navigate(0);

    if (isRouteErrorResponse(error)) {
        if (error.status === 404) {
            return (
                <ErrorBoundary
                    status={error.status}
                    sorry={"Страница не найдена"}
                    description={
                        "Страница которую вы пытаетесь открыть не существует."
                    }
                    buttonText={"Перейти на главную страницу"}
                    onRetry={() => navigate(Routes.HOME)}
                />
            );
        }

        if (error.status === 500) {
            return (
                <ErrorBoundary
                    status={error.status}
                    description={
                        "Наши сервера не смогли обработать ваш запрос. Попробуйте обновить страницу"
                    }
                    onRetry={refreshPage}
                />
            );
        }
    }

    if (error instanceof Error) {
        return (
            <ErrorBoundary description={error.message} onRetry={refreshPage} />
        );
    }

    return <ErrorBoundary onRetry={refreshPage} />;
}
