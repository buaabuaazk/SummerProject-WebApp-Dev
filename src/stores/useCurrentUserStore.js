import { defineStore } from 'pinia'

export const useCurrentUserStore =  defineStore({
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
