const DEBUGGING = import.meta.env.MODE === 'development'
// const baseURL = 'http://100.92.185.35:8000' //魏神
// const baseURL = 'http://100.122.113.8:8000' //叶神
const baseURL = 'http://100.98.24.78:8000' //李正扬
// const baseURL = 'http://10.251.255.229' // 服务器

const debug = {
  log(...args) {
    if (DEBUGGING) {
      console.log(...args)
    }
  },
  do(func, ...args) {
    if (DEBUGGING) {
      func(...args)
    }
  }
}
export { DEBUGGING, baseURL, debug }
