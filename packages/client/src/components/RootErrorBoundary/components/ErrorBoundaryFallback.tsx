import { Result, ResultProps } from "antd";
import { ResultStatusType } from "antd/es/result";
import { AxiosError } from "axios";
import { FallbackProps } from "react-error-boundary";

type ErrorBoundaryFallbackProps = ResultProps & FallbackProps;

export function ErrorBoundaryFallback({
    children,
    error,
    ...other
}: ErrorBoundaryFallbackProps) {
    if (error instanceof AxiosError) {
        if (error.response) {
            const axiosStatus = `${error.response.status}`;
            const statuses: Record<string, ResultStatusType> = {
                403: "403",
                404: "404",
                500: "500",
            };
            const status = statuses[axiosStatus] ?? "500";

            return (
                <Result
                    status={status}
                    title="Простите, что-то пошло не так..."
                    subTitle="Попробуйте обновить страницу или повторите позже"
                    {...other}
                >
                    {children}
                </Result>
            );
        } else if (error.request) {
            return (
                <Result
                    status="500"
                    title="Простите, что-то пошло не так..."
                    subTitle="Попробуйте обновить страницу или повторите позже"
                    {...other}
                >
                    {children}
                </Result>
            );
        } else {
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
    }

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
