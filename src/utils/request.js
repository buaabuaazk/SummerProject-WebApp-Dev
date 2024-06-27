import axios from 'axios'
import { useToast } from '@/components/ui/toast/use-toast'
const { toast } = useToast()
import _ from 'loadsh'
import useTokenStore from '@/stores/useTokenStore'
const tokenStore = useTokenStore()
const instance = axios.create({
  baseURL:
    import.meta.env.MODE === 'development' ? 'http://10.251.255.229' : 'http://10.251.255.229',
  timeout: 3000,
  headers: { Authorization: tokenStore.getToken }
})
//请求拦截
instance.interceptors.request.use(
  (config) => {
    return config
  },
  (error) => {
    console.log('🚀 ~ file: request.js:18 ~ error:', error)

    const popupError = () => {
      toast({
        title: '服务器或网络异常',
        variant: 'destructive'
      })
    }
    console.log('test')
    _.debounce(popupError, 1000)()
    return Promise.reject(error)
  }
)

instance.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    console.log('🚀 ~ file: request.js:34 ~ error:', error)

    const popupError = () => {
      toast({
        title: '请求错误',
        description: error,
        variant: 'destructive'
      })
    }
    _.debounce(popupError, 1000)()
    // popupError()
    return Promise.reject(error)
  }
)

export default instance
