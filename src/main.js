/*
 * @Author: aliyun0459792885-nakAm 1308199540@qq.com
 * @Date: 2024-06-25 16:14:38
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2024-06-26 00:55:31
 * @FilePath: /frontend1/src/main.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
// import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import './assets/index.css'
import './assets/index.css'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import Antd from 'ant-design-vue'

//
const app = createApp(App)

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

app.use(pinia)
app.use(router)

app.use(Antd)
app.mount('#app')
