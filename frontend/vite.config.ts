import { TanStackRouterVite } from "@tanstack/router-plugin/vite";
import { visualizer } from "rollup-plugin-visualizer";
import { defineConfig } from "vite";

export default defineConfig(({ mode }) => {
  return {
    plugins: [TanStackRouterVite()],
    server: {
      host: true,
      port: 3000,
      hmr: {
        host: "host.docker.internal",
        protocol: "ws",
        port: 3000,
      },
    },
    resolve: {
      alias: {
        "~": "./",
      },
    },
    css: {
      preprocessorOptions: {
        scss: {
          api: "modern-compiler",
        },
        sass: {
          api: "modern-compiler",
        },
      },
    },
    build: {
      //sourcemap: true,
      rollupOptions: {
        plugins: [
          mode === "analyze" &&
            visualizer({
              open: true,
              filename: "stats.html",
              gzipSize: true,
              brotliSize: true,
            }),
        ],
        output: {
          manualChunks: {
            mainVendor: [
              "react",
              "react-dom",
              "@tanstack/react-form",
              "@tanstack/react-query",
              "@tanstack/react-router",
              "@mui/icons-material",
              "@mui/material",
              "axios",
              "zod",
            ],
          },
        },
      },
    },
  };
});
