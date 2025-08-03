import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

export default defineConfig({
  plugins: [react()],
  base: '/HueHotelAdmin/', 
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
        if (
          warning.code === 'MODULE_LEVEL_DIRECTIVE' ||
          warning.message.includes('iframe.js')
        ) {
          return;
        }
        warn(warning);
      },
    },
  },
});
