/*
 * @Date: 2024-06-25 15:32:48
 * @Author: Q9K
 * @Description: 注册接口
 */
import axios from './request'

export default async function register({ name, email, password, password2, vcode }) {
  console.log(
    '🚀 ~ file: register.js:4 ~ register ~ username, email, password, password2:',
    name,
    email,
    password,
    password2,
    vcode
  )

  try {
    let res = await axios.post('/api/user/register', {
      username: name,
      email,
      password,
      password_2: password2,
      vcode
    })

    console.log('🚀 ~ file: register.js:27 ~ register ~ res:', res.data)

    return true
  } catch (error) {
    console.log('🚀 ~ file: register.js:12 ~ register ~ error:', error)
    return false
  }
}
