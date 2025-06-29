import { TanStackRouterVite } from "@tanstack/router-plugin/vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { visualizer } from "rollup-plugin-visualizer";
import { defineConfig } from "vite";

export default defineConfig(({ mode }) => {
  return {
    plugins: [TanStackRouterVite(), react()],
    server: {
      host: "0.0.0.0", // ←重要: 外部からアクセス可能に
      port: 3000,
      strictPort: true,
      watch: {
        usePolling: true, // ←重要: Dockerではファイル監視にポーリングが必要
        interval: 100, // オプション: ポーリング間隔（デフォルトより短めに）
      },
      hmr: {
        protocol: "ws", // WebSocketを使用
        host: "localhost", // または "127.0.0.1" あるいは `"0.0.0.0"`
        port: 3000,
      },
    },
    resolve: {
      alias: {
        "~": path.resolve(__dirname, "src"),
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
