import './assets/main.css'

import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import OpenLayersMap from "vue3-openlayers";
import "vue3-openlayers/styles.css";
// json可视化
import VueJsonPretty from 'vue-json-pretty';
import 'vue-json-pretty/lib/styles.css';
// pinia
import { createPinia } from 'pinia';
import App from './App.vue'
// 引入中英语言包
import i18n from './lang/index'  
// 创建 Pinia 实例
const pinia = createPinia();
const app = createApp(App)

app.use(i18n);
// 将 Pinia 安装到 Vue 应用中
app.use(pinia);
app.use(ElementPlus)
app.use(OpenLayersMap);
export default {
    components: {
      VueJsonPretty
    }
  };
  
app.mount('#app')
