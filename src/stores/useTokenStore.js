/*
 * @Date: 2024-06-23 11:57:41
 * @Author: Q9K
 * @Description: 存储token
 */
import { defineStore } from 'pinia'

export default defineStore({
  id: 'token',
  state: () => ({
    token: ''
  }),
  getters: {
    getToken() {
      return this.token
    }
  },
  actions: {
    setToken(token) {
      this.token = token
    }
  },
  persist: true
})
