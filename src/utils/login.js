/*
 * @Date: 2024-06-23 12:23:59
 * @Author: Q9K
 * @Description: 登录接口
 */

import axios from './request'
import useTokenStore from '@/stores/useTokenStore'
const tokenStore = useTokenStore()
export default async function login(user_email, password) {
  console.log('🚀 ~ file: login.js:12 ~ login ~ user_email, password:', user_email, password)
  try {
    let res = await axios.post('/api/user/login', {
      username: user_email,
      password
    })

    console.log('🚀 ~ file: login.js:18 ~ login ~ res:', res)

    const token = res.data.access
    tokenStore.setToken(`Bearer ${token}`)
  } catch (error) {
    console.log('🚀 ~ file: login.js:20 ~ login ~ error:', error)
  }
}
