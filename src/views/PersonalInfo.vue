<template>
  <div>
    <div style="height: 60px; background-color: lightblue; position: fixed; top: 0; width: 100%;">
    </div>
    <div style="height: 200px; position: fixed; top: 60px; width: 100%; background-image: linear-gradient(to bottom, lightblue, white);">
      <!-- 这个 div 放个人信息 -->
        <div style="height: 200px; position: fixed; top: 60px; width: 100%; background-image: linear-gradient(to bottom, lightblue, white); display: flex;">
          <!--这个是占位的-->
          <div style="flex: 0; padding: 20px;">
          </div>
          <div style="flex: 40; padding: 20px;">
            <img src="@/assets/avatar1.png" alt="头像" style="width: 150px; height: 150px; border-radius: 50%;">
          </div>
          <div style="flex: 80; padding: 20px;">
            <h2 style="font-size: 30px; font-weight: bold;">{{ profile.detailedInformation.username }}</h2>
            <p>姓名：{{ profile.detailedInformation.first_name+profile.detailedInformation.last_name }}</p>
            <p>学历：{{ profile.detailedInformation.degree }}</p>
            <p>岗位：项目经理</p>
            <p>工龄：1年</p>
          </div>
          <div style="flex: 140; padding: 20px;">
            <p>&nbsp;</p>
            <p>&nbsp;</p>
            <p>邮箱：{{ profile.detailedInformation.email }}</p>
            <p>仓库：<a :href="profile.detailedInformation.repo" target="_blank">{{ profile.detailedInformation.repo }}</a></p>
            <p>博客：<a :href="profile.detailedInformation.blog" target="_blank">{{ profile.detailedInformation.blog }}</a></p>
          </div>
        </div>
    </div>
    <div style="height: 260px; display: flex; top: 0;">
      <div style="flex: 10; padding: 0px;">
      </div>
      <div style="flex: 180; padding: 20px;">
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane label="动态" name="first" class="larger-tab">这是二轮的动态
          </el-tab-pane>
          <el-tab-pane label="关注" name="second" class="larger-tab">这是二轮的关注</el-tab-pane>
          <el-tab-pane label="简历" name="third" class="larger-tab">
            <!--在这里写-->
            <!--在这里写-->
            <div style="display: flex; justify-content: space-between;">
              <div style="flex: 1; margin-right: 20px; padding: 20px; background-color: #f5f5f5; border-radius: 8px;">
                <h3>上传简历</h3>
                <el-upload
                  class="upload-demo"
                  drag
                  action="https://jsonplaceholder.typicode.com/posts/"
                  @change="handleFileUpload()"
                  multiple>
                  <i class="el-icon-upload"></i>
                  <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
                  <div class="el-upload__tip" slot="tip">只能上传pdf文件，且不超过3MB</div>
                </el-upload>
                <el-button  @click="uploadResume">点击上传
                </el-button>
              </div>
              <div style="flex: 1; padding: 20px; background-color: #f5f5f5; border-radius: 8px;">
                <h3>大模型优化简历</h3>
                <el-button size="small" type="primary" @click="optimizeResume">优化简历</el-button>
                <div v-if="optimizedResume" style="margin-top: 20px;">
                  <h4>优化后的简历</h4>
                  <pre>{{ optimizedResume }}</pre>
                </div>
              </div>
            </div>
          </el-tab-pane>
          <el-tab-pane label="修改信息" name="fourth">
            <div style="display: flex;">
              <div style="width: 50%;">
                <a-form-item label="姓" style="width: 20rem">
                  <a-input v-model:value="profile.first_name"/>
                </a-form-item>
                <a-form-item label="名" style="width: 20rem">
                  <a-input v-model:value="profile.last_name"/>
                </a-form-item>
                <a-form-item label="用户名" style="width: 20rem">
                  <a-input v-model:value="profile.username"/>
                </a-form-item>
                <a-form-item label="学历" style="width: 10rem">
                  <a-select v-model:value="profile.degree">
                    <a-select-option value="高中">高中</a-select-option>
                    <a-select-option value="本科">本科</a-select-option>
                    <a-select-option value="硕士">硕士</a-select-option>
                    <a-select-option value="博士">博士</a-select-option>
                  </a-select>
                </a-form-item>
                <a-form-item label="邮箱" style="width: 20rem">
                  <a-input v-model:value="profile.email"/>
                </a-form-item>
              </div>
              <div style="width: 50%;">
                <a-form-item label="兴趣岗位" style="width: 20rem">
                  <a-select
                    v-model:value="profile.interestJob"
                    mode="multiple"
                    style="width: 100%"
                    placeholder="Please select"
                    :options="[...Array(30)].map((_, i) => ({ value: interestOptions[i] }))"
                    @change="handleChange"
                  ></a-select>
                </a-form-item>
                <a-form-item label="博客" style="width: 20rem">
                  <a-input v-model:value="profile.blog"/>
                </a-form-item>
                <a-form-item label="仓库" style="width: 20rem">
                  <a-input v-model:value="profile.repo"/>
                </a-form-item>
                <a-form-item style="color: deepskyblue;">
                  <a-button @click="submit">提交修改</a-button>
                </a-form-item>
              </div>
            </div>
          </el-tab-pane>
        </el-tabs>
      </div>
      <div style="flex: 90; display: flex; justify-content: center; align-items: center; height: 100px;">
        <p style="font-size: 24px; margin: 0;">我的公司</p>

      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
