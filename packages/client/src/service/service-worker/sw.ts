import { precacheAndServeAssets } from "./precache";
import self from "./self";

const isProduction = import.meta.env.PROD;

if (isProduction) {
    precacheAndServeAssets();
}

self.addEventListener("install", (event) => {
    self.skipWaiting();
});

self.addEventListener("activate", (event) => {
    event.waitUntil(self.clients.claim());
});
