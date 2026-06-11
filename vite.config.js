import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Vite emits to `dist/` by default, which matches the Vercel "Vite" preset.
export default defineConfig({
  plugins: [react()],
});
