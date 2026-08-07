import { defineConfig } from "vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { nitro } from "nitro/vite";

export default defineConfig({
  resolve: {
    tsconfigPaths: true,
  },
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
  ],
});
