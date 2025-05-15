
import { createApp } from 'vue'
import App from './App.vue'
import naive  from 'naive-ui';
import router from './router';


const app = createApp(App);
// 全局使用 naive-ui
app.use(naive);
app.use(router); // 安装路由
app.mount('#app');
