import { cleanupOutdatedCaches } from "workbox-precaching/cleanupOutdatedCaches";
import { registerRoute } from "workbox-routing";
import { NetworkFirst, StaleWhileRevalidate } from "workbox-strategies";

export function precacheAndServeAssets() {
    const origin = self.location.origin;

    registerRoute(
        ({ request }) => {
            return (
                (request.destination === "document" ||
                    request.mode === "navigate") &&
                request.url.startsWith(origin)
            );
        },
        new NetworkFirst({
            cacheName: "html",
        }),
    );
    registerRoute(
        ({ request }) => {
            const isApplicationAsset =
                request.destination === "script" &&
                request.url.includes("assets");

            // TODO: Тяжело читать это, отрефакторить
            return (
                (isApplicationAsset ||
                    ["style", "font", "image"].includes(request.destination) ||
                    request.url.endsWith(".svg") ||
                    request.url.includes("manifest")) &&
                request.url.startsWith(origin)
            );
        },
        new StaleWhileRevalidate({
            cacheName: "assets",
        }),
    );

    cleanupOutdatedCaches();
}
