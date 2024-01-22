import react from "@vitejs/plugin-react-swc";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [tsconfigPaths(), react()],
  define: {
    "process.env.IS_PREACT": JSON.stringify("true"),
  },
  build: {
    target: "esnext",
  },
});
