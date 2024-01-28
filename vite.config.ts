import react from "@vitejs/plugin-react-swc";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  plugins: [
    tsconfigPaths(),
    react({ plugins: [["@swc-jotai/react-refresh", {}]] }),
  ],
  define: {
    "process.env.IS_PREACT": JSON.stringify("true"),
  },

  worker: {
    format: "es",
  },
  base: mode === "production" ? "/excalidraw-pdf-splitter/" : "/",
}));
