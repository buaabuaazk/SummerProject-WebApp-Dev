import axios from 'axios'
import { baseURL, debug, DEBUGGING } from '@/config'
import { NotifyPlugin } from 'tdesign-vue-next'
import _ from 'loadsh'
let token = localStorage.getItem('token')
if (token) {
  token = JSON.parse(token)
  token = token.token
}

const instance = axios.create({
  baseURL:
    import.meta.env.MODE === 'development' ? 'http://100.92.185.35:8000' : 'http://10.251.255.229',
  timeout: 30000,
  headers: { Authorization: token }
})

function handleError(error) {
  let detail = undefined
  if (error.response) {
    detail = error.response.data
  } else if (error.request) {
    detail = error.request
  } else {
    detail = error.message
  }
  debug.log('🚀 ~ file: request.js:21 ~ handleError ~ detail:', detail)

  if (DEBUGGING) {
    NotifyPlugin.error({
      title: '请求错误',
      content: JSON.stringify(detail)
    })
  }
}
//请求拦截
instance.interceptors.request.use(
  (config) => {
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

instance.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    _.throttle(handleError(error), 3000, {
      leading: true,
      trailing: false
    })()
    return Promise.reject(error)
  }
)

export default instance
