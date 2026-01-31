import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { join } from "path";

export default defineConfig({
  plugins: [react()],
  root: ".",
  publicDir: join(process.cwd(), "../../public"),
  build: {
    outDir: "dist",
    emptyOutDir: true,
  },
  server: {
    port: 5173,
  },
});
