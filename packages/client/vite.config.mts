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
    ssr: {
        format: "cjs",
    },
    build: {
        outDir: path.join(__dirname, "dist/client"),
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
                            return "[name].js";
                        case "entry-server":
                            return "[name].js";
                        default:
                            return "assets/[name]-[hash].js";
                    }
                },
            },
        },
    },
    define: {
        __EXTERNAL_SERVER_URL__: JSON.stringify(
            process.env.EXTERNAL_SERVER_URL,
        ),
        __INTERNAL_SERVER_URL__: JSON.stringify(
            process.env.INTERNAL_SERVER_URL,
        ),
    },
    plugins: [react()],
});
