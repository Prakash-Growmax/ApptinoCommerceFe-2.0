import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { visualizer } from 'rollup-plugin-visualizer';
import type { PluginOption } from 'vite';
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
      ...(mode === 'analyze'
        ? [
            visualizer({
              filename: 'dist/stats.html',
              open: true,
              gzipSize: true,
              brotliSize: true,
            }) as PluginOption,
          ]
        : []),
    ],

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
      proxy: {
        // Proxy API calls to intercept and modify headers
        '/api': {
          target: 'https://api.myapptino.com',
          changeOrigin: true,
          secure: false,
          rewrite: path => path.replace(/^\/api/, ''),
          configure: proxy => {
            proxy.on('proxyReq', (proxyReq, req) => {
              // Only modify Origin header for specific auth endpoints
              const authEndpointsWithCustomOrigin = [
                '/auth/auth/CheckUserName',
                '/auth/auth/loginNew'
              ];
              
              const isAuthEndpoint = authEndpointsWithCustomOrigin.some(endpoint => 
                req.url?.includes(endpoint)
              );
              
              if (isAuthEndpoint) {
                proxyReq.setHeader('Origin', 'schwingstetter.myapptino.com');
                console.log(
                  'Proxying auth request with custom origin:',
                  req.url
                );
              }
            });
          },
        },
      },
    },

    // Build configuration
    build: {
      target: 'es2020',
      outDir: 'dist',
      sourcemap: command === 'serve',
      minify: 'esbuild',
      cssMinify: true,
      // Enable CSS code splitting
      cssCodeSplit: true,
      // Enable asset inlining for small files
      assetsInlineLimit: 4096,
      // Chunk splitting for better caching
      rollupOptions: {
        output: {
          // Improved manual chunks for better caching
          manualChunks: id => {
            // Vendor chunks
            if (id.includes('node_modules')) {
              // React ecosystem
              if (id.includes('react') || id.includes('react-dom')) {
                return 'react-vendor';
              }
              // Router
              if (id.includes('react-router')) {
                return 'router-vendor';
              }
              // TanStack Query
              if (id.includes('@tanstack/react-query')) {
                return 'query-vendor';
              }
              // UI libraries
              if (id.includes('@radix-ui') || id.includes('lucide-react')) {
                return 'ui-vendor';
              }
              // Utilities
              if (id.includes('date-fns') || id.includes('clsx')) {
                return 'utils-vendor';
              }
              // Charts and visualization
              if (id.includes('recharts') || id.includes('framer-motion')) {
                return 'charts-vendor';
              }
              // Form libraries
              if (id.includes('react-hook-form') || id.includes('zod')) {
                return 'forms-vendor';
              }
              // Other vendors
              return 'vendor';
            }

            // Feature-based chunks
            if (id.includes('src/features/auth')) {
              return 'auth-feature';
            }
            if (id.includes('src/features/customer')) {
              return 'customer-feature';
            }
            if (id.includes('src/features/support')) {
              return 'support-feature';
            }
            if (id.includes('src/features/settings')) {
              return 'settings-feature';
            }

            // Component chunks
            if (id.includes('src/components/organisms')) {
              return 'organisms-components';
            }
            if (id.includes('src/components/molecules')) {
              return 'molecules-components';
            }
            if (id.includes('src/components/ui')) {
              return 'ui-components';
            }

            // Utils and stores
            if (id.includes('src/stores')) {
              return 'stores';
            }
            if (id.includes('src/utils')) {
              return 'utils';
            }
            if (id.includes('src/hooks')) {
              return 'hooks';
            }

            // Default for other files
            return undefined;
          },
          // Optimize chunk naming for better caching
          chunkFileNames: () => {
            return `js/[name]-[hash].js`;
          },
          assetFileNames: assetInfo => {
            if (/\.(css)$/.test(assetInfo.name || '')) {
              return 'css/[name]-[hash].[ext]';
            }
            if (/\.(png|jpe?g|gif|svg|webp|ico)$/.test(assetInfo.name || '')) {
              return 'images/[name]-[hash].[ext]';
            }
            if (/\.(woff2?|eot|ttf|otf)$/.test(assetInfo.name || '')) {
              return 'fonts/[name]-[hash].[ext]';
            }
            return 'assets/[name]-[hash].[ext]';
          },
        },
        // External dependencies that shouldn't be bundled
        external: [],
      },
      // Increase chunk size warning limit
      chunkSizeWarningLimit: 1000,
      // Enable brotli compression for better performance
      reportCompressedSize: true,
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
        'date-fns',
        'clsx',
        'zustand',
        '@radix-ui/react-slot',
        'class-variance-authority',
        'tailwind-merge',
      ],
      // Force optimization of certain packages
      force: command === 'serve',
    },

    // Performance optimizations
    esbuild: {
      // Remove console logs in production
      drop: command === 'build' ? ['console', 'debugger'] : [],
      // Enable JSX optimization
      jsx: 'automatic',
      // Target modern browsers for better performance
      target: 'es2020',
    },
  };
});
