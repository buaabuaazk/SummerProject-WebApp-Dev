/*
 * @Date: 2024-06-23 12:23:59
 * @Author: Q9K
 * @Description: 登录接口
 */
import { DEBUGGING } from '@/config'
import axios from './request'
import useTokenStore from '@/stores/useTokenStore'
import useCurrentUserStore from '@/stores/useCurrentUserStore'
const tokenStore = useTokenStore()
const currentUserStore = useCurrentUserStore()
export default async function login(user_email, password) {
  console.log('🚀 ~ file: login.js:12 ~ login ~ user_email, password:', user_email, password)
  try {
    let res = await axios.post('/api/user/login', {
      username: user_email,
      password
    })

    if (DEBUGGING) {
      console.log('🚀 ~ file: login.js:18 ~ login ~ res:', res.data)
    }

    const token = res.data.access
    tokenStore.setToken(`Bearer ${token}`)
    res = await axios.get('/api/user/detail')
    if (DEBUGGING) {
      console.log('🚀 ~ file: login.js:18 ~ login ~ res:', res.data)
    }
    currentUserStore.setCurrentUser(res.data)
    return true
  } catch (error) {
    console.log('🚀 ~ file: login.js:20 ~ login ~ error:', error)
    return false
  }
}
