/*
 * @Date: 2024-06-23 11:57:41
 * @Author: Q9K
 * @Description: 存储token
 */
import { defineStore } from 'pinia'

export default defineStore({
  id: 'token',
  state: () => ({
    token:
      'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzIyMzE5ODQyLCJpYXQiOjE3MTkyOTU4NDIsImp0aSI6Ijk0ZDBmMTVkMTU2OTRiMWVhNjUzY2E4NTFiMWE1ZTlmIiwidXNlcl9pZCI6NX0.SpFaH9BdaJ2aRvqATpc0MgIS7Ixswr0nac9X9oqEKho'
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
