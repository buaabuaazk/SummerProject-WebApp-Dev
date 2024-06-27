<!--
 * @Author: aliyun0459792885-nakAm 1308199540@qq.com
 * @Date: 2024-06-24 14:29:21
 * @LastEditors: aliyun0459792885-nakAm 1308199540@qq.com
 * @LastEditTime: 2024-06-27 15:10:30
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
    <el-table-column fixed prop="job_name" label="岗位名称" width="300" />
    <el-table-column prop="job_salary" label="岗位薪资" width="200" />
    <el-table-column prop="job_needed_people" label="招聘人数" width="150" />
    <el-table-column prop="job_location" label="工作地点" width="500" />
    <el-table-column prop="job_day" label="每周工作天数" width="150" />
    <el-table-column fixed="right" label="Operations" min-width="120">
      <template #default="scope">
        <el-button
          round
          type="info"
          size="small"
          @click="router.push('/JobInfo')"
        >
          详情
        </el-button>
        <!-- @click.prevent="deleteRow(scope.$index)" -->
      </template>
    </el-table-column>
  </el-table>
  <el-button class="mt-4" style="width: 100%" v-if="user_type=== 'manager' " @click="dialogFormVisible = true">
    发布岗位
  </el-button>
  <el-dialog v-model="dialogFormVisible" title="岗位信息" width="500">
    <el-form :model="form">
      <el-form-item label="岗位名称" :label-width="formLabelWidth">
        <el-input v-model="form.job_name" autocomplete="off" />
      </el-form-item>
      <el-form-item label="岗位薪资" :label-width="formLabelWidth">
        <el-input v-model="form.job_salary" autocomplete="off" />
      </el-form-item>
      <el-form-item label="岗位优势" :label-width="formLabelWidth">
        <el-select v-model="form.job_advantage" placeholder="该岗位有哪些优势" multiple>
          <el-option label="不加班" value="不加班" />
          <el-option label="餐补" value="餐补" />
          <el-option label="下午茶" value="下午茶" />
          <el-option label="可转正实习" value="可转正实习" />
          <el-option label="五险一金" value="五险一金" />
          <el-option label="晋升速度快" value="晋升速度快" />
        </el-select>
      </el-form-item>
      <el-form-item label="工作地点" :label-width="formLabelWidth">
        <el-input v-model="form.job_location" autocomplete="off" />
      </el-form-item>
      <el-form-item label="每周工作时间" :label-width="formLabelWidth">
        <el-input v-model="form.job_day" autocomplete="off" />
      </el-form-item>
      <el-form-item label="最少工作月数" :label-width="formLabelWidth">
        <el-input v-model="form.job_month" autocomplete="off" />
      </el-form-item>
      <el-form-item label="企业领域" :label-width="formLabelWidth">
        <el-select v-model="form.enterprise_field" placeholder="选择企业/招聘岗位的领域分类">
          <el-option label="互联网" value="互联网" />
          <el-option label="游戏" value="游戏" />
          <el-option label="软件开发" value="软件开发" />
          <el-option label="制造业" value="制造业" />
          <el-option label="农业" value="农业" />
          <el-option label="生物医学" value="生物医学" />
        </el-select>
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取消</el-button>
        <el-button type="primary" @click="SubmitForm()">
          确认发布
        </el-button>
      </div>
    </template>
  </el-dialog>


</template>

<script lang="ts" setup>
import { ref } from 'vue'
import dayjs from 'dayjs'
import { onMounted } from 'vue';
import axios from '../utils/request';
import { useRouter } from 'vue-router';
const router = useRouter()
onMounted(async () => {
      console.log('页面加载完成！');
      console.log(tableData)
      let res=await axios.get('http://100.92.39.61:8000/api/recruit/16')
      tableData.value=res.data
      console.log(res)
      //更新tabledata
    });

const now = new Date()
const user_type = ref("manager") 

const dialogTableVisible = ref(false)
const dialogFormVisible = ref(false)
const formLabelWidth = '160px'

const form = ref({
  "enterprise":11,
  "introduction":"",
  "job_name": "",
  "job_salary": "",
  "job_advantage": ['a','b','c'],
  "job_location": "",
  "number":6,
  "job_day": 5,
  "job_month":6,
  "job_request":['a','b','c'],
  "enterprise_name":"",
  "enterprise_field": "",
  "enterprise_icon":""
})

