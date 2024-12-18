import path from "path"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

export default defineConfig({
  css: {
    preprocessorOptions: {
      tailwindcss: {
        config: "./tailwind.config.cjs", // or `tailwind.config.ts`
      },
    },
  },
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})
