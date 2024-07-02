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
            姓名：{{
              profile.detailedInformation.first_name + profile.detailedInformation.last_name
            }}
          </p>
          <p>学历：{{ profile.detailedInformation.degree }}</p>
          <p>岗位：{{ profile.position }}</p>
          <p>工龄：{{ profile.work_age }}年</p>
        </div>
        <div style="flex: 140; padding: 20px">
          <p>&nbsp;</p>
          <p>&nbsp;</p>
          <p>邮箱：{{ profile.detailedInformation.email }}</p>
          <p>
            仓库：<a :href="profile.detailedInformation.repo" target="_blank" >{{
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
            <div style="background-color: #f5f5f5; padding: 20px; height: 400px; overflow: auto">
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
                    <a :href="getBlog(profile.blog)" target="_blank" class="blog-link1">{{
                      getBlog(profile.blog)
                    }}</a>
                  </a-card>
                </a-col>
              </a-row>
            </div>
          </el-tab-pane>
          <el-tab-pane label="关注企业" name="second" class="larger-tab">
            <div style="background-color: #f5f5f5; padding: 20px; height: 400px; overflow: auto">
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
          <el-tab-pane label="我的投递" name="second2" class="larger-tab">
            <div style="background-color: #f5f5f5; padding: 20px; height: 400px; overflow: auto">
              <a-list class="demo-loadmore-list" item-layout="horizontal">
                <a-list-item v-for="(offer, index) in profile.offerList" :key="index">
                  <template #actions>
                    <a key="list-loadmore-edit" @click="handleOffer(offer.has_offer,offer.recruit_id)">处理</a>
                    <a :href="`/JobInfo/${offer.recruit_id}`" key="list-loadmore-more">岗位信息</a>
                    <a-modal v-model:open="open1" title="offer处理" @ok="agree(offer.recruit_id)" :mask-Style="{ 'background-color': 'rgba(0, 0, 0, 0.5)' }">
                      <p>你确定要接受这份offer吗？</p>
                      <p>点击OK接受，点击Cancel拒绝</p>
                    </a-modal>
                    <a-modal v-model:open="open2" title="offer处理" @ok="handleOk2" :mask-Style="{ 'background-color': 'rgba(0, 0, 0, 0.5)' }">
                      <p>很遗憾，您的岗位申请暂未通过。</p>
                      <p>北海虽赊，扶摇可接；东隅已逝；桑榆非晚！</p>
                    </a-modal>
                  </template>
                  <a-skeleton :loading="initLoading" avatar :title="false" active>
                    <a-list-item-meta :description="offer.job_name">
                      <template #title>
                        <a :href="`/CorporationInfo/${offer.enterprise_id}`">{{ offer.enterprise_name }}</a>
                      </template>
                      <template #avatar>
                        <a-avatar :src="offer.enterprise_icon" />
                      </template>
                    </a-list-item-meta>
                    <div>{{ offer.has_offer === true ? '已通过' : '未通过' }}</div>
                  </a-skeleton>
                </a-list-item>
              </a-list>
            </div>
          </el-tab-pane>
          <el-tab-pane label="我的简历" name="third" class="larger-tab">
            <!--在这里写-->
            <!--在这里写-->
            <div style="display: flex; justify-content: space-between">
              <div
                style="
                  flex: 1;
                  margin-right: 20px;
                  padding: 20px;
                  background-color: #f5f5f5;
                  border-radius: 8px;
                "
              >
                <div class="bg-gray-50 p-6 rounded-lg border border-gray-200">
                  <label class="block text-sm font-medium text-gray-700">上传简历</label>
                  <input
                    type="file"
                    @change="handleFileUpload"
                    class="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-600 file:text-white hover:file:bg-blue-700"
                  />
                  <button
                    @click="uploadResume"
                    class="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    上传简历
                  </button>
                  <p>简历上传情况：</p>
                  <a :href="profile.detailedInformation.resume" class="blog-link">{{ profile.detailedInformation.resume }}</a>
                </div>
              </div>
              <div style="flex: 1; padding: 20px; background-color: #f5f5f5; border-radius: 8px">
                <h3>大模型优化简历</h3>
                <!--
                  <el-button size="small" type="primary" @click="optimizeResume">优化简历</el-button>
                -->
                <div>
                  <button type="primary" @click="optimizeResume" class="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >点击优化简历</button>
                  <a-modal v-model:open="open" title="简历优化建议" @ok="handleOk" :width="800">
                    <div v-html="format"></div>
                  </a-modal>
                </div>
                <!--
                  <div v-if="optimizedResume" style="margin-top: 20px;">
                  <h4>优化后的简历</h4>
                  <pre>{{ optimizedResume }}</pre>
                </div>
                -->
              </div>
            </div>
          </el-tab-pane>
          <el-tab-pane label="修改信息" name="fourth">
            <div style="display: flex">
              <div style="width: 50%">
                <a-form-item label="姓" style="width: 20rem">
                  <a-input
                    v-model:value="profile.first_name"
                    :placeholder="profile.detailedInformation.first_name"
                  />
                </a-form-item>
                <a-form-item label="名" style="width: 20rem">
                  <a-input
                    v-model:value="profile.last_name"
                    :placeholder="profile.detailedInformation.last_name"
                  />
                </a-form-item>
                <a-form-item label="用户名" style="width: 20rem">
                  <a-input
                    v-model:value="profile.username"
                    :placeholder="profile.detailedInformation.username"
                  />
                </a-form-item>
                <a-form-item label="学历" style="width: 10rem">
                  <a-select
                    v-model:value="profile.degree"
                    :placeholder="profile.detailedInformation.degree"
                  >
                    <a-select-option value="高中">高中</a-select-option>
                    <a-select-option value="本科">本科</a-select-option>
                    <a-select-option value="硕士">硕士</a-select-option>
                    <a-select-option value="博士">博士</a-select-option>
                  </a-select>
                </a-form-item>
                <a-form-item label="邮箱" style="width: 20rem">
                  <a-input
                    v-model:value="profile.email"
                    :placeholder="profile.detailedInformation.email"
                  />
                </a-form-item>
                <a-form-item label="头像" style="width: 20rem">
                  <div>
                    <a-upload
                      v-model:file-list="fileList"
                      :beforeUpload="storeimg"
                      list-type="picture"
                      class="upload-list-inline"
                    >
                      <a-button>
                        <upload-outlined></upload-outlined>
                        upload
                      </a-button>
                    </a-upload>
                  </div>
                </a-form-item>
              </div>
              <div style="width: 50%">
                <a-form-item label="兴趣岗位" style="width: 20rem">
                  <a-select
                    v-model:value="profile.interestJob"
                    :placeholder=null
                    mode="multiple"
                    style="width: 100%"
                    :options="interestOptions.map((option) => ({ value: option }))"
                    @change="handleChange"
                  ></a-select>
                </a-form-item>
                <a-form-item label="博客" style="width: 20rem">
                  <a-input
                    v-model:value="profile.blog"
                    :placeholder="profile.detailedInformation.blog"
                  />
                </a-form-item>
                <a-form-item label="仓库" style="width: 20rem">
                  <a-input
                    v-model:value="profile.repo"
                    :placeholder="profile.detailedInformation.repo"
                  />
                </a-form-item>

                <a-form-item style="color: deepskyblue">
                  <a-button @click="submit">提交修改</a-button>
                </a-form-item>
              </div>
            </div>
          </el-tab-pane>
        </el-tabs>
      </div>
      <div style="flex: 90; display: flex; flex-direction: column; justify-content: center; align-items: center; height: 100px">
        <!--
          <p style="font-size: 2rem; margin: 0">我的公司</p>
          <p>&nbsp;</p>
          <p>&nbsp;</p>
          <p>&nbsp;</p>
          <p v-if="profile.enterprise==0" style="font-size: 1.8rem; margin: 0">暂未加入公司</p>
        -->
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
    console.log(profile.value.detailedInformation)
    console.log(profile.value.detailedInformation.user_id)
    userPosts.value = await getUserPosts(profile.value.detailedInformation.user_id)
  }
}
onMounted(async() => {
  //获取用户详细信息
  axios
    .get('/api/user/detail', {
      headers: {
        Authorization: tokenStore.getToken
      }
    })
    .then((response) => {
      console.log('获取用户信息成功')
      console.log(response)
      console.log(response.data)
      console.log(tokenStore.getToken)
      console.log(response.data.tag)
      //console.log(profile.detailedInformation.username) profile.value.detailedInformation.username
      profile.value.detailedInformation = response.data
      console.log(profile.value.detailedInformation.user_id)
      axios
        .get('/api/user/subscribe_list', {
          params: {
            user_id: profile.value.detailedInformation.user_id
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
            user_id: profile.value.detailedInformation.user_id
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
      const count = 7;
      const fakeDataUrl = `https://randomuser.me/api/?results=${count}&inc=name,gender,email,nat,picture&noinfo`;
      fetch(fakeDataUrl)
      .then(res => res.json())
      .then(res => {
        initLoading.value = false;
        data.value = res.results;
        list.value = res.results;
      });
      axios
        .get('/api/recruit/list_user_recruit')
        .then((response) => {
          console.log('获取用户offer列表成功');
          console.log(response);
          console.log(response.data);
          profile.value.offerList = response.data;
          //console.log(profile.value.offerList[1]);
        })
        .catch((error) => {
          console.error('获取用户offer列表失败', error);
        });
      //获取当前履历（有无企业，在哪个企业，工龄，职位...）
      if(profile.value.detailedInformation.user_id){
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
        fetchData()
    })
    .catch((error) => {
      console.error('获取用户信息失败', error)
    })
 
  //console.log('CoRecruit_ID', route.params.id)
})
const activeName = ref('first')
const goTo = (where) => {
  router.push(where)
}
const handleFileUpload = (event) => {
  profile.value.file = event.target.files[0]
  console.log('Uploaded file:', profile.value.file)
  // Handle file upload logic here
}
const uploadResume = () => {
  // 创建一个 FormData 对象
  const formData = new FormData()
  //const fileInput = document.querySelector('input[type=file]') // 通过选择器获取文件上传 input
  // 将文件添加到 FormData 中
  formData.append('file', profile.value.file)
  axios
    .post(
      '/api/user/resume',
      formData,
    )
    .then((response) => {
      console.log('1111111')
      alert('简历上传成功！')
    })
    .catch((error) => {
      console.log(error)
    })
}
/*
const downloadResume = () => {
  const link = document.createElement('a');
  link.href = 'path_to_resume.pdf'; // Replace with the actual path to the resume file
  link.download = 'resume.pdf';
  link.click();
};

const confirmEdit = () => {
  isEditable.value = false;
  profile.value.detailedInformation.interest = editableInterest.value;
  console.log(editableInterest.value)
  // 发送向后端发送修改信息的请求
  // axios.put('/api/interest', { interest: editableInterest.value });
  // 可以使用fetch, axios等第三方库来发送请求
};
*/
const storeimg = (file) => {
  profile.value.icon = file
  return false
}
const submit = () => {
  console.log('11111')
  console.log(profile.value)
  console.log('传过去的新数据是' + profile.value.degree)
  profile.value.tag = interestToNumList(profile.value.interestJob)
  console.log(profile.value.tag)
  const formData = new FormData()
  //formData.append('user_id', 3);
  if (profile.value.username) {
    formData.append('username', profile.value.username)
  }
  if (profile.value.degree) {
    formData.append('degree', profile.value.degree)
  }
  if (profile.value.email) {
    formData.append('email', profile.value.email)
  }
  if (profile.value.first_name) {
    formData.append('first_name', profile.value.first_name)
  }
  if (profile.value.last_name) {
    formData.append('last_name', profile.value.last_name)
  }
  if (profile.value.blog) {
    formData.append('blog', profile.value.blog)
  }
  if (profile.value.repo) {
    formData.append('repo', profile.value.repo)
  }
  console.log(profile.value.tag)
  //if (profile.value.tag) {formData.append('tag_id',profile.value.tag)}
  console.log(formData.get('tag_id'))
  test()
  //if (profile.value.tag) {formData.append('tag',profile.value.tag)}
  axios
    .patch('/api/user/detail', formData,{
      headers: {
          Authorization: tokenStore.getToken
        }
    }, )
    .then((response) => {
      console.log('修改用户信息成功')
      console.log(response)
      console.log(response.data)
      //console.log(profile.detailedInformation.username) profile.value.detailedInformation.username
      profile.value.detailedInformation = response.data
      console.log('111' + profile.value.detailedInformation.username)
    })
    .catch((error) => {
      console.error('修改用户信息失败', error)
      // 可以在界面上显示错误信息或者其他处理
    })
  if (profile.value.icon) {
    const formData = new FormData()
    formData.append('file', profile.value.icon)
    //console.log(formData.get('file'));

    axios
      .post('/api/user/icon', formData, {
        headers: {
          Authorization: tokenStore.getToken
        }
      })
      .then((response) => {
        console.log('修改用户信息成功')
        console.log(response)
        console.log(response.data)
        alert('头像上传成功')
      })
      .catch((error) => {
        console.error('修改用户信息失败', error)
        // 可以在界面上显示错误信息或者其他处理
      })
  }
}
const mapNumbersToInterests = (numbers) => {
  return numbers.map((number) => {
    if (number >= 1 && number <= 30) {
      return interestOptions[number - 1]
    } else {
      return '错误岗位' // 或者可以抛出错误
    }
  })
}
const numToInterest = (num) => {
  return interestOptions[num - 1]
}
const numlistToInterest = (numList) => {
  console.log(numlist)
  //let interestList = numList.map(num => {return interestOptions[num - 1];});
  return numList
}
const interestToNumList = (interestList) => {
  console.log(interestList)
  let numList = interestList.map((interest) => {
    return interestOptions.indexOf(interest) + 1
  })
  return numList
}
const test = () => {
  console.log('原始的tag：' + profile.value.detailedInformation.tag)
  console.log('用户输入的interest：' + profile.interestJob)
  console.log('要传给后端的tag：' + profile.value.tag)
}
const showModal = () => {
  open.value = true
  console.log('showmodal called')
}

const handleOk = (e) => {
  console.log(e)
  open.value = false
}
const handleOk2 = (e) => {
  console.log(e)
  open2.value = false
}
const replaceNewlinesWithBreaks = (str) => {
  return str.replace(/\\n/g, '<br>')
}
const boldTextBetweenStars = (str) => {
  // 使用正则表达式捕获两个星号中间的内容
  return str.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
}
const optimizeResume = () => {
  console.log('optimizeResume called')
  axios
    .post('/api/tweet/optimize_resume')
    .then((response) => {
      //
      //format.value=response.data.suggestions;
      console.log('返回的建议是' + response.data.suggestions)
      //format.value=replaceNewlinesWithBreaks(response.data.suggestions)
      rawResumeText.value = replaceNewlinesWithBreaks(response.data.suggestions)
      rawResumeText.value = boldTextBetweenStars(response.data.suggestions)
      console.log(rawResumeText.value)
      console.log(format.value)
    })
    .catch((error) => {
      console.log(error)
    })
  console.log('显示简历优化信息 called')
  showModal()
  //这个是处理后的字符串（简历优化建议）
  //format.value = rawResumeText.value.replace(/\n/g, '<br>');
  //console.log(format.value)
}
const getBlog = (str) => {
  if (str) {
    return str
  } else {
    return '暂无博客'
  }
}
const handleOffer = (flag,id) => {
  profile.value.currentRid=id
  console.log('handleoffer called')
  if(flag){
    open1.value = true
  }
  else {
    open2.value = true
  }
  /*
  const formData = new FormData()
  formData.append('id', id)
  axios
    .post(
      '/api/profile',
      formData,
    )
    .then((response) => {
      console.log('1111111')
      
    })
    .catch((error) => {
      console.log(error)
    })
  */
}
const agree = (id) => {
  console.log('agree called,id is '+profile.value.currentRid)
  const formData = new FormData()
  formData.append('recruit_id', profile.value.currentRid)
  axios
    .post(
      '/api/profile/',
      formData,
    )
    .then((response) => {
      console.log('接受offer成功')
    })
    .catch((error) => {
      console.log(error)
    })
}
const refuse = (id) => {
  /*
  console.log('agree and refuse called')
  const formData = new FormData()
  formData.append('recruit_id', id)
  axios
    .post(
      '/api/profile/',
      formData,
    )
    .then((response) => {
      console.log('1111111')
    })
    .catch((error) => {
      console.log(error)
    })
  */
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
  font-weight: lighter; /* 设置为细体 */
}
.blog-link1 {
  display: block;
  width: 200px; /* 设置适当的宽度 */
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.blog-link:hover {
  color: blue; /* 鼠标悬停时字体颜色变为蓝色 */
}
.deep-blue-button {
  background-color: rgb(#2563eb) !important; /* DeepBlue */
  border-color: rgb(#2563eb) !important; /* DeepBlue */
}
</style>
