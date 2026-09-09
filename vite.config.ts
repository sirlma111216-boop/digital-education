import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { fileURLToPath, URL } from "node:url";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  build: {
    // Firebase SDK 는 단일 벤더 청크로 불가피하게 큼(gzip ~167KB). 경고 임계값만 상향.
    chunkSizeWarningLimit: 800,
    rollupOptions: {
      output: {
        // Split large vendors so no single chunk trips the 500kB warning
        // and repeat visits cache framework/markdown/supabase separately.
        manualChunks: {
          react: ["react", "react-dom", "react-router-dom"],
          firebase: ["firebase/app", "firebase/auth", "firebase/firestore"],
          markdown: ["react-markdown", "remark-gfm", "rehype-sanitize"],
        },
      },
    },
  },
});
