import { defineStore } from 'pinia'

export default defineStore({
  id: 'currentUser',
  state: () => ({
    currentUser: null
  }),
  getters: {
    getCurrentUser() {
      return this.currentUser
    }
  },
  actions: {
    setCurrentUser(user) {
      this.currentUser = user
    }
  },
  persist: true
})
