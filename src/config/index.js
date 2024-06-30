const DEBUGGING = true
const baseURL = 'http://100.92.185.35:8000'

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
