// import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

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
app.config.globalProperties.$axios = axios
app.config.globalProperties.$stores = stores
app.mount('#app')
