import { fileURLToPath, URL } from 'node:url';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import path from 'path'

export default defineConfig({
  base: './',
  build: {
    outDir: 'dist'
  },
  server: {
    hmr: { overlay: false }, // 为 false 可以禁用服务器错误遮罩层
    port: 3000,
    open: true,
    host: '0.0.0.0',
    proxy: {
      // 选项写法
      '/dev-api': {
        target: 'http://192.168.100.218:9900',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/dev-api/, '')
      },
    }
  },
  plugins: [
    vue(),
  ],
    resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      '~/': `${path.resolve(__dirname, 'src')}/`
    }
  },
  // resolve: {
  //   alias: {
  //     '@': fileURLToPath(new URL('./src', import.meta.url))
  //   }
  // },
  // 配置 Electron Builder 插件
  pluginOptions: {
    electronBuilder: {
      preload: 'src/preload.js'
    }
  }
});