const tableData = ref([])

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
  })*/
  
  dialogFormVisible.value=false
  //发送表单api
  let data1={
    
  'enterprise':16,
  'job_name':form.value.job_name,
  'job_salary':form.value.job_salary,
  'job_advantage':{
    "优势1": "免费班车",
    "优势2": "周末双休"
  },
  'created_at':"2024-06-29",
  'job_location':form.value.job_location,
  'job_day':form.value.job_day,
  'job_month':form.value.job_month,
  'job_request':{
    "需求1": "熟悉Docker、Kubernetes或者Openstack,并有相关研发和优化经验优先",
    "需求2": "有信创国产化研发和测试经验优先"
  },
  'job_content': {
      "内容1": "协助MA整理材料文献,核对资料等（肺癌）",
      "内容2": "深度参与医学部项目，并参会议进行讨论",
      "内容3": "在国际化的工作环境中，深入了解医药行业的商业模式和产业结构",
      "内容4": "与内外部同事沟通与配合，全方位支持医学部工作运行 任职资格"
    },
  'enterprise_field':form.value.enterprise_field,
  'enterprise_icon':form.value.enterprise_icon,
  'enterprise_name':"哇哦互联",
  'job_interested_id':[
    1,2,3,7,9,10,11
  ],
  "job_needed_people":form.value.number
  }



  var data = JSON.stringify({
   "job_name":form.value.job_name ,
   "job_salary": "35-45K",
   "job_advantage": {
      "优势1": "免费班车",
      "优势2": "周末双休"
   },
   "job_location": "深圳",
   "job_day": 5,
   "job_month": 6,
   "enterprise": 16,
   "created_at": "2024-06-29T10:10:34.700582+08:00",
   "job_needed_people": 6,
   "job_interested_id": [
      1,
      2,
      3,
      7,
      9,
      10,
      11
   ],
   "job_request": {
      "需求1": "熟悉Docker、Kubernetes或者Openstack，并有相关研发和优化经验优先",
      "需求2": "有信创国产化研发和测试经验优先"
   },
   "job_content": {
      "内容1": "协助MA整理材料文献，核对资料等（肺癌）",
      "内容2": "深度参与医学部项目，并参会议进行讨论",
      "内容3": "在国际化的工作环境中，深入了解医药行业的商业模式和产业结构",
      "内容4": "与内外部同事沟通与配合，全方位支持医学部工作运行 任职资格"
   },
   "enterprise_name": "哇哦互联",
   "enterprise_field": "互联网",
   "enterprise_icon": "https://sxsimg.xiaoyuanzhao.com/2B/EE/2BFD5C732B853B5ACAE0CB397EEC99EE.jpeg"
});

var config = {
   method: 'post',
   url: 'http://100.92.39.61:8000/api/recruit/recruit_create',
   headers: { 
      'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzIyMTY4NjY0LCJpYXQiOjE3MTkxNDQ2NjQsImp0aSI6ImViYTk3OWM0YmQ4NzQ3MWQ4OWFhMTgzMjYyYjczZWY2IiwidXNlcl9pZCI6M30.9JXjllHVQ3sEl5-eO5YpUAAOojMSAXH9tAdsEX7N2Bc', 
      'User-Agent': 'Apifox/1.0.0 (https://apifox.com)', 
      'Content-Type': 'application/json', 
      'Accept': '*/*', 
      'Host': '100.92.39.61:8000', 
      'Connection': 'keep-alive'
   },
   data : data
};

axios(config)
.then(function (response) {
   console.log(JSON.stringify(response.data));
})
.catch(function (error) {
   console.log(error);
});
  /*let res=axios.post('http://100.98.24.78:8000/api/recruit/recruit_create',{
  'enterprise':11,
  'job_name':form.value.job_name,
  'job_salary':form.value.job_salary,
  'job_advantage':{
    "优势1": "免费班车",
    "优势2": "周末双休"
  },
  'created_at':"2024-06-29",
  'job_location':form.value.job_location,
  'job_day':form.value.job_day,
  'job_month':form.value.job_month,
  'job_request':{
    "需求1": "熟悉Docker、Kubernetes或者Openstack,并有相关研发和优化经验优先",
    "需求2": "有信创国产化研发和测试经验优先"
  },
  'job_content': {
      "内容1": "协助MA整理材料文献,核对资料等（肺癌）",
      "内容2": "深度参与医学部项目，并参会议进行讨论",
      "内容3": "在国际化的工作环境中，深入了解医药行业的商业模式和产业结构",
      "内容4": "与内外部同事沟通与配合，全方位支持医学部工作运行 任职资格"
    },
  'enterprise_field':form.value.enterprise_field,
  'enterprise_icon':form.value.enterprise_icon,
  'enterprise_name':'抖音',
  'job_interested_id':[
    1,2,3,7,9,10,11
  ],
  "job_needed_people":form.value.number
})*/
//let res=axios.post('http://100.92.39.61:8000/api/recruit/recruit_create',JSON.stringify(data1))
//console.log(res)

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

  
  