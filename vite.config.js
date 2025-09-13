import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "node:path";
import { ghPages } from "vite-plugin-gh-pages";

export default defineConfig({
  plugins: [vue(), ghPages()],
  base: process.env.NODE_ENV === "production" ? "/Manage/" : "/",
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src")
    }
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `
          @import "@/assets/main.scss";
        `
      }
    }
  }
});
