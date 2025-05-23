import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    chunkSizeWarningLimit: 2000, // 단위: KB (기본값: 500KB)
  },
  preview: {
    port: 4173, // 기본값
    host: true, // 외부 접근 허용
    allowedHosts: ["organizingui.onrender.com"], // <== 이 줄 추가
  },
  server: {
    allowedHosts: [
      "5173-blockblocky-organizingu-jebv23wrhdi.ws-us118.gitpod.io",
    ],
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
