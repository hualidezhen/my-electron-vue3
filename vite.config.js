import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "path";

export default defineConfig({
  base: "./",
  build: {
    outDir: "dist",
  },
  server: {
    hmr: { overlay: false }, // 为 false 可以禁用服务器错误遮罩层
    port: 3000,
    open: true,
    host: "0.0.0.0",
    define: {
      "process.env": process.env, // 使环境变量在应用中可用
    },
    // proxy: {
    //   // 选项写法
    //   '/dev-api': {
    //     target: 'http://192.168.100.218:9900',
    //     changeOrigin: true,
    //     rewrite: (path) => path.replace(/^\/dev-api/, '')
    //   },
    //         '/prod-api': {
    //     target: 'http://192.168.100.218:9900',
    //     // target: 'http://192.168.1.62:8001',
    //     changeOrigin: true,
    //     // ws: true,
    //     rewrite: (path) => path.replace(/^\/prod-api/, '')
    //   },
    // }
  },
  plugins: [vue()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
      "~/": `${path.resolve(__dirname, "src")}/`,
    },
  },
  // resolve: {
  //   alias: {
  //     '@': fileURLToPath(new URL('./src', import.meta.url))
  //   }
  // },
  // 配置 Electron Builder 插件
  pluginOptions: {
    electronBuilder: {
      preload: "electron/preload.cjs",
    },
  },
});
