import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Load env file based on `mode` in the current working directory.
  // Set the third parameter to '' to load all env regardless of the `VITE_` prefix.
  const env = loadEnv(mode, process.cwd(), '');

  return {
    plugins: [react()],
    build: {
      target: 'es2015',
      outDir: 'dist',
      assetsDir: 'assets',
      chunkSizeWarningLimit: 800,
      rollupOptions: {
        output: {
          manualChunks(id) {
            // Vendor chunk
            if (id.includes('node_modules')) {
              if (id.includes('react') || 
                  id.includes('lucide-react') || 
                  id.includes('@supabase/supabase-js')) {
                return 'vendor';
              }
            }
            
            // Auth chunk
            if (id.includes('components/auth')) {
              return 'auth';
            }
            
            // Settings chunk
            if (id.includes('components/settings')) {
              return 'settings';
            }
            
            // Default chunk
            return undefined;
          },
          entryFileNames: 'assets/[name].[hash].js',
          chunkFileNames: 'assets/[name].[hash].js',
          assetFileNames: 'assets/[name].[hash].[ext]'
        }
      }
    },
    server: {
      port: 5173,
      strictPort: true,
      host: true
    },
    // Define env variables to be replaced in the build
    define: {
      'process.env.VITE_SUPABASE_URL': JSON.stringify(env.VITE_SUPABASE_URL),
      'process.env.VITE_SUPABASE_ANON_KEY': JSON.stringify(env.VITE_SUPABASE_ANON_KEY),
      'process.env.VITE_STRIPE_PUBLIC_KEY': JSON.stringify(env.VITE_STRIPE_PUBLIC_KEY),
      'process.env.VITE_PERPLEXITY_API_KEY': JSON.stringify(env.VITE_PERPLEXITY_API_KEY),
      'process.env.VITE_STRIPE_PAYMENT_LINK': JSON.stringify(env.VITE_STRIPE_PAYMENT_LINK)
    }
  };
});
