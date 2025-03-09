import { defineConfig } from "vite";
import laravel from "laravel-vite-plugin";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "./resources/js"),
            "@public": path.resolve(__dirname, "public"),
        },
    },
    plugins: [
        laravel({
            input: ["resources/css/app.css", "resources/js/app.js"],
            refresh: true,
        }),
        tailwindcss(),
        react({ include: /\.(js|jsx|ts|tsx)$/ }),
    ],
});
