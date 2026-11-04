import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';

// Builds the /events server renderer into server/ssr as CommonJS so the Sails
// process can require() it. Everything is bundled: server/node_modules has no
// React, Emotion or Chakra.
export default defineConfig({
  plugins: [tsconfigPaths(), react()],
  define: {
    'process.env.PUBLIC_URL': '""',
  },
  envPrefix: 'REACT_APP_',
  esbuild: {
    loader: 'jsx',
    include: /src\/.*\.js$/,
    exclude: [],
  },
  ssr: {
    noExternal: true,
  },
  build: {
    ssr: 'src/ssr/eventsEntry.js',
    outDir: '../server/ssr',
    emptyOutDir: true,
    copyPublicDir: false,
    minify: true,
    target: 'node20',
    rollupOptions: {
      output: {
        format: 'cjs',
        entryFileNames: 'events.cjs',
      },
    },
  },
  optimizeDeps: {
    esbuildOptions: {
      loader: { '.js': 'jsx' },
    },
  },
});
