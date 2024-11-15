import { fileURLToPath, URL } from 'node:url';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
  base: './',
  build: {
    outDir: 'dist'
  },
  server: {
    port: 3000
  },
  plugins: [
    vue(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  // 配置 Electron Builder 插件
  pluginOptions: {
    electronBuilder: {
      preload: 'src/preload.js'
    }
  }
});
