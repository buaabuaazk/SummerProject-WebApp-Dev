/*
 * @Date: 2024-06-23 12:23:59
 * @Author: Q9K
 * @Description: 登录接口
 */
import { DEBUGGING } from '@/config'
import { debug } from '@/config'
import axios from './request'
import useTokenStore from '@/stores/useTokenStore'
import useCurrentUserStore from '@/stores/useCurrentUserStore'
const tokenStore = useTokenStore()
const currentUserStore = useCurrentUserStore()
export default async function login(user_email, password) {
  try {
    let res = await axios.post('/api/user/login', {
      username: user_email,
      password
    })

    debug.log('🚀 ~ file: login.js:20 ~ login ~ res:', res.data)

    const token = res.data.access
    tokenStore.setToken(`Bearer ${token}`)
    res = await axios.get('/api/user/detail', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    debug.log('🚀 ~ file: login.js:25 ~ login ~ res:', res.data)
    currentUserStore.setCurrentUser(res.data)
    return true
  } catch (error) {
    debug.log('🚀 ~ file: login.js:20 ~ login ~ error:', error)
    return false
  }
}
