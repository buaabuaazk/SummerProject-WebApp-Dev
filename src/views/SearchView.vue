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
          <div v-if="pageNum > page">
            <el-button @click="fetchNewData()" style="margin-left: 30rem">查看更多</el-button>
          </div>
          <div v-else>
            <p style="margin-left: 30rem;">没有更多相关岗位欸~_~,看看别的吧^_^</p>
          </div>
        </div>
        <div v-else>
          <p style="margin-left: 30rem">暂时没有相关信息欸~_~,搜搜别的吧^_^</p>
        </div>
      </div>
      <div v-if="showTweetInfo">
        <div v-if="tweetInfo && tweetInfo.length > 0">
          <div v-for="item in tweetInfo" :key="item.id" style="margin-left: 5rem;">
            <PostCard :highlight="true" :searchContent="input" :post_id="item.id" style="max-width:100%"></PostCard>
          </div>
          <div v-if="pageNum > page">
            <el-button @click="fetchNewData()" style="margin-left: 30rem">查看更多</el-button>
          </div>
          <div v-else>
            <p style="margin-left: 30rem;">没有更多相关动态欸~_~,看看别的吧^_^</p>
          </div>
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
          <div v-if="pageNum > page">
            <el-button @click="fetchNewData()" style="margin-left: 30rem">查看更多</el-button>
          </div>
          <div v-else>
            <p style="margin-left: 30rem;">没有更多相关企业欸~_~,看看别的吧^_^</p>
          </div>
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
            <div style="display: flex; height: 3rem; align-items: center;">
              <img :src="item.icon" style="height: 3rem; max-width: 3rem; border-radius: 50%; margin-right: 1rem;margin-left: 0;"/>
              <div>
                <p :innerHTML="item.username"></p>
                <p>{{ item.email }}</p>
              </div>
              <div style="margin-left: auto; display: flex;">
                <el-button type="primary" style="display: ;">关注</el-button>
                <el-button @click="messageStore.sendMessage(item.user_id)" type="primary">私信</el-button>
              </div>
            </div>
          </a-card>
          <div v-if="pageNum > page">
            <el-button @click="fetchNewData()" style="margin-left: 30rem">查看更多</el-button>
          </div>
          <div v-else>
            <p style="margin-left: 30rem;">没有更多相关用户欸~_~,看看别的吧^_^</p>
          </div>
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
import Postcard from '@/components/Post/PostCard.vue'

const messageStore = useMessageStore()

const router = useRouter()
const input = ref('')
const page = ref(1)
const enterpriseInfo = ref([])
const jobInfo = ref([])
const userInfo = ref([])
const tweetInfo = ref([])
const pageNum = ref()

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
    if(page.value === 1) {
      enterpriseInfo.value = response.data.enterprise_info
      jobInfo.value = response.data.job_info
      userInfo.value = response.data.user_info
      tweetInfo.value = response.data.tweet_info
      pageNum.value = response.data.num
    } else {
      enterpriseInfo.value.push(...response.data.enterprise_info)
      jobInfo.value.push(...response.data.job_info)
      userInfo.value.push(...response.data.user_info)
      tweetInfo.value.push(...response.data.tweet_info)
    }
    if(jobInfo.value) {
      for(const item of jobInfo.value) {
        item.job_name = item.job_name.replace(/<em>/g, '<em style="color:red;">');
        item.enterprise_name = item.enterprise_name.replace(/<em>/g, '<em style="color:red;">');
        item.enterprise_field = item.enterprise_field.replace(/<em>/g, '<em style="color:red;">');
      }
    }
    if(enterpriseInfo.value) {
      for (const item of enterpriseInfo.value) {
      item.name = item.name.replace(/<em>/g, '<em style="color:red;">');
      item.field = item.field.replace(/<em>/g, '<em style="color: red;">');
      item.introduction = item.introduction.replace(/<em>/g, '<em style="color:red;">');
    }
    }
  } catch (err) {
    console.log(err)
  }
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

const goTo = (where) => {
  router.push(where)
}

// 获取下一页数据
const fetchNewData = async () => {
  try {
    page.value = page.value + 1
    await search(input.value, page.value)
  } catch (err) {
    console.log(err)
  }
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

.job-list {
  display: flex;
  flex-wrap: wrap;
  margin-left: 6rem;
}
</style>
