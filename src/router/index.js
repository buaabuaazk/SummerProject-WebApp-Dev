/*
 * @Author: aliyun0459792885-nakAm 1308199540@qq.com
 * @Date: 2024-06-24 14:29:21
 * @LastEditors: aliyun0459792885-nakAm 1308199540@qq.com
 * @LastEditTime: 2024-06-24 15:12:16
 * @FilePath: /frontend/src/router/index.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
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
    },
    {
      path: '/Recruitment',
      name: 'Recruitment',
      component: () => import('@/views/Recruitment.vue'),
      meta: {
        requireAuth: false,
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
