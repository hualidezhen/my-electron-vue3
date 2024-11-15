
import { createApp } from 'vue'
import App from './App.vue'
import './assets/styles/global.less'
import naive from 'naive-ui';


const app = createApp(App);
// 全局使用 naive-ui
app.use(naive);
app.mount('#app');
