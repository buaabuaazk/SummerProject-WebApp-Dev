<template>
    <div>
      <div
        style="height: 60px; background-color: lightblue; position: fixed; top: 0; width: 100%"
      ></div>
      <div
        style="
          height: 200px;
          position: fixed;
          top: 60px;
          width: 100%;
          background-image: linear-gradient(to bottom, lightblue, white);
        "
      >
        <!-- 这个 div 放个人信息 -->
        <div
          style="
            height: 200px;
            position: fixed;
            top: 60px;
            width: 100%;
            background-image: linear-gradient(to bottom, lightblue, white);
            display: flex;
          "
        >
          <!--这个是占位的-->
          <div style="flex: 0; padding: 20px"></div>
          <div style="flex: 40; padding: 20px">
            <img
              :src="profile.detailedInformation.icon"
              alt="头像"
              style="width: 150px; height: 150px; border-radius: 50%"
            />
            
          </div>
          <div style="flex: 80; padding: 20px">
            <h2 style="font-size: 30px; font-weight: bold">
              {{ profile.detailedInformation.username }}
            </h2>
            <p>
              姓名：***
            </p>
            <p>学历：{{ profile.detailedInformation.degree }}</p>
            <p>岗位：{{ profile.position }}</p>
            <p>工龄：{{ profile.work_age }}年</p>
          </div>
          <div style="flex: 140; padding: 20px">
            <p>&nbsp;</p>
            <a-button type="primary" @click="follow()"
            :style="{ width: '200px', height: '50px', backgroundColor: 'light-blue', border: '1px solid', borderColor: 'white', color: 'black' }">
            {{ profile.isFollowed ? '取消关注' : '关注' }}
            </a-button>
            
            <p>
              仓库：<a :href="profile.detailedInformation.repo" target="_blank">{{
                profile.detailedInformation.repo
              }}</a>
            </p>
            <p>
              博客：<a :href="profile.detailedInformation.blog" target="_blank">{{
                profile.detailedInformation.blog
              }}</a>
            </p>
          </div>
        </div>
      </div>
      <div style="height: 260px; position: fixed; display: flex; top: 250px; width: 100%">
        <div style="flex: 10; padding: 0px"></div>
        <div style="flex: 180; padding: 0px">
          <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="关注用户" name="first" class="larger-tab">
              <div style="background-color: #ececec; padding: 20px; height: 400px; overflow: auto">
                <a-row :gutter="16">
                  <!--下面的a-col是一个卡片-->
                  <a-col
                    v-for="(profile, index) in profile.briefUserList"
                    :key="index"
                    :span="8"
                    style="margin-bottom: 16px"
                  >
                    <a-card :bordered="false">
                      <template #title>
                        <div style="display: flex; align-items: center">
                          <img
                            :src="profile.icon"
                            alt="Image"
                            style="width: 30px; height: 30px; margin-right: 10px"
                          />
                          <a :href="`/personalInfo/${profile.user_id}`" style="margin: 0">{{ profile.username }}</a>
                        </div>
                      </template>
                      <a :href="getBlog(profile.blog)" target="_blank" class="blog-link">{{
                        getBlog(profile.blog)
                      }}</a>
                    </a-card>
                  </a-col>
                </a-row>
              </div>
            </el-tab-pane>
            <el-tab-pane label="关注企业" name="second" class="larger-tab">
              <div style="background-color: #ececec; padding: 20px">
                <a-row :gutter="12">
                  <!--下面的a-col是一个卡片-->
  
                  <a-col
                    v-for="(profile, index) in profile.briefCorList"
                    :key="index"
                    :span="8"
                    style="margin-bottom: 16px"
                  >
                    <a-card :bordered="false" style="height: 160px">
                      <template #title>
                        <div style="display: flex; align-items: center">
                          <img
                            :src="profile.icon"
                            alt="Image"
                            style="width: 30px; height: 30px; margin-right: 10px"
                          />
                          <a :href="`/corporationInfo/${profile.enterprise_id}`" style="margin: 0">{{ profile.name }}</a>
                        </div>
                      </template>
                      <p>{{ profile.introduction }}</p>
                    </a-card>
                  </a-col>
                </a-row>
              </div>
            </el-tab-pane>
            <el-tab-pane label="我的动态" name="second1" class="larger-tab">
              <div style="background-color: #f5f5f5; padding: 20px; height: 400px; width: 930px; overflow: auto">
                <ul role="list" class="divide-y divide-gray-100 mx-8">
                  <div
                    v-for="id in userPosts"
                    :key="id"
                    class="overflow-hidden bg-white shadow sm:rounded-lg"
                  >
                    <div class="px-4 py-5 sm:p-6">
                      <!-- Content goes here -->
                      <PostCard :post_id="id" class="mx-auto max-w-80%" />
                    </div>
                  </div>
                </ul>
              </div>
            </el-tab-pane>
          </el-tabs>
        </div>
        <div style="flex: 90; display: flex; flex-direction: column; justify-content: center; align-items: center; height: 100px">
        </div>
      </div>
    </div>
