<!--
 * @Author: aliyun0459792885-nakAm 1308199540@qq.com
 * @Date: 2024-06-26 13:59:43
 * @LastEditors: aliyun0459792885-nakAm 1308199540@qq.com
 * @LastEditTime: 2024-06-26 22:00:39
 * @FilePath: /frontend1/src/views/Applyment2.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
    <el-table :data="workerList" style="width: 100%" max-height="250" stripe border >
        <el-table-column fixed prop="job_name" label="岗位名称" width="300" 
        :filters="[
            { text: '后端开发', value: '后端开发' },
            { text: '前端开发', value: '前端开发' },
            { text: '产品经理', value: '前端开发' },
            { text: '算法工程师', value: '前端开发' },
            { text: '市场营销', value: '前端开发' },
            { text: '运营', value: '前端开发' },
            { text: '设计', value: '前端开发' },
        ]"
        :filter-method="filter4"
        filter-placement="bottom-end"/>
        
        <el-table-column prop="name" label="员工姓名" width="200">
        <template #default="scope">
            <el-popover effect="light" trigger="hover" placement="top" width="auto">
              <template #reference>
                <el-tag>{{ scope.row.name }}</el-tag>
              </template>
            </el-popover>
        </template>
        </el-table-column>
        <el-table-column prop="degree" label="学历" width="200" 
            :filters="[
            { text: '高中', value: '高中' },
            { text: '本科', value: '本科' },
            { text: '硕士', value: '硕士' },
            { text: '博士', value: '博士' },
            
        ]"
        :filter-method="filter3"
        filter-placement="bottom-end"
        />
        <el-table-column prop="status" label="录用状态" width="150" :filters="[
            { text: '录用', value: '录用' },
            { text: '未录用', value: '未录用' },         
        ]"
        :filter-method="filter2"
        filter-placement="bottom-end"/>

        <el-table-column fixed="right" label="录用" min-width="120">
          <template #default="scope">
            <el-button type="primary" round @click="Download(scope.row.resume_url)">下载简历</el-button>
            <el-button type="info" :icon="Message" round >私信</el-button>
            <el-button type="warning" :icon="Check" round @click="Accept(scope.row.user_id)">录用</el-button>
            <!-- @click.prevent="deleteRow(scope.$index)" -->
          </template>
        </el-table-column>
      </el-table>
      
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

interface Worker {
    status:String,
    name:String,
    degree:String,
    job_name:String,
    user_id:Number,
    resume_url:String
}

const filter4 = (value: string, row:Worker ) => {
  return row.job_name === value
}
const filter3 = (value: string, row:Worker ) => {
  return row.degree === value
}
const filter2 = (value: string, row:Worker ) => {
  return row.status === value
}

const workerList:Worker[]=[
{
    status:'未录用',
    name:"aaa",
    degree:"本科",
    job_name:"产品经理",
    user_id:2,
    resume_url:"https://2024summer-se-1316618142.cos.ap-beijing.myqcloud.com/resume/1-Resume.pdf"
}]

const Download= async (x)=>{
    
    const link = document.createElement('a');
    console.log(x)
    link.href = x // Replace with the actual path to the resume file
    link.download = 'resume.pdf';
    link.click();

}

const Accept=(x)=>{
    //workerList.value[x-1].luyong=true
    console.log(x)
    axios.post('/api/recruit/send_offer/',{
        enterprise_id:4,
        recruit_id:1,
        user_id:x
    })
}

onMounted(async ()=>{
    //let res1= await axios.get('http://100.98.24.78:8000/api/recruit/4/applicants/');
    //let res1= await axios.get('/api/recruit/'+'1'+'/applicants/',);
    //workerList.value=res1.data
    var config = {
    method: 'get',
    url: 'http://100.92.39.61:8000/api/recruit/4/applicants/',
    headers: { 
        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzIxOTQ5MzAwLCJpYXQiOjE3MTg5MjUzMDAsImp0aSI6IjM5NjAwMjI3ZGUzZDQ1YTY4MDYzZjFkYTg1ZGJjMGIwIiwidXNlcl9pZCI6MX0.Rm_tZnQ9zcg9qLwWtEAjdjIj0J6zo0SqFiWMdB5ntdQ', 
        
        
        },
    };

    let res1 = await axios(config)
    //let resdata=ref([])
    //resdata=res1.data.received_resumes
    console.log(res1.data)
    for(let i=0;i<res1.data.length;i++){
        for(let j=0;j<res1.data[i].received_resumes.length;j++){
        let x=await axios.get('http://100.92.39.61:8000/api/user/info?user_id='+res1.data[i].received_resume[j].user_id,)
        workerList.push({
            status:'',
            name:x.data.username,
            degree:x.data.degree,
            job_name:res1.data[i].job_name,
            user_id:res1.data[i].received_resume[j].user_id,
            resume_url:res1.data[i].received_resume[j].resume_url
        })
        }
    }
    /*for(let i=0;i<res1.data.received_resumes.length;i++){
        let x=await axios.get('http://100.98.24.78:8000/api/user/info?user_id='+res1.data.received_resume[i].user_id,)
        workerList.push({
            status:'',
            name:x.data.username,
            degree:x.data.degree,
            job_name:res1.data.job_name,
            user_id:res1.data.received_resume[i].user_id
        })
    }
    */
})


</script>