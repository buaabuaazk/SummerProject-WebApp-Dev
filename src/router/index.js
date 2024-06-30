import { createRouter, createWebHistory } from 'vue-router'
import axios from 'axios'
import useTokenStore from '@/stores/useTokenStore'
import { getUserInfo, getUserProfile, getEnterpriseInfo } from '@/stores/useCorporationStore'

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
        requireAuth: false,
        title: '个人信息'
      }
    },
    {
      path: '/ApplymentAction/:id',
      name: 'ApplymentAction',
      component: () => import('@/views/ApplymentAction.vue'),
      meta: {
        requireAuth: false,
        title: '应聘人员列表查看' //企业管理员发布一个岗位招聘信息后，有多个人前来投递简历，在此页面处理应聘请求
      }
    },
    {
      path: '/CorporationInfo/',
      name: 'CorporationInfo',
      component: () => import('@/views/CorporationInfo.vue'),
      children: [
        {
          path: 'Test',
          name: 'CoTest',
          component: () => import('@/components/Corporation/CoTest.vue')
        },
        {
          path: '',
          name: 'CoInfo',
          component: () => import('@/components/Corporation/CoInfo.vue')
        },
        {
          path: 'Recruit',
          name: 'CoRecruit',
          component: () => import('@/components/Corporation/CoRecruit.vue')
        },
        {
          path: 'Trend',
          name: 'CoTrend',
          component: () => import('@/components/Corporation/CoTrend.vue')
        },
        {
          path: 'User',
          name: 'CoUser',
          component: () => import('@/components/Corporation/CoUser.vue')
        },
        {
          path: 'Settings',
          name: 'CoSettings',
          component: () => import('@/components/Corporation/CoSettings.vue')
        }
      ],
      meta: {
        requireAuth: true,
        requireEnterprise: true,
        title: '企业公开信息展示'
      },
      props: true
    },
    {
      path: '/CorporationInfo/:id',
      name: 'CorporationInfoId',
      component: () => import('@/views/CorporationInfo.vue'),
      meta: {
        requireAuth: true,
        title: '企业公开信息展示'
      },
      children: [
        {
          path: 'Info',
          name: 'IdCoInfo',
          component: () => import('@/components/Corporation/CoInfo.vue')
        },
        {
          path: 'Recruit',
          name: 'IdCoRecruit',
          component: () => import('@/components/Corporation/CoRecruit.vue')
        },
        {
          path: 'Trend',
          name: 'IdCoTrend',
          component: () => import('@/components/Corporation/CoTrend.vue')
        },
        {
          path: 'User',
          name: 'IdCoUser',
          component: () => import('@/components/Corporation/CoUser.vue')
        },
        {
          path: 'Settings',
          name: 'IdCoSettings',
          component: () => import('@/components/Corporation/CoSettings.vue')
        }
      ],
      props: true
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
      path: '/Recruitment/:id',
      name: 'Recruitment',
      component: () => import('@/views/Recruitment.vue'),
      meta: {
        requireAuth: false,
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
    },
    {
      path: '/sos',
      name: 'SOS',
      component: () => import('@/views/LoginAndRegister.vue'),
      children: [
        {
          path: 'login',
          name: 'Login',
          component: () => import('@/components/Login.vue')
        },
        {
          path: 'register',
          name: 'Register',
          component: () => import('@/components/Register.vue')
        }
      ]
    },
    {
      path: '/jobinfo/:id',
      name: 'JobInfo',
      component: () => import('@/views/JobInfo.vue'),
      meta: {
        requireAuth: false,
        title: '职位详情'
      },
      props: true
    },
    {
      path: '/job-detail/:id',
      name: 'JobDetail',
      component: () => import('@/components/Corporation/JobDetail.vue'),
      meta: {
        requireAuth: false,
        title: '职位详情2'
      }
    },
    {
      path: '/Corporation404',
      name: 'noCorporation',
      component: () => import('@/components/Corporation/CorNotIn.vue')
    },
    {
      path: '/search',
      name: 'search',
      component: () => import('@/views/SearchView.vue')
    },
    //404页面，需要放在最后
    {
      path: '/:pathMatch(.*)*' /*其他页面*/,
      name: 'notFound',
      component: () => import('../views/404.vue'),
      meta: {
        requireAuth: false
      }
    }
  ]
})

router.beforeEach(async (to, from, next) => {
  if (to.meta.requireAuth && !localStorage.getItem('token')) {
    next({ name: 'Login' })
  } else if (to.meta.requireEnterprise) {
    const userProfile = await getUserProfile()
    console.log(userProfile)
    if (userProfile?.enterprise == null) {
      next({ name: 'noCorporation' })
    } else {
      next()
    }
  } else {
    next()
  }
})

export default router
