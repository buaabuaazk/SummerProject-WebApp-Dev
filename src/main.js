// import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import './assets/index.css'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import stores from './stores'
import _ from 'loadsh'
import axios from '@/utils/request'

//
const app = createApp(App)

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

app.use(pinia)
app.use(router)
app.config.globalProperties.$axios = axios
app.config.globalProperties.$stores = stores
app.config.globalProperties._ = _

app.mount('#app')
