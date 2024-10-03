import { ErrorBoundary } from "react-error-boundary";
import { ErrorBoundaryFallback } from "./components";
import { ReactNode } from "react";

type TRootBoundaryProps = {
    children: ReactNode;
};

export function RootErrorBoundary({ children }: TRootBoundaryProps) {
    return (
        <ErrorBoundary FallbackComponent={ErrorBoundaryFallback}>
            {children}
        </ErrorBoundary>
    );
}
