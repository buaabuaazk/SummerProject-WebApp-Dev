/*
 * @Date: 2024-06-25 11:05:50
 * @Author: Q9K
 * @Description: 提交简历接口
 */
import axios from './request'
import qs from 'qs'
import commonToast from './commonToast'
async function submitResume(job_id) {
  console.log('🚀 ~ file: submitResume.js:4 ~ submitResume ~ job_id:', job_id)

  try {
    let res = await axios.post(
      '/api/recruit/upload_resume',
      qs.stringify({
        recruit_id: job_id
      })
    )
    const data = res.data

    console.log('🚀 ~ file: submitResume.js:20 ~ submitResume ~ data:', data)
    commonToast('success', 'Resume submitted successfully')
  } catch (error) {
    console.log('🚀 ~ file: submitResume.js:11 ~ submitResume ~ error:', error)
  }
}

export default submitResume
