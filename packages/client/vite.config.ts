import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import dotenv from "dotenv";
dotenv.config();
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "src"),
        },
    },
    server: {
        port: Number(process.env.CLIENT_PORT) || 3000,
        host: true,
        headers: {
            "Service-Worker-Allowed": "/",
        },
    },
    build: {
        rollupOptions: {
            input: {
                sw: path.resolve(
                    __dirname,
                    "/src/service/service-worker/sw.ts",
                ),
                index: path.resolve(__dirname, "index.html"),
            },
            output: {
                entryFileNames: (file) => {
                    switch (file.name) {
                        case "sw":
                            return `[name].js`;
                        case "index":
                            return `assets/index-[hash].js`;
                        default:
                            return `assets/[name]-[hash].js`;
                    }
                },
            },
        },
    },
    define: {
        __SERVER_PORT__: process.env.SERVER_PORT,
    },
    plugins: [react()],
});
