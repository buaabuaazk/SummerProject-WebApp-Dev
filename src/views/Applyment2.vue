<!--
 * @Author: aliyun0459792885-nakAm 1308199540@qq.com
 * @Date: 2024-06-26 13:59:43
 * @LastEditors: aliyun0459792885-nakAm 1308199540@qq.com
 * @LastEditTime: 2024-06-27 12:01:26
 * @FilePath: /frontend1/src/views/Applyment2.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
    <el-table :data="workerList" style="width: 100%" max-height="250" stripe border >
        <el-table-column fixed prop="job_name" label="岗位名称" width="300" />
        
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
            
        />
        <el-table-column prop="status" label="录用状态" width="150" 
        />

        <el-table-column fixed="right" label="录用" min-width="120">
          <template #default="scope">
            <el-button type="primary" round @click="Download(scope.row.resume_url)">下载简历</el-button>
            <!-- <el-button type="info" :icon="Message" round >私信</el-button> -->
            <!-- <el-button type="warning" :icon="Check" round @click="Accept(scope.row.user_id)">录用</el-button> -->
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






const workerList=ref([
{
    status:'未录用',
    name:"aaa",
    degree:"本科",
    job_name:"产品经理",
    user_id:2,
    resume_url:"https://2024summer-se-1316618142.cos.ap-beijing.myqcloud.com/resume/1-Resume.pdf"
}])

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
        enterprise_id:11,
        recruit_id:1,
        user_id:x
    })
}




</script>