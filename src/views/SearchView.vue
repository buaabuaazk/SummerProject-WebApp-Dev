<template>
  <div class="search-page">
    <div class="search-bar">
      <a-input-search
        v-model:value="input"
        placeholder="input search text"
        enter-button="Search"
        size="large"
        @search="search"
        style="
          background-color: #1890ff;
          border-color: #1890ff;
          color: #fff;
          width: 40rem;
          margin-left: 20rem;
        "
      />
    </div>
    <div style="width: 40rem; margin-left: 20rem">
      <a-divider style="height: 2px; background-color: #7cb305" />
      <el-button type="primary" @click="toShowJobInfo" style="margin-left: 1rem">职位</el-button>
      <el-button type="primary" @click="toShowTweetInfo" style="margin-left: 1rem">动态</el-button>
      <el-button type="primary" @click="toShowEnterPrise" style="margin-left: 1rem">企业</el-button>
      <el-button type="primary" @click="toShowUserInfo" style="margin-left: 1rem">用户</el-button>
    </div>
    <div style="height: 2rem">
      <div class="flowing-text">
        <span v-for="(char, index) in visibleText" :key="index">{{ char }}</span>
      </div>
    </div>
    <div class="search-results">
      <div v-if="showJobInfo" style="display: flex">
        <div class="job-list" v-if="jobInfo && jobInfo.length > 0">
          <a-card
            v-for="item in jobInfo"
            :key="item.id"
            @click="goTo(`/jobInfo/${item.recruit_id}`)"
            style="width: 23rem; margin-right: 1.5rem"
          >
            <template #title>
              <span v-html="item.job_name"></span>
            </template>
            <template #extra
              ><a href="#" style="color: red">{{ item.job_salary }}</a></template
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
                <img :src="item.enterprise_icon" style="width: 8rem; object-fit: fill" />
                <div style="margin-top: 1rem; margin-left: 2rem">
                  <p v-html="item.enterprise_name"></p>
                  <p v-html="item.enterprise_field" style="margin-top: 1rem"></p>
                </div>
              </div>
            </div>
          </a-card>
        </div>
        <div v-else>
          <p style="margin-left: 30rem">暂时没有相关信息欸~_~,搜搜别的吧^_^</p>
        </div>
      </div>
      <div v-if="showTweetInfo">
        <div v-if="tweetInfo && tweetInfo.length > 0">
          <a-card title="公司" style="width: 40rem; margin-left: 20rem">
            <template #extra><a href="#">more</a></template>
            <p>公司简介</p>
          </a-card>
        </div>
        <div v-else>
          <p style="margin-left: 30rem">暂时没有相关信息欸~_~,搜搜别的吧^_^</p>
        </div>
      </div>
      <div v-if="showEnterPrise">
        <div class="enterprise-list" v-if="enterpriseInfo && enterpriseInfo.length > 0">
          <a-card
            v-for="item in enterpriseInfo"
            :key="item.id"
            style="width: 40rem; margin-left: 20rem"
          >
            <template #title>
              <div style="display: flex" @click="goTo(`/CorporationInfo/${item.enterprise_id}`)">
                <img :src="item.icon" style="height: 4rem; object-fit: fill" />
                <div style="align-content: center">
                  <p v-html="item.name"></p>
                  <p v-html="item.field"></p>
                </div>
              </div>
            </template>
            <template #extra><a :href="`/CorporationInfo/${item.enterprise_id}`">more</a></template>
            <p v-html="item.introduction"></p>
          </a-card>
        </div>
        <div v-else>
          <p style="margin-left: 30rem">暂时没有相关信息欸~_~,搜搜别的吧^_^</p>
        </div>
      </div>
      <div v-if="showUserInfo">
        <div v-if="userInfo && userInfo.length > 0">
          <a-card
            v-for="item in userInfo"
            :key="item.id"
            style="width: 40rem; margin-left: 20rem; border-color: #6caeec"
          >
            <div style="display: flex; height: 1rem; align-items: center">
              <img :src="item.icon" style="height: 3rem" />
              <div>
                <p :innerHTML="item.username"></p>
                <p>{{ item.email }}</p>
              </div>
              <div style="margin-left: 17rem; display: flex">
                <el-button type="primary" style="display:">+关注</el-button>
                <el-button @click="messageStore.sendMessage(item.user_id)" type="primary"
                  >私信</el-button
                >
              </div>
            </div>
          </a-card>
        </div>
        <div v-else>
          <p style="margin-left: 30rem">暂时没有相关信息欸~_~,搜搜别的吧^_^</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import axios from '@/utils/request'
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useMessageStore } from '@/stores/useMessageStore'
import { useSearchStore } from '@/stores/useSearchStore'
import { useRoute } from 'vue-router'

