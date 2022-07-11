import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
const app = createApp({})
// 挂载全局
// app.config.globalProperties.echarts = echarts
createApp(App).use(router).mount('#app')