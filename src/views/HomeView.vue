<!--
 * @Date: 2024-06-18 22:18:30
 * @Author: Q9K
 * @Description: 进入网站的首页，需要展示企业的信息
-->
<template>
  <!-- 搜索栏 -->
  <div class="search-container">
    <div class="dropdown"></div>
    <div class="search-form">
      <a-input-search
        v-model:value="inputCotent"
        placeholder="新发现"
        enter-button
        size="large"
        @search="handleSearchButtonClick"
        style="width: 30rem; margin-left: 30rem"
      />
    </div>
  </div>

  <!-- 热门城市筛选与广告 -->
  <div class="mid-bar">
    <div class="job-classify">
      <a-card title="热门城市" style="text-align: center">
        <a-card-grid
          v-for="(city, index) in cities"
          :key="index"
          class="hot-location"
          @click="searchJob(city)"
          >{{ city }}</a-card-grid
        >
      </a-card>
    </div>
    <div class="advert-contanier">
      <a-carousel autoplay style="width: 50rem; height: 14rem;">
        <div>
          <img
            src="https://img2.baidu.com/it/u=1350586071,1444048650&fm=253&fmt=auto&app=120&f=JPEG?w=1215&h=621"
            style="width: 50rem;height: 14rem"
          />
        </div>
        <div>
          <img
            src="https://img0.baidu.com/it/u=3718556516,3058635220&fm=253&fmt=auto&app=138&f=PNG?w=499&h=320"
            style="width: 50rem; height: 14rem"
          />
        </div>
        <div>
          <img
            src="https://img.zcool.cn/community/016d9a5da56785a80121b722282a77.png@1280w_1l_2o_100sh.png"
            style="width: 50rem; height: 17rem"
          />
        </div>
        <div>
          <img
            src="https://img2.baidu.com/it/u=1246621160,3381175414&fm=253&fmt=auto&app=138&f=JPEG?w=701&h=360"
            style="width: 50rem; height: 15rem"
          />
        </div>
      </a-carousel>
      <a-card class="advert-enterprise" style="border: #fafaf3;">
        <a-card-grid class="company-adv w-[12.5%] flex flex-col justify-center " v-for="item in companyadv" :key="item.id">
            <img :src="item.src" style="width: 3rem;" />
        </a-card-grid>
      </a-card>
    </div>
  </div>

  <!-- 岗位列表 -->
  <div class="job-list-container">
    <div class="job-nav">
      <a-button type="primary" @clock="changeType" style="margin-right: 0.5rem">热门岗位</a-button>
      <a-button type="primary" @clock="changeType">最新招聘</a-button>
      <a-button type="link" class="link-button">
        <span style="margin-right: 0">更多职业</span>
        <RightOutlined style="margin-left: 0; padding: 0; font-size: 1rem"></RightOutlined>
      </a-button>
    </div>
    <!-- 具体岗位信息展示 -->
    <div class="job-list" v-if="data && data.length > 0">
      <a-card
        v-for="item in data"
        :key="item.id"
        :title="item.job_name"
        @click="goTo(`/jobInfo/${item.recruit_id}`)"
        style="width: 23rem; margin-right: 1.5rem"
      >
        <template #extra
          ><a href="#" style="color: red;">{{ item.job_salary }}</a></template
        >
        <div>
          <div class="advantege" style="display: flex">
            <a-button
              v-for="itemadv in item.job_advantage"
              :key="itemadv.id"
              type="text"
              style="margin-right: 1rem; background: #f8f8f2"
              >{{ itemadv }}</a-button
            >
          </div>
          <div
            class="basic-info"
            style="display: flex; align-items: center; margin-top: 1rem; margin-left: 1rem"
          >
            <EnvironmentOutlined />
            <span class="content" style="padding: 0; margin-right: 4rem; margin-left: 0.1rem">{{
              item.job_location
            }}</span>
            <DashboardOutlined />
            <span class="content" style="margin: 0; margin-right: 4rem; margin-left: 0.11rem"
              >{{ item.job_day }} 天/周</span
            >
            <IdcardOutlined />
            <span class="content" style="margin: 0; margin-left: 0.1rem"
              >{{ item.job_month }} 个月</span
            >
          </div>
          <a-divider style="margin-bottom: 0" />
          <div class="enterprise-info" style="display: flex; margin-bottom: 0">
            <img :src="item.enterprise_icon" style="width: 8rem;object-fit: fill;" />
            <div style="margin-top: 1rem; margin-left: 2rem">
              <p>{{ item.enterprise_name }}</p>
              <p style="margin-top: 1rem">{{ item.enterprise_field }}</p>
            </div>
          </div>
        </div>
      </a-card>
    </div>
    <a-button @click="fetchNewData()" style="margin-left: 30rem">查看更多</a-button>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import axios from '@/utils/request'
