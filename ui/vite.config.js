import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// plugin-react only enables Fast Refresh for .js files when the raw code already
// references the JSX runtime (it can't know the file contains JSX otherwise).
// Our JSX lives in .js files, so append that hint as a trailing comment in dev.
// Babel then parses the JSX and injects refresh boundaries; esbuild (below) still
// performs the actual JSX transform.
const jsFastRefreshHint = {
  name: 'js-fast-refresh-hint',
  enforce: 'pre',
  apply: 'serve',
  transform(code, id) {
    if (/\/src\/.*\.js$/.test(id) && !id.includes('node_modules')) {
      return { code: code + '\n// react/jsx-runtime', map: null };
    }
  },
};

export default defineConfig({
  plugins: [jsFastRefreshHint, react()],
  server: {
    port: 3000, // keep CRA's dev port
    proxy: {
      '/api': 'http://localhost:1337', // replaces src/setupProxy.js
      // To connect to production backend. DON'T USE THIS IN DEV UNLESS YOU KNOW WHAT YOU'RE DOING
      // '/api': {
      //   target: 'https://hk.hmccglobal.org',
      //   changeOrigin: true,
      // },
    },
  },
  define: {
    // CRA injected PUBLIC_URL; assets are served from root, so it resolves to ''
    'process.env.PUBLIC_URL': '""',
  },
  // keep the existing REACT_APP_* env vars (ui/.env and the CI UI_ENV secret stay unchanged)
  envPrefix: 'REACT_APP_',
  build: {
    outDir: 'build', // CI moves ui/build/* → server/client
  },
  // JSX lives in .js files throughout src/ — transform without mass-renaming to .jsx.
  // NOTE: this esbuild recipe is why we pin Vite 7 — Vite 8 (Rolldown/Oxc) has no
  // documented equivalent yet. Renaming .js → .jsx is the real fix before Vite 8.
  esbuild: {
    loader: 'jsx',
    include: /src\/.*\.js$/,
    exclude: [], // default exclude is /\.js$/ — it would override include
  },
  optimizeDeps: {
    esbuildOptions: {
      loader: { '.js': 'jsx' },
    },
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/setupTests.js',
  },
});
