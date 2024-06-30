<!--
 * @Author: aliyun0459792885-nakAm 1308199540@qq.com
 * @Date: 2024-06-24 14:29:21
 * @LastEditors: aliyun0459792885-nakAm 1308199540@qq.com
 * @LastEditTime: 2024-06-27 11:16:07
 * @FilePath: /frontend/src/views/Recruitment.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<!--
 * @Date: 2024-06-23 18:00:47
 * @Author: Q9K
 * @Description: 企业管理员发布招聘信息的表单页面
-->
<!-- Card Blog -->
<!-- Timeline -->
<template>
  <el-table :data="tableData" style="width: 100%" max-height="250">
    
  </el-table>

  <el-row :gutter="20">
  <!-- <el-col :span="6" v-for="o in " :key="o"><div class="grid-content ep-bg-purple" /> -->
    <el-col :span="6" class="grid-content ep-bg-purple" v-for="item in tableData"> 
    <a-card  :title=item.job_name style="width: 23rem; margin-right: 1.5rem;">
    <template #extra><a href="#">{{item.job_salary}}</a></template>
    <div>
        <div class="advantege" style="display: flex;">
        <a-button type="text" style="margin-right: 1rem; background: #fafaf3;">{{item.job_advantage.优势1}}</a-button>
        <a-button type="text" style="margin-right: 1rem; background: #fafaf3;">{{item.job_advantage.优势2}}</a-button>
        <!-- <a-button type="text" style="margin-right: 1rem; background: #fafaf3;">{{item.job_advantage.优势3}}</a-button> -->
    </div>
    <div class="basic-info" style="display: flex; align-items: center; margin-top: 1rem; margin-left: 1rem;">
        <EnvironmentOutlined />
        <span  class="content" style="padding: 0; margin-right: 4rem; margin-left: 0.1rem;">{{item.job_location}}</span>
        <DashboardOutlined />
        <span  class="content" style="margin: 0; margin-right: 4rem; margin-left: 0.11rem;">{{item.job_day}}天/周</span>
        <IdcardOutlined />
        <span  class="content" style="margin: 0; margin-left: 0.1rem;">{{item.job_month}}月/年</span>
    </div>
    <a-divider style="margin-bottom: 0;"/>
    <div class="enterprise-info" style="display: flex; margin-bottom: 0;">
        <!-- <img src="https://sxsimg.xiaoyuanzhao.com/69/8D/69D89E01806ACAEE6472C6D5D5C7CC8D.jpg?x-oss-process=image/format,jpg/quality,q_90/resize,w_100"/> -->
        <!-- <img :src="item.enterprise_icon"> -->
        <div style="margin-top: 1rem;">
            <p>工作领域：{{item.enterprise_field}}</p>
            <p>工作要求:{{item.job_request.需求1}}</p>
            <p>需求人数:{{item.job_needed_people}}</p>
        </div>
    </div>
    </div>
  </a-card>
</el-col>
</el-row>
  <!-- </el-col> -->

  
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import dayjs from 'dayjs'
import { onMounted } from 'vue';
import axios from '../utils/request';

onMounted(async () => {
      console.log('页面加载完成！');
      console.log(tableData)
      let res=await axios.get('http://10.251.255.229/api/recruit/16')
      console.log(res.data[1].job_request)
      /*for(let i=0;i<res.data.length;i++)
      {
        res.data[i].job_request=JSON.parse(res.data[i].job_request)
        console.log(res.data[i].job_request)
      }
      */
      tableData.value=res.data
      /*for(let i=0;i<tableData.value.length;i++)
      {
        tableData.value[i].job_request=JSON.parse(tableData.value[i].job_request)
      }*/
      console.log(res)
      //更新tabledata
    });

const now = new Date()
const user_type = ref("manager") 

const dialogTableVisible = ref(false)
const dialogFormVisible = ref(false)
const formLabelWidth = '160px'

const form = ref({
  "enterprise":1,
  "introduction":"",
  "job_name": "",
  "job_salary": "",
  "job_advantage": "",
  "job_location": "",
  "number":"",
  "job_day": "",
  "job_month":"",
  "job_request":"",
  "enterprise_field": "",
  "enterprise_icon":""
})

const tableData = ref([

])

const SubmitForm = ()=>{
  /*tableData.value.push({
  'enterprise':1,
  'introduction':'zty',
  'name':'lzy',
  'job_name':form.value.job_name,
  'job_salary':form.value.job_salary,
  'job_advantage':form.value.job_advantage,
  'job_location':form.value.job_location,
  'job_day':form.value.job_day,
  'job_month':form.value.job_month,
  'number':form.value.number,
  'job_request':form.value.job_request,
  'enterprise_field':form.value.enterprise_field,
  'enterprise_icon':form.value.enterprise_icon
  })
  */
  
  dialogFormVisible.value=false
  //发送表单api
  
  axios.post('http://100.98.24.78:8000/api/recruit/recruit_create',{
  'enterprise':4,
  'introduction':'zty',
  'name':'lzy',
  'job_name':form.value.job_name,
  'job_salary':form.value.job_salary,
  'job_advantage':form.value.job_advantage,
  'job_location':form.value.job_location,
  'job_day':form.value.job_day,
  'job_month':form.value.job_month,
  'number':form.value.number,
  'job_request':form.value.job_request,
  'enterprise_field':form.value.enterprise_field,
  'enterprise_icon':form.value.enterprise_icon
})

}

const deleteRow = (index: number) => {
  tableData.value.splice(index, 1)
}

/*const onAddItem = () => {
  now.setDate(now.getDate() + 1)
  tableData.value.push({
    date: dayjs(now).format('YYYY-MM-DD'),
    name: 'Tom',
    salary: "",
    number: 0,
    address: '',
    day: 5
  })
}
*/
</script>
