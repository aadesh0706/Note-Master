import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      "/api": "https://note-master-8g11.vercel.app",
    },
  },
  plugins: [react()],
  build: {
    outDir: 'dist'
  }
});
