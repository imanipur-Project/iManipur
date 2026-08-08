/// <reference types="vitest/config" />
import { defineConfig } from "vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { nitro } from "nitro/vite";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { storybookTest } from "@storybook/addon-vitest/vitest-plugin";
import { playwright } from "@vitest/browser-playwright";
const dirname =
  typeof __dirname !== "undefined" ? __dirname : path.dirname(fileURLToPath(import.meta.url));

// More info at: https://storybook.js.org/docs/next/writing-tests/integrations/vitest-addon
export default defineConfig({
  resolve: {
    tsconfigPaths: true,
  },
  server: {
    port: Number(process.env["PORT"]) || 3000,
  },
  preview: {
    port: Number(process.env["PORT"]) || 4173,
    host: true,
    // binds to 0.0.0.0 for Render
    allowedHosts: [".onrender.com"], // allow Render host
  },
  ssr: {
    // dompurify is browser-only; never bundle it into the SSR/Nitro server function.
    external: ["dompurify"],
    noExternal: [],
  },
  plugins: [
    tanstackStart({
      server: {
        entry: "./src/server.ts",
      },
    }),
    nitro(),
    viteReact(),
    tailwindcss(),
  ],
  test: {
    projects: [
      {
        extends: true,
        plugins: [
          // The plugin will run tests for the stories defined in your Storybook config
          // See options at: https://storybook.js.org/docs/next/writing-tests/integrations/vitest-addon#storybooktest
          storybookTest({
            configDir: path.join(dirname, ".storybook"),
          }),
        ],
        test: {
          name: "storybook",
          browser: {
            enabled: true,
            headless: true,
            provider: playwright({}),
            instances: [
              {
                browser: "chromium",
              },
            ],
          },
        },
      },
    ],
  },
});
