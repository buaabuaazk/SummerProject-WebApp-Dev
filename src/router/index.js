import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: () => import('@/views/HomeView.vue'),
      meta: {
        requireAuth: false
      }
    },
    {
      path: '/personalInfo',
      name: 'PersonalInfo',
      component: () => import('@/views/PersonalInfo.vue'),
      meta: {
        requireAuth: true,
        title: '个人信息'
      }
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.meta.requireAuth && !localStorage.getItem('token')) {
    next({ name: 'Login' })
  } else {
    next()
  }
})

export default router