import { onMounted } from 'vue'
import {
  RightOutlined,
  EnvironmentOutlined,
  DashboardOutlined,
  IdcardOutlined
} from '@ant-design/icons-vue'
import { useSearchStore } from '@/stores/useSearchStore'
import {useRouter} from 'vue-router'
const router = useRouter()

const goTo = (where) => {
  router.push(where)
}

const inputCotent = ref('') //搜索输入
const data = ref(null) //招聘数据
const error = ref()
const type = ref(1) //搜索岗位类型：1为游客，2为已登录用户
const page = ref(1) //分页查询
const cities = ref([
  '北京',
  '上海',
  '深圳',
  '杭州',
  '武汉',
  '广州',
  '成都',
  '重庆',
  '南京',
  '天津',
  '西安',
  '苏州',
  '长沙',
  '青岛',
  '大连'
])
const companyadv = ref([
  //公司广告
  {
    src: 'https://sxsimg.xiaoyuanzhao.com/adservice/image/20240401154657DPh9tsZb6QUaNJ2TXv.jpg',
    name: '特斯拉'
  },
  {
    src: 'https://sxsimg.xiaoyuanzhao.com/adservice/image/20230721134844VPGvg5NGpKms7sYnq3.png',
    name: '快手'
  },
  {
    src: 'https://sxsimg.xiaoyuanzhao.com/adservice/image/20231018111500FmIaJscA1iMaaCEwwU.jpg',
    name: '奔驰'
  },
  {
    src: 'https://sxsimg.xiaoyuanzhao.com/adservice/image/20220923170708ehOpyk6uV1M15CheOD.png',
    name: '荣耀'
  },
  {
    src: 'https://sxsimg.xiaoyuanzhao.com/company_log/2021-08-28/2e649b6207a711eca853f6ecfe74f268.png',
    name: '滴滴'
  },
  {
    src: 'https://sxsimg.xiaoyuanzhao.com/company_log/2022-03-29/eb807166af4611ec9d9592855453b3eb.jpg',
    name: '自如'
  },
  {
    src: 'https://sxsimg.xiaoyuanzhao.com/92/A5/92085822E6BAE187C864B784712E5DA5.png',
    name: '有道'
  },
  {
    src: 'https://sxsimg.xiaoyuanzhao.com/04/11/04C44C9C7187F8CF2A5239FAC0B95511.jpg',
    name: '京东'
  }
])

// 获取招聘岗位
const fetchData = async (way) => {
  try {
    const response = await axios.get('/api/recruit/list_recruit', {
      params: {
        type: way,
        page: page.value
      }
    })
    if (page.value === 1) {
      data.value = response.data
      console.log(data.value[1].job_advantage)
    } else {
      data.value = data.value.concat(response.data)
      console.log(response.data.length)
    }
  } catch (err) {
    error.value = err.message
  }
}

// 更改搜索岗位类型
const changeType = async () => {
  try {
    if (type.value === 1) {
      type.value = 2
    } else {
      type.value = 1
    }
    page.value = 1
    fetchData(type.value, page.value)
  } catch (err) {
    error.value = err.message
  }
}

// 获取下一页数据
const fetchNewData = async () => {
  try {
    page.value = page.value + 1
    await fetchData(type.value, page.value)
  } catch (err) {
    error.value = err.message
  }
}

// 根据城市搜索岗位
const searchJob = async (cityName) => {
  try {
    const response = await axios.get('/api/recruit/search', {
      params: {
        query: cityName
      }
    })
    data.value = response.data
  } catch (err) {
    error.value = err.message
  }
}

const handleSearchButtonClick = () => {
  const searchStore = useSearchStore()
  searchStore.setContent(inputCotent.value)
  console.log(inputCotent.value)
  console.log(searchStore.getContent)
  router.push('/search')
}

onMounted(() => {
  fetchData(type.value, page.value)
})
</script>

<style scoped>
:deep(.slick-slide) {
  text-align: center;
  height: 14rem;
  line-height: 12rem;
  background: #364d79;
  overflow: hidden;
}

.search-container {
  margin-bottom: 1rem;
}

.mid-bar {
  width: 80rem;
  display: flex;
  margin-left: 1rem;
}

.job-classify {
  margin-right: 1rem;
  width: 25rem;
}

.hot-location {
  width: 20%;
  text-align: center;
}

.company-adv {
  width: 6rem;
  height: 3rem;
  text-align: center;
  margin-right: 0.27rem;
}

.job-list-container {
  margin-left: 5rem;
  margin-right: 4rem;
}

.job-nav {
  width: 72rem;
  height: 2rem;
  background: #fafafa;
  font-size: 0;
  align-items: center;
  display: flex;
  align-items: center;
}

.link-button {
  padding: 0;
  margin-left: 55rem;
  display: flex;
  align-items: center;
}

.job-list {
  display: flex;
  flex-wrap: wrap;
}
</style>
