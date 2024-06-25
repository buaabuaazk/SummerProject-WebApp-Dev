/*
 * @Author: aliyun0459792885-nakAm 1308199540@qq.com
 * @Date: 2024-06-24 14:29:21
 * @LastEditors: aliyun0459792885-nakAm 1308199540@qq.com
 * @LastEditTime: 2024-06-25 10:25:15
 * @FilePath: /frontend/src/main.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
// import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

import App from './App.vue'
import router from './router'
import axios from 'axios'
import './assets/tailwind.css'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import stores from './stores'

if (import.meta.env.MODE === 'development') {
  axios.defaults.baseURL = ''
} else {
  axios.defaults.baseURL = '10.251.255.229'
}

const app = createApp(App)

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

app.use(pinia)
app.use(router)
app.use(ElementPlus)
app.config.globalProperties.$axios = axios
app.config.globalProperties.$stores = stores
app.mount('#app')
