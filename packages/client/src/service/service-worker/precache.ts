import { cleanupOutdatedCaches } from "workbox-precaching/cleanupOutdatedCaches";
import { registerRoute } from "workbox-routing";
import { NetworkFirst, StaleWhileRevalidate } from "workbox-strategies";
import self from "./self";

const isOriginRequest = (request: Request) => {
    const origin = self.location.origin;

    return request.url.startsWith(origin);
};

export function precacheAndServeAssets() {
    registerRoute(
        ({ request }) => {
            const isHTMLRequest =
                request.destination === "document" ||
                request.mode === "navigate";

            return isHTMLRequest && isOriginRequest(request);
        },
        new NetworkFirst({
            cacheName: "html",
        }),
    );
    registerRoute(
        ({ request }) => {
            const resources = ["style", "font", "image"];
            const isApplicationAsset =
                request.destination === "script" &&
                request.url.includes("assets");
            const isStyleFontOrImage = resources.includes(request.destination);
            const isSvgOrManifest =
                request.url.endsWith(".svg") ||
                request.url.includes("manifest");

            return (
                (isApplicationAsset || isStyleFontOrImage || isSvgOrManifest) &&
                isOriginRequest(request)
            );
        },
        new StaleWhileRevalidate({
            cacheName: "assets",
        }),
    );

    cleanupOutdatedCaches();
}
