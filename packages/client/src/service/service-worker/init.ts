export const init = () => {
    if ("serviceWorker" in navigator) {
        window.addEventListener("load", () => {
            const isProduction = import.meta.env.PROD;
            const swPath = isProduction
                ? "/sw.js"
                : "/src/service/service-worker/sw.ts";

            navigator.serviceWorker
                .register(swPath, {
                    type: "module",
                    scope: "/",
                })
                .then((registration) => {
                    registration.update();
                })
                .catch(console.log);
        });
    }
};

init();
