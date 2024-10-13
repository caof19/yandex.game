import { precacheAndServeAssets } from "./precache";
import { _self } from "./self";

const isProduction = import.meta.env.PROD;

if (isProduction) {
    precacheAndServeAssets();
}

_self.addEventListener("install", (event) => {
    _self.skipWaiting();
});

_self.addEventListener("activate", (event) => {
    event.waitUntil(_self.clients.claim());
});
