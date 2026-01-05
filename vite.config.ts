import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    host: true,
    port: 4002,
    strictPort: true,
    proxy: {
      "/api": {
        target: "http://localhost:4030",
        changeOrigin: true,
        secure: false,
        rewrite: path => path.replace(/^\/api/, ""),
      },
    },
  },
});
