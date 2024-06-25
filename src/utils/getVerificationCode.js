import axios from './request'
async function getVerificationCode(email) {
  let res = await axios.post('/api/user/vcode', {
    email
  })
  const data = res.data
  console.log('🚀 ~ file: getVerificationCode.js:8 ~ getVerificationCode ~ data:', data)
}

export default getVerificationCode
