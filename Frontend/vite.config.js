import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';
import tailwindcss from "@tailwindcss/vite";
// TailwindCSS doesn't need a separate plugin if you're using PostCSS
// You don't need: import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [
    tailwindcss(),
    react(),
    tsconfigPaths(), // Optional, if you're using tsconfig paths
  ],
});
