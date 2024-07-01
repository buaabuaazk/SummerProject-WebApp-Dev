/*
 * @Author: aliyun0459792885-nakAm 1308199540@qq.com
 * @Date: 2024-07-01 10:39:59
 * @LastEditors: aliyun0459792885-nakAm 1308199540@qq.com
 * @LastEditTime: 2024-07-01 20:30:05
 * @FilePath: /frontend2/src/utils/request.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import axios from 'axios'
import { baseURL, debug, DEBUGGING } from '@/config'
import { NotifyPlugin } from 'tdesign-vue-next'
import _ from 'loadsh'

const getToken = () => {
  let token = localStorage.getItem('token')
  debug.log(token)
  if (token && token !== 'null') {
    token = JSON.parse(token)
    return token.token
  }
  return null
}

const instance = axios.create({
  baseURL: import.meta.env.MODE === 'development' ? 'http://10.251.255.229' : 'http://10.251.255.229',
  timeout: 30000,
  headers: { Authorization: getToken() }
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
    _.throttle(handleError, 3000, {
      leading: true,
      trailing: false
    })(error)
    return Promise.reject(error)
  }
)

export default instance
