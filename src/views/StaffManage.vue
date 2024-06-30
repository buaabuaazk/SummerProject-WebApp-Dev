<template>
    <el-table :data="staffList" style="width: 100%" max-height="500" stripe border :default-sort="{ prop: 'date', order: 'descending' }">
        <el-table-column prop="name" label="员工姓名" width="200">
            <template #default="scope">
                <el-popover effect="light" trigger="hover" placement="top" width="auto">
                  <template #reference>
                    <el-tag>{{ scope.row.name }}</el-tag>
                  </template>
                </el-popover>
            </template>
            </el-table-column>
        <el-table-column fixed prop="job" label="岗位名称" width="300" 
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
        

        <el-table-column prop="work_age" label="工龄" width="200" sortable/>
        <el-table-column prop="status" label="员工类型" width="150" :filters="[
            { text: '管理员', value: '管理员' },
            { text: '普通员工', value: '普通员工' },         
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


interface Staff {
    "id": Number,
    "is_admin": boolean,
    "work_age": Number,
    "job": String,
    "user": Number,
    "enterprise": Number,
    "name":String,
    "status":String
}

const filter4 = (value: string, row:Staff ) => {
    return row.job === value
}
/*const filter3 = (value: string, row:Staff ) => {
    return row.degree === value
}*/
const filter2 = (value: string, row:Staff ) => {
    return row.status === value
}

var staffList:Staff[]=[
    {
            "id": 22,
            "is_admin": false,
            "work_age": 0,
            "job": "测试工程师",
            "user": 16,
            "enterprise": 24,
            "name":'小明',
            "status":"普通员工"
        },
]

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
        staffList.push({
            "id": 22,
            "is_admin": false,
            "work_age": 0,
            "job": "测试工程师",
            "user": 16,
            "enterprise": 24,
            "name":'小明',
            "status":"普通员工"
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