const messageStore = useMessageStore()

const router = useRouter()
const input = ref('')
const page = ref(1)
const enterpriseInfo = ref([])
const jobInfo = ref([])
const userInfo = ref([])
const tweetInfo = ref([])

const showEnterPrise = ref(false)
const showJobInfo = ref(true)
const showUserInfo = ref(false)
const showTweetInfo = ref(false)

const search = async () => {
  try {
    const response = await axios.get('/api/recruit/highsearch', {
      params: {
        input: input.value,
        page: page.value
      }
    })
    console.log(response.data)
    enterpriseInfo.value = response.data.enterprise_info
    jobInfo.value = response.data.job_info
    userInfo.value = response.data.user_info
    tweetInfo.value = response.data.tweet_info
    if (jobInfo.value) {
      for (const item of jobInfo.value) {
        item.job_name = item.job_name.replace(/<em>/g, '<em style="color:red;">')
        item.enterprise_name = item.enterprise_name.replace(/<em>/g, '<em style="color:red;">')
        item.enterprise_field = item.enterprise_field.replace(/<em>/g, '<em style="color:red;">')
      }
    }
    for (const item of enterpriseInfo.value) {
      item.name = item.name.replace(/<em>/g, '<em style="color:red;">')
      item.field = item.field.replace(/<em>/g, '<em style="color: red;">')
      item.introduction = item.introduction.replace(/<em>/g, '<em style="color:red;">')
    }
  } catch (err) {
    console.log(err)
  }
}

const increasePage = () => {
  page.value = page.value + 1
}

const toShowEnterPrise = () => {
  showEnterPrise.value = true
  showJobInfo.value = false
  showUserInfo.value = false
  showTweetInfo.value = false
}

const toShowJobInfo = () => {
  showEnterPrise.value = false
  showJobInfo.value = true
  showUserInfo.value = false
  showTweetInfo.value = false
}

const toShowUserInfo = () => {
  showEnterPrise.value = false
  showJobInfo.value = false
  showUserInfo.value = true
  showTweetInfo.value = false
}

const toShowTweetInfo = () => {
  showEnterPrise.value = false
  showJobInfo.value = false
  showUserInfo.value = false
  showTweetInfo.value = true
}

const text = '今天的工作是为了明天更好的工作doge'
const visibleText = ref('')
const intervalTime = 200 // 每个字符显示的时间间隔，单位毫秒
const disappearTime = 2000 // 字符串全部显示后消失的时间，单位毫秒

const startFlowingText = () => {
  let currentIndex = 0
  visibleText.value = ''

  const intervalId = setInterval(() => {
    if (currentIndex < text.length) {
      visibleText.value += text[currentIndex]
      currentIndex++
    } else {
      clearInterval(intervalId)
      setTimeout(() => {
        visibleText.value = ''
        startFlowingText() // 重新开始显示
      }, disappearTime)
    }
  }, intervalTime)
}

const goTo = (where) => {
  router.push(where)
}

onMounted(async () => {
  //startFlowingText();
  // console.log('wrong')
  // const searchStore = useSearchStore()
  // input.value = searchStore.getContent
  const route = useRoute()
  input.value = route.query.searchContent
  if (input.value !== '') {
    await search()
  }
})
</script>

<style scoped>
.search-page {
  padding: 20px;
}

.search-bar {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}
.search-results {
  display: flex;
}

.flowing-text {
  font-size: 24px;
  white-space: nowrap;
  overflow: hidden;
  margin-left: 30rem;
}

.flowing-text span {
  opacity: 0;
  animation: fadeIn 0.5s forwards;
  justify-content: center;
  align-items: center;
}

@keyframes fadeIn {
  to {
    opacity: 1;
  }
}

.job-list {
  display: flex;
  flex-wrap: wrap;
  margin-left: 6rem;
}
</style>
