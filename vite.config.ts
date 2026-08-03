import { defineConfig } from "vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import tsConfigPaths from "vite-tsconfig-paths";
import { nitro } from "nitro/vite";

export default defineConfig({
  server: {
    port: Number(process.env["PORT"]) || 3000,
  },
  preview: {
    port: Number(process.env["PORT"]) || 4173,
    host: true, // binds to 0.0.0.0 for Render
    allowedHosts: true, // allow any host on Render
  },
  plugins: [
    tanstackStart({ server: { entry: "./src/server.ts" } }),
    nitro(),
    viteReact(),
    tailwindcss(),
    tsConfigPaths(),
  ],
});
