import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { visualizer } from 'rollup-plugin-visualizer';
import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig(({ command, mode }) => {
  return {
    plugins: [
      react({
        // Include .tsx files in Fast Refresh
        include: '**/*.tsx',
      }),
      tailwindcss(),
      tsconfigPaths(),
      // Bundle analyzer (run with npm run build:analyze)
      mode === 'analyze' &&
        visualizer({
          filename: 'dist/stats.html',
          open: true,
          gzipSize: true,
          brotliSize: true,
        }),
    ].filter(Boolean),

    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
        '@app': path.resolve(__dirname, './src/app'),
        '@assets': path.resolve(__dirname, './src/assets'),
        '@components': path.resolve(__dirname, './src/components'),
        '@config': path.resolve(__dirname, './src/config'),
        '@features': path.resolve(__dirname, './src/features'),
        '@hooks': path.resolve(__dirname, './src/hooks'),
        '@lib': path.resolve(__dirname, './src/lib'),
        '@stores': path.resolve(__dirname, './src/stores'),
        '@styles': path.resolve(__dirname, './src/styles'),
        '@test': path.resolve(__dirname, './src/test'),
        '@types': path.resolve(__dirname, './src/types'),
        '@utils': path.resolve(__dirname, './src/utils'),
      },
    },

    // Development server configuration
    server: {
      port: 3000,
      open: true,
      cors: true,
    },

    // Build configuration
    build: {
      target: 'es2020',
      outDir: 'dist',
      sourcemap: command === 'serve',
      minify: 'esbuild',
      // Chunk splitting for better caching
      rollupOptions: {
        output: {
          manualChunks: {
            // Vendor chunks
            react: ['react', 'react-dom'],
            router: ['react-router-dom'],
            query: ['@tanstack/react-query'],
            ui: ['@radix-ui/react-slot', 'class-variance-authority'],
            // Feature chunks
            auth: ['src/features/auth'],
            dashboard: ['src/features/dashboard'],
          },
        },
      },
      // Increase chunk size warning limit
      chunkSizeWarningLimit: 1000,
    },

    // Preview configuration
    preview: {
      port: 3000,
      open: true,
    },

    // Environment variables
    define: {
      __APP_VERSION__: JSON.stringify(process.env.npm_package_version),
    },

    // Development optimizations
    optimizeDeps: {
      include: [
        'react',
        'react-dom',
        'react-router-dom',
        '@tanstack/react-query',
      ],
    },
  };
});
