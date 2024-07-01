/*
 * @Author: aliyun0459792885-nakAm 1308199540@qq.com
 * @Date: 2024-06-25 16:14:38

 * @FilePath: /frontend1/src/main.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */

import App from './App.vue'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import router from './router'
import ElementPlus from 'element-plus'
import Antd from 'ant-design-vue'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import './assets/index.css'
// import 'naive-chat/dist/style.css'
// import '@/assets/naive-chat.css'
import 'element-plus/dist/index.css'
import 'vfonts/Lato.css'

//
const app = createApp(App)
const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)
app.use(pinia)
app.use(router)

app.use(ElementPlus)
app.use(Antd)
app.mount('#app')
