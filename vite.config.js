import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [
    react(),

    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: [
        'favicon.ico',
        'icons/apple-touch-icon-180x180.png',
        'icons/apple-touch-icon-152x152.png',
        'icons/apple-touch-icon-120x120.png',
        'icons/apple-touch-icon-76x76.png',
      ],
      manifest: {
        name: 'Shuhnaty Transport Dashboard',
        short_name: 'Shuhnaty',
        description: 'Dashboard for Shuhnaty Transport management and operations.',
        icons: [
          {
            src: '/192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: '/512.png',
            sizes: '512x512',
            type: 'image/png',
          },
        ],
        start_url: '/',
        display: 'standalone',
        theme_color: '#DD7E1F',
        background_color: '#ffffff',
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,svg,png,ico}'],
        cleanupOutdatedCaches: true,
        clientsClaim: true,
      },
      devOptions: {
        enabled: false,
        navigateFallback: 'index.html',
        suppressWarnings: true,
        type: 'module',
      },
    }),
  ],
  base: '/',
  build: {
    outDir: 'dist',
    // assetsDir: 'assets',
    // assetsInlineLimit: 0,
  },
  // server: {
  //   proxy:
  //     process.env.NODE_ENV === 'development'
  //       ? {
  //           '/api': {
  //             target: 'http://137.184.61.215',
  //             changeOrigin: true,
  //             rewrite: (path) => path.replace(/^\/api/, ''),
  //           },
  //         }
  //       : undefined,
  // },
});