</template>

<script setup>
import PostCard from '@/components/Post/PostCard.vue'
import { ChatBubbleLeftIcon, CheckCircleIcon } from '@heroicons/vue/24/outline'
import { getUserProfile, getEnterprisePosts, getUserPosts } from '@/stores/useCorporationStore'
import { ref, computed } from 'vue'
import axios from '@/utils/request'
// import axios from '../utils/request';
import { onMounted } from 'vue'
import {useRouter} from 'vue-router'
import useTokenStore from '@/stores/useTokenStore'
import useCurrentUserStore from '@/stores/useCurrentUserStore'
const currentUserStore = useCurrentUserStore()
const tokenStore = useTokenStore()
const router = useRouter()
const route = useRoute()
const props = defineProps({
  id: {
    type: [String, Number],
    required: true
  }
})
const profile = ref({
  username: '',
  first_name: '',
  last_name: '',
  name: '',
  email: '',
  degree: '',
  interestJob: [],
  tag: [],
  blog: '',
  repo: '',
  avatar: '',
  file: null,
  icon: null,
  detailedInformation: '', //放获取到的当前用户的信息
  briefUserList: [
    {
      username: '用户一',
      user_id: '1',
      blog: '这是用户一的简介。'
    },
    {
      username: '用户2',
      user_id: '2',
      blog: '这是用户一的简介。'
    }
  ],
  briefCorList: [
    {
      enterprise_id: 1,
      name: '麒麟软件有限公司',
      introduction: '专注于国产OS设计与制造',
      icon: 'https://2024summer-se-1316618142.cos.ap-beijing.myqcloud.com/icon/enterprise/1.png',
      field: '国产OS'
    }
  ],
  offerList: [],
  work_age: 0,
  position: '数据分析师',
  enterprise: '',//这是用户所属企业id
  e_icon: '',
  e_name: '',
  currentRid: 0,
})
const open = ref(false)
const open1 = ref(false);
const open2 = ref(false);
//const format = ref('我建议对简历进行如下优化：\n姓名：魏浩哲\n联系方式');
const rawResumeText = ref('正在调用大语言模型接口，请耐心等待......')
const format = computed(() => {
  return rawResumeText.value.replace(/\n/g, '<br>')
})
const interestOptions = [
  '前端工程师',
  '后端工程师',
  '全栈工程师',
  '数据科学家',
  '数据分析师',
  '机器学习工程师',
  '人工智能工程师',
  '算法工程师',
  '大数据工程师',
  '云计算工程师',
  'DevOps工程师',
  '网络安全工程师',
  '移动应用开发工程师',
  '嵌入式系统工程师',
  '系统架构师',
  '数据库管理员',
  '自动化测试工程师',
  '游戏开发工程师',
  'AR/VR工程师',
  '物联网工程师',
  '自然语言处理工程师',
  '机器人工程师',
  '区块链开发工程师',
  '生物信息学工程师',
  '电商开发工程师',
  '计算机视觉工程师',
  '强化学习工程师',
  'NLP工程师',
  '技术支持工程师',
  '产品经理'
]
const initLoading = ref(true);
const data = ref([]);
const list = ref([]);
let userProfile = ref(null)
let userPosts = ref([])

