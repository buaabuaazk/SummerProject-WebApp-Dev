<template>
    <el-row gutter="20">
            <el-col :span="6" v-for="o in workerList.length" :key="o"><div class="grid-content ep-bg-purple" />
                <el-card style="max-width: 500px">
                    <template #header>
                        <div class="card-header">
                            <span>{{'录用状态:'}}</span>
                            <el-button v-if="workerList[o-1].luyong==false" type="danger" :icon="Close" circle ></el-button>
                            <el-button v-if="workerList[o-1].luyong" type="success" :icon="Check" circle></el-button>
                        </div>
                    </template>
                    <!-- <p v-for="o in 2" :key="o" class="text item">{{ 'List item ' + o }}</p> -->
                    <span>{{'姓名:'+workerList[o-1].name}}</span>
                    <p class="text item">{{ '学历: ' + workerList[o-1].school }}</p>
                    <p class="text item">{{ '投递岗位: ' + workerList[o-1].job }}</p>
                    <template #footer>
                        <el-button type="primary" round>下载简历</el-button>
                        <el-button type="info" :icon="Message" round >
                            私信
                        </el-button>
                        <el-button type="warning" :icon="Check" round @click="Accept(o)">录用</el-button>
                    </template>
                </el-card>
            </el-col>
        
    
    </el-row>
    <el-row gutter="20">
        <a-card :title=workerList[0].name style="width: 23rem; margin-right: 1.5rem;">
            <template #extra><a href="#">150/天</a></template>
            <div>
              <div class="advantege" style="display: flex;">
                  <a-button type="text" style="margin-right: 1rem; background: #fafaf3;">免费午餐</a-button>
                  <a-button type="text" style="margin-right: 1rem; background: #fafaf3;">下午茶</a-button>
                  <a-button type="text" style="margin-right: 1rem; background: #fafaf3;">实习转正</a-button>
              </div>
              <div class="basic-info" style="display: flex; align-items: center; margin-top: 1rem; margin-left: 1rem;">
                  <EnvironmentOutlined />
                  <span  class="content" style="padding: 0; margin-right: 4rem; margin-left: 0.1rem;">北京</span>
                  <DashboardOutlined />
                  <span  class="content" style="margin: 0; margin-right: 4rem; margin-left: 0.11rem;">5天/周</span>
                  <IdcardOutlined />
                  <span  class="content" style="margin: 0; margin-left: 0.1rem;">3个月</span>
              </div>
              <a-divider style="margin-bottom: 0;"/>
              <div class="enterprise-info" style="display: flex; margin-bottom: 0;">
                <img src="https://sxsimg.xiaoyuanzhao.com/69/8D/69D89E01806ACAEE6472C6D5D5C7CC8D.jpg?x-oss-process=image/format,jpg/quality,q_90/resize,w_100"/>
                <div style="margin-top: 1rem;">
                  <p>字节跳动</p>
                  <p>互联网/游戏/软件</p>
                </div>
              </div>
            </div>
          </a-card>

          
        
    

    </el-row>

</template>

<script lang="ts" setup>
import { ref } from 'vue'
import dayjs from 'dayjs'
import { onMounted } from 'vue';
import axios from '../utils/request';

import {
    Check,
    Delete,
    Edit,
    Message,
    Search,
    Star,
    Close
} from '@element-plus/icons-vue'

const workerList=ref([
{
    luyong:false,
    name:"aaa",
    school:"本科",
    job:"产品经理"
},

])

const Download= ()=>{
    
}

const Accept=(x)=>{
    //workerList.value[x-1].luyong=true
    axios.post('/api/recruit/send_offer/',{
        enterprise_id:4,
        recruit_id:1,
        user_id:1
    })
}

onMounted(async ()=>{
    //let res1= await axios.get('http://100.98.24.78:8000/api/recruit/4/applicants/');
    var config = {
    method: 'get',
    url: 'http://100.98.24.78:8000/api/recruit/4/applicants/',
    headers: { 
        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzIxOTQ5MzAwLCJpYXQiOjE3MTg5MjUzMDAsImp0aSI6IjM5NjAwMjI3ZGUzZDQ1YTY4MDYzZjFkYTg1ZGJjMGIwIiwidXNlcl9pZCI6MX0.Rm_tZnQ9zcg9qLwWtEAjdjIj0J6zo0SqFiWMdB5ntdQ', 
        'User-Agent': 'Apifox/1.0.0 (https://apifox.com)', 
        'Accept': '*/*', 
        'Host': '100.98.24.78:8000', 
        'Connection': 'keep-alive', 
        
        },
    };

    let res1 = await axios(config)


    //let res1= await axios.get('/api/recruit/'+'1'+'/applicants/',);
    //workerList.value=res1.data
    for(let i=0;i<res1.data.received_resumes.length;i++){
        let x=await axios.get('http://100.98.24.78:8000/api/user/info?user_id='+'1',)
        workerList.value.push({
            luyong:false,
            name:x.data.username,
            school:x.data.degree,
            job:res1.data[i].job_name
        })
    }
})

</script>