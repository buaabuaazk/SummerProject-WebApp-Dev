import axios from 'axios'

const instance = axios.create({
  baseURL:
    import.meta.env.MODE === 'development' ? 'http://8.130.25.189:8000' : 'http://10.251.255.229',
  timeout: 3000,
  headers: { Authorization: localStorage.getItem('token') }
})

export default instance
