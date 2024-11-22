import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
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
  }
});
