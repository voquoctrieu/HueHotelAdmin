import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: process.env.NODE_ENV === 'production' ? '/HueHotelAdmin/' : '/',
  optimizeDeps: {
    include: ['date-fns'],
  },
  server: {
    port: 5173,
    host: true,
  },
  build: {
    rollupOptions: {
      onwarn(warning, warn) {
        // Bỏ qua các cảnh báo về iframe.js
        if (warning.code === 'MODULE_LEVEL_DIRECTIVE' || 
            warning.message.includes('iframe.js')) {
          return;
        }
        warn(warning);
      }
    }
  }
});
