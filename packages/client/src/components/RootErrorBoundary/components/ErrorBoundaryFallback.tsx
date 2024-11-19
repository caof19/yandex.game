import { Result, ResultProps } from "antd/lib";
import { ResultStatusType } from "antd/lib/result";
import { AxiosError } from "axios";
import { FallbackProps } from "react-error-boundary";

type ErrorBoundaryFallbackProps = ResultProps & FallbackProps;
const STATUSES: Record<string, ResultStatusType> = {
    403: "403",
    404: "404",
    500: "500",
};
const getStatusError = (status?: keyof typeof STATUSES) => {
    if (!status) return STATUSES["500"];

    return STATUSES[status] ?? STATUSES["500"];
};
const title = "Простите, что-то пошло не так...";
const subTitle = "Попробуйте обновить страницу или повторите позже";

export function ErrorBoundaryFallback({
    children,
    error,
    ...other
}: ErrorBoundaryFallbackProps) {
    const isAxiosError = error instanceof AxiosError;
    const status =
        isAxiosError && error.response
            ? getStatusError(`${error.response.status}`)
            : "error";

    return (
        <Result status={status} title={title} subTitle={subTitle} {...other}>
            {children}
        </Result>
    );
}