//import axios from '@/utils/request'
import axios from '../utils/request';
import { onMounted } from 'vue';

import useTokenStore from '@/stores/useTokenStore'
const tokenStore = useTokenStore()
const profile = ref({
  username: '',
  first_name: '',
  last_name: '',
  name: '',
  email:'',
  degree: '',
  interestJob: [],
  blog: '',
  repo: '',
  avatar: '',
  file: null,
  detailedInformation:'',//放获取到的信息
});
const isEditable = ref(false);
const editableInterest = ref('');
const interestOptions = [
    "前端工程师",
    "后端工程师",
    "全栈工程师",
    "数据科学家",
    "数据分析师",
    "机器学习工程师",
    "人工智能工程师",
    "算法工程师",
    "大数据工程师",
    "云计算工程师",
    "DevOps工程师",
    "网络安全工程师",
    "移动应用开发工程师",
    "嵌入式系统工程师",
    "系统架构师",
    "数据库管理员",
    "自动化测试工程师",
    "游戏开发工程师",
    "AR/VR工程师",
    "物联网工程师",
    "自然语言处理工程师",
    "机器人工程师",
    "区块链开发工程师",
    "生物信息学工程师",
    "电商开发工程师",
    "计算机视觉工程师",
    "强化学习工程师",
    "NLP工程师",
    "技术支持工程师",
    "产品经理"
  ];
onMounted(() => {
  console.log('组件已挂载');
  const userId = 3;
  axios.get('/api/user/detail', {
      headers: {
        Authorization: tokenStore.getToken
      }
    })
  .then(response => {
    console.log('获取用户信息成功');
    console.log(response);
    console.log(response.data);
    //console.log(profile.detailedInformation.username) profile.value.detailedInformation.username
    profile.value.detailedInformation=response.data;
    console.log('111'+profile.value.detailedInformation.username)
  })
  .catch(error => {
    console.error('获取用户信息失败', error);
    // 可以在界面上显示错误信息或者其他处理
  });
});
const getOptions = () => {
    return interestOptions;
};
  const generateOptions = () => {
    return numbers.map((num, index) => ({
      value: `${num}`,
      label: `${num}`
    }));
  };
const handleFileUpload = (event) => {
  console.log('start upload')
  profile.value.file = event.target.files[0];
  console.log('Uploaded file:', profile.value.file);
  // Handle file upload logic here
};

const uploadResume = () => {
  // 创建一个 FormData 对象
  console.log('start call upload')
  const formData = new FormData();
  const fileInput = document.querySelector('input[type=file]'); // 通过选择器获取文件上传 input

  // 将文件添加到 FormData 中
  formData.append('file', profile.value.file); // 使用 Composition API 中的 file 属性

  axios.post('api/user/resume', formData, {
          headers: {
            Authorization: tokenStore.getToken
          }
        })
          .then(response => {
            console.log('1111111')
            alert('简历上传成功！')
          })
          .catch(error => {
            console.log(error)
          })
};

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
const submit = () => {
  const userId = 3;
  console.log('11111')
  console.log(profile.value)
  console.log('传过去的新数据是'+profile.value.degree)
  const formData = new FormData();
  //formData.append('user_id', 3);
  formData.append('username',profile.value.username)
  formData.append('degree',profile.value.degree)
  formData.append('email',profile.value.email)
  formData.append('first_name',profile.value.first_name)
  formData.append('last_name',profile.value.last_name)
  formData.append('blog',profile.value.blog)
  formData.append('repo',profile.value.repo)
  axios.patch('/api/user/detail', formData,{
      headers: {
        Authorization: tokenStore.getToken
      },
    })
  .then(response => {
    console.log('修改用户信息成功');
    console.log(response);
    console.log(response.data);
    //console.log(profile.detailedInformation.username) profile.value.detailedInformation.username
    profile.value.detailedInformation=response.data;
    console.log('111'+profile.value.detailedInformation.username)
  })
  .catch(error => {
    console.error('修改用户信息失败', error);
    // 可以在界面上显示错误信息或者其他处理
  });
};
const handleResumeUploadSuccess =()=>{

};
const handleResumeUploadError =()=>{

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
</style>
