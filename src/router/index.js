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
      path: '/ApplymentAction',
      name: 'ApplymentAction',
      component: () => import('@/views/ApplymentAction.vue'),
      meta: {
        requireAuth: true,
        title: '应聘人员列表查看' //企业管理员发布一个岗位招聘信息后，有多个人前来投递简历，在此页面处理应聘请求
      }
    },
    {
      path: '/CorporationInfo',
      name: 'CorporationInfo',
      component: () => import('@/views/CorporationInfo.vue'),
      meta: {
        requireAuth: true,
        title: '企业公开信息展示'
      }
    },
    {
      path: '/CorporationManage',
      name: 'CorporationManage',
      component: () => import('@/views/CorporationManage.vue'),
      meta: {
        requireAuth: true,
        title: '企业信息修改'
      }
    },
    {
      path: '/CorporationPost',
      name: 'CorporationPost',
      component: () => import('@/views/CorporationPost.vue'),
      meta: {
        requireAuth: true,
        title: '企业动态'
      }
    },
    {
      path: '/CreateCorporation',
      name: 'CreateCorporation',
      component: () => import('@/views/CreateCorporation.vue'),
      meta: {
        requireAuth: true,
        title: '企业创建'
      }
    },
    {
      path: '/CreatePost',
      name: 'CreatePost',
      component: () => import('@/views/CreatePost.vue'),
      meta: {
        requireAuth: true,
        title: '动态发布' //表单页
      }
    },
    {
      path: '/JobInfo',
      name: 'JobInfo',
      component: () => import('@/views/JobInfo.vue'),
      meta: {
        requireAuth: true,
        title: '岗位信息' //某一个岗位的详细信息
      }
    },
    {
      path: '/LoginAndRegister',
      name: 'LoginAndRegister',
      component: () => import('@/views/LoginAndRegister.vue'),
      meta: {
        requireAuth: false,
        title: '登录注册'
      }
    },
    {
      path: '/MessageCenter',
      name: 'MessageCenter',
      component: () => import('@/views/MessageCenter.vue'),
      meta: {
        requireAuth: true,
        title: '消息中心'
      }
    },
    {
      path: '/OfferAction',
      name: 'OfferAction',
      component: () => import('@/views/OfferAction.vue'),
      meta: {
        requireAuth: true,
        title: 'offer处理' //求职者收到多个offer时，可以在此页面接受或拒绝每个offer
      }
    },
    {
      path: '/PostView',
      name: 'PostView',
      component: () => import('@/views/PostView.vue'),
      meta: {
        requireAuth: true,
        title: '动态展示'
      }
    },
    {
      path: '/Recruitment',
      name: 'Recruitment',
      component: () => import('@/views/Recruitment.vue'),
      meta: {
        requireAuth: true,
        title: '招聘信息发布' //表单页
      }
    },
    {
      path: '/ResumeAction',
      name: 'ResumeAction',
      component: () => import('@/views/ResumeAction.vue'),
      meta: {
        requireAuth: true,
        title: '简历优化'
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
