import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/lab': {
        target: 'http://192.168.147.154:5000',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/lab/, '/lab')
      },
      '/tests': {
        target: 'http://192.168.147.154:5000',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/tests/, '/tests')
      }
    }
  }
});
