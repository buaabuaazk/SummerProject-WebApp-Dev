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
      name,
      email,
      password,
      password2,
      vcode
    })
  } catch (error) {
    console.log('🚀 ~ file: register.js:12 ~ register ~ error:', error)
  }
}