async function fetchData() {
  userProfile.value = await getUserProfile()
  if (route.params.id) {
    userPosts.value = await getUserPosts(route.params.id)
  } else {
    userPosts.value = await getUserPosts(profile.value.detailedInformation.user_id)
  }
}
  onMounted(async() => {
    //获取用户详细信息
    axios
      .get('/api/user/info',
      {
            params: {
              user_id: props.id
            }
      })
      .then((response) => {
        console.log('获取用户简要信息成功')
        console.log(response)
        console.log(response.data)
        //console.log(profile.detailedInformation.username) profile.value.detailedInformation.username
        profile.value.detailedInformation = response.data
        console.log(profile.value.detailedInformation.user_id)
        axios
          .get('/api/user/subscribe_list', {
            params: {
              user_id: props.id
            }
          })
          .then((response) => {
            console.log('获取用户关注列表成功')
            console.log(response)
            console.log(response.data)
            profile.value.briefUserList = response.data
            console.log(profile.value.briefUserList[1])
          })
          .catch((error) => {
            console.error('获取用户关注列表失败', error)
          })
        axios
          .get('/api/enterprise/subscribe_list', {
            params: {
              user_id: props.id
            }
          })
          .then((response) => {
            console.log('获取用户关注企业列表成功')
            console.log(response)
            console.log(response.data)
            profile.value.briefCorList = response.data
            //console.log(profile.value.briefUserList[1])
          })
          .catch((error) => {
            console.error('获取用户关注企业列表失败', error)
          })
        //判断当前个人主页用户是否被登录者关注
        axios
          .get('/api/user/subscribe', {
            params: {
              user_id: props.id
            }
          })
          .then((response) => {
            console.log('订阅情况是'+response.data.isSubscribed)
            profile.value.isFollowed = response.data.isSubscribed;
          })
          .catch((error) => {
            console.error('获取用户关注与否失败', error)
          })
         //获取当前履历（有无企业，在哪个企业，工龄，职位...）
         if(profile.value.detailedInformation.user_id){
          console.log(profile.value.detailedInformation.user_id)
          axios
          .get('/api/profile', {
            params: {
              user_id: profile.value.detailedInformation.user_id
            }
          })
          .then((response) => {
            console.log('获取用户履历成功');
            console.log(response.data)
            //profile.value.position=interestOptions[response.data.recruit-1] 
            profile.value.work_age=response.data.work_age
            profile.value.enterprise=response.data.enterprise
            console.log(profile.value.position)
            //根据获取到的企业id拿企业相关信息
            axios
              .get('/api/enterprise/info', {
                params: {
                  enterprise_id: profile.value.enterprise
                }
              })
              .then((response) => {
                console.log('获取用户所属企业信息成功：'+response.data.name);
                profile.value.e_icon=response.data.icon
                profile.value.e_name=response.data.name
                //profile.value.position=interestOptions[response.data.recruit-1] 
              })
              .catch((error) => {
                console.error('获取用户所属企业信息失败', error);
              });
          })
          .catch((error) => {
            console.error('获取用户履历失败', error);
          });
        }
      })
      .catch((error) => {
        console.error('获取用户信息失败', error)
      })
    //获取用户关注列表
    //console.log('user_id:' + profile.value.detailedInformation.user_id)
    await fetchData()
  })
  const storeimg = (file) => {
    profile.value.icon = file
    return false
  }
  const showModal = () => {
    open.value = true
    console.log('showmodal called')
  }
  
  const handleOk = (e) => {
    console.log(e)
    open.value = false
  }
  const getBlog = (str) => {
    if (str) {
      return str
    } else {
      return '暂无博客'
    }
  }
const follow = () => {
    console.log('follow called')
    const formData = new FormData()
    formData.append('user_id', props.id)
    axios
      .put(
        '/api/user/subscribe',
        formData,
      )
      .then((response) => {
        console.log('1111111')
        alert('操作成功！')
      })
      .catch((error) => {
        console.log(error)
      })
}
</script>
  
<style scoped>
  body {
    font-family: 'Inter', sans-serif;
  }
  .bg-gray-100 {
    background-color: #f7fafc;
  }
  .bg-white {
    background-color: #ffffff;
  }
  .bg-gray-50 {
    background-color: #f9fafb;
  }
  .border-gray-200 {
    border-color: #e5e7eb;
  }
  .text-gray-500 {
    color: #6b7280;
  }
  .text-gray-700 {
    color: #374151;
  }
  .text-gray-900 {
    color: #111827;
  }
  .text-blue-800 {
    color: #1e3a8a;
  }
  .text-blue-600 {
    color: #2563eb;
  }
  .text-blue-700 {
    color: #1d4ed8;
  }
  .larger-tab {
    font-size: 18px; /* 设置字体大小为 18 像素 */
    padding: 10px 20px; /* 设置内边距为 10px 上下，20px 左右 */
  }
  /* tile uploaded pictures */
  .upload-list-inline :deep(.ant-upload-list-item) {
    float: left;
    width: 200px;
    margin-right: 8px;
  }
  .upload-list-inline [class*='-upload-list-rtl'] :deep(.ant-upload-list-item) {
    float: right;
  }
  .blog-link {
    display: block;
    width: 200px; /* 设置适当的宽度 */
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .deep-blue-button {
    background-color: rgb(#2563eb) !important; /* DeepBlue */
    border-color: rgb(#2563eb) !important; /* DeepBlue */
  }
</style>
    