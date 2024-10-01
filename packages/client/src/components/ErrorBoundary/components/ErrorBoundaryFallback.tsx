import { Result, ResultProps } from "antd";

type ErrorBoundaryFallbackProps = ResultProps;

export function ErrorBoundaryFallback({
    children,
    ...other
}: ErrorBoundaryFallbackProps) {
    return (
        <Result
            status="error"
            title="Простите, что-то пошло не так..."
            subTitle="Попробуйте обновить страницу или повторите позже"
            {...other}
        >
            {children}
        </Result>
    );
}
