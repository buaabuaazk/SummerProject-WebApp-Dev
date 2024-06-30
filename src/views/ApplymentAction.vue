<!--
 * @Author: aliyun0459792885-nakAm 1308199540@qq.com
 * @Date: 2024-06-25 16:00:48
 * @LastEditors: aliyun0459792885-nakAm 1308199540@qq.com
 * @LastEditTime: 2024-06-30 09:07:52
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
    <el-table :data="workerList" style="width: 100%" max-height="500" stripe border >
        <el-table-column fixed prop="job_name" label="岗位名称" width="300" 
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
            <el-button type="info"  round >私信</el-button>
            <el-button type="warning"  round @click="Accept(scope.row.user_id)">录用</el-button>
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

var workerList:Worker[]=[
{
    status:'未录用',
    name:"小a",
    degree:"本科",
    job_name:"产品经理",
    user_id:2,
    resume_url:"https://2024summer-se-1316618142.cos.ap-beijing.myqcloud.com/resume/1-Resume.pdf"
},
{
    status:'未录用',
    name:"小b",
    degree:"本科",
    job_name:"前端开发",
    user_id:2,
    resume_url:"https://2024summer-se-1316618142.cos.ap-beijing.myqcloud.com/resume/1-Resume.pdf"
},
{
    status:'未录用',
    name:"小c",
    degree:"硕士",
    job_name:"后端开发",
    user_id:2,
    resume_url:"http://10.134.136.68:9996/#/student/course/073e210b6029568d03c268c03fdde534/homework/9477c56c062eb97e4e95ed7806817e5b:~:text=%E5%9B%9E%E9%A1%BE%E4%BC%9A%E8%AE%AE%E5%8F%82%E8%80%83-,%E9%97%AE%E9%A2%98,-%E5%88%97%E8%A1%A8.jpg"
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
    let res=axios.post('http://10.251.255.229/api/recruit/send_offer/',{
        enterprise_id:11,
        recruit_id:1,
        user_id:x
    })
    console.log(res)
}

onMounted(async ()=>{
   
    var config = {
    method: 'get',
    url: 'http://10.251.255.229/api/recruit/16/applicants/',
    headers: { 
        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzIxOTQ5MzAwLCJpYXQiOjE3MTg5MjUzMDAsImp0aSI6IjM5NjAwMjI3ZGUzZDQ1YTY4MDYzZjFkYTg1ZGJjMGIwIiwidXNlcl9pZCI6MX0.Rm_tZnQ9zcg9qLwWtEAjdjIj0J6zo0SqFiWMdB5ntdQ', 
        },
    };

    let res1 = await axios(config)
    //let resdata=ref([])
    //resdata=res1.data.received_resumes
    console.log(res1)
    //workerList=res1.data
    //console.log(workerList)
    for(let i=0;i<res1.data.length;i++){
        workerList.push({
            status:'',
            name:'小'+i,
            degree:'master',
            job_name:res1.data[i].job_name,
            user_id:2,
            resume_url:''
        })
    }
    /*for(let i=0;i<res1.data.length;i++){
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
    }*/
    
   
})


</script>