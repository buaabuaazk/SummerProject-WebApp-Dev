<!--
 * @Author: aliyun0459792885-nakAm 1308199540@qq.com
 * @Date: 2024-07-01 10:51:50
 * @LastEditors: aliyun0459792885-nakAm 1308199540@qq.com
 * @LastEditTime: 2024-07-01 16:24:52
 * @FilePath: /frontend2/src/views/ApplymentAction.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<!--
 * @Author: aliyun0459792885-nakAm 1308199540@qq.com
 * @Date: 2024-06-25 16:00:48
 * @LastEditors: aliyun0459792885-nakAm 1308199540@qq.com
 * @LastEditTime: 2024-07-01 10:53:55
 * @FilePath: /frontend1/src/views/ApplymentAction.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<!--
 * @Author: aliyun0459792885-nakAm 1308199540@qq.com
 * @Date: 2024-06-26 13:59:43
 * @LastEditors: aliyun0459792885-nakAm 1308199540@qq.com
 * @LastEditTime: 2024-06-28 09:45:51
 * @FilePath: /frontend1/src/views/Applyment2.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
    <el-table :data="workerList" style="width: 100%" max-height="100rem" stripe border >
        <el-table-column fixed prop="job_name" label="岗位名称" width="300rem" 
        :filters="[
            { text: '后端开发', value: '后端开发' },
            { text: '前端开发', value: '前端开发' },
            { text: '产品经理', value: '产品经理' },
            { text: '算法工程师', value: '算法工程师' },
            { text: '市场营销', value: '市场营销' },
            { text: '运营', value: '运营' },
            { text: '设计', value: '设计' },
        ]"
        :filter-method="filter4"
        filter-placement="bottom-end"/>
        
        <el-table-column prop="name" label="员工姓名" width="200rem">
        <template #default="scope">
            <el-popover effect="light" trigger="hover" placement="top" width="auto">
              <template #reference>
                <el-tag>{{ scope.row.name }}</el-tag>
              </template>
            </el-popover>
        </template>
        </el-table-column>
        <el-table-column prop="degree" label="学历" width="200rem" 
            :filters="[
            { text: '高中', value: '高中' },
            { text: '本科', value: '本科' },
            { text: '硕士', value: '硕士' },
            { text: '博士', value: '博士' },
            
        ]"
        :filter-method="filter3"
        filter-placement="bottom-end"
        />
        <el-table-column prop="status" label="录用状态" width="150rem" :filters="[
            { text: '录用', value: '录用' },
            { text: '未录用', value: '未录用' },         
        ]"
        :filter-method="filter2"
        filter-placement="bottom-end"/>

        <el-table-column fixed="right" label="录用" min-width="120rem">
          <template #default="scope">
            <el-button  round @click="Download(scope.row.resume_url)">下载简历</el-button>
            <el-button   round @click="sendmessage(scope.row.user_id)" >私信</el-button>
            <el-button   round @click="Accept(scope.row.user_id,scope.row.recruit_id)">录用</el-button>
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
import { useRouter,useRoute } from 'vue-router';
import { useMessageStore } from '@/stores/useMessageStore';

const router = useRouter()
const messageStore =useMessageStore()
interface Worker {
    status:String,
    name:String,
    degree:String,
    job_name:String,
    user_id:Number,
    resume_url:String,
    recruit_id:Number

}
const enterpriseid=ref(0)

const filter4 = (value: string, row:Worker ) => {
    return row.job_name === value
}
const filter3 = (value: string, row:Worker ) => {
    return row.degree === value
}
const filter2 = (value: string, row:Worker ) => {
    return row.status === value
}

var workerList:Worker[]=[
{
    status:'未录用',
    name:"小a",
    degree:"本科",
    job_name:"产品经理",
    user_id:2,
    resume_url:"https://2024summer-se-1316618142.cos.ap-beijing.myqcloud.com/resume/1-Resume.pdf",
    recruit_id: 96,
},
{
    status:'未录用',
    name:"小b",
    degree:"本科",
    job_name:"前端开发",
    user_id:2,
    resume_url:"https://2024summer-se-1316618142.cos.ap-beijing.myqcloud.com/resume/1-Resume.pdf",
    "recruit_id": 96,
},
{
    status:'未录用',
    name:"小c",
    degree:"硕士",
    job_name:"后端开发",
    user_id:2,
    resume_url:"https://2024summer-se-1316618142.cos.ap-beijing.myqcloud.com/resume/1-Resume.pdf",
    "recruit_id": 96,
}]
const Download= async (x)=>{
    
    const link = document.createElement('a');
    console.log(x)
    link.href = x // Replace with the actual path to the resume file
    link.download = 'resume.pdf';
    link.click();

}

const Accept=(x,y)=>{
    //workerList.value[x-1].luyong=true
    console.log(x)
    let res=axios.post('/api/recruit/send_offer/',{
        enterprise_id:enterpriseid.value,
        recruit_id:y,
        user_id:x
    })
    console.log(x,y)
}

const sendmessage=(x)=>{
    //messageStore.setContactId(x)
    messageStore.openMessageBox()
}

onMounted(async ()=>{
    //console.log(typeof(useRoute().params.id))
    //sendmessage(4)
    let str=useRoute().params.id
    //console.log(str)
    let id=Number(str)
    enterpriseid.value=Number(str)
    var config = {
    method: 'get',
    url: '/api/recruit/'+useRoute().params.id+'/applicants/',
    headers: { 
        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzIxOTQ5MzAwLCJpYXQiOjE3MTg5MjUzMDAsImp0aSI6IjM5NjAwMjI3ZGUzZDQ1YTY4MDYzZjFkYTg1ZGJjMGIwIiwidXNlcl9pZCI6MX0.Rm_tZnQ9zcg9qLwWtEAjdjIj0J6zo0SqFiWMdB5ntdQ', 
        },
    };

    let res1 = await axios(config)
    
    console.log(res1)
    //workerList=res1.data
    //console.log(workerList)
    for(let i=0;i<res1.data.length;i++){
        for(let j=0;j<res1.data[i].received_resumes.length;j++){
        workerList.push({
            status:'',
            name:'小'+i,
            degree:'博士',
            job_name:res1.data[i].job_name,
            user_id:res1.data[i].received_resumes[j].user_id,
            //resume_url:'https://2024summer-se-1316618142.cos.ap-beijing.myqcloud.com/resume/1-Resume.pdf'
            resume_url:res1.data[i].received_resumes[j].resume_url,
            recruit_id: res1.data[i].recruit_id,
        })
    }
    }
    /*for(let i=0;i<res1.data.length;i++){
        for(let j=0;j<res1.data[i].received_resumes.length;j++){
        let x=await axios.get('/api/user/info?user_id='+res1.data[i].received_resume[j].user_id,)
        workerList.push({
            status:'',
            name:x.data.username,
            degree:x.data.degree,
            job_name:res1.data[i].job_name,
            user_id:res1.data[i].received_resume[j].user_id,
            resume_url:res1.data[i].received_resume[j].resume_url
        })
        }
    }*/
    
   
})


</script>