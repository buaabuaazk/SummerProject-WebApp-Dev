<!--
 * @Author: aliyun0459792885-nakAm 1308199540@qq.com
 * @Date: 2024-06-24 14:29:21
 * @LastEditors: aliyun0459792885-nakAm 1308199540@qq.com
 * @LastEditTime: 2024-06-25 15:52:28
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
    <el-table-column fixed prop="name" label="岗位名称" width="300" />
    <el-table-column prop="salary" label="岗位薪资" width="200" />
    <el-table-column prop="number" label="招聘人数" width="150" />
    <el-table-column prop="address" label="工作地点" width="500" />
    <el-table-column prop="day" label="每周工作天数" width="150" />
    <el-table-column fixed="right" label="Operations" min-width="120">
      <template #default="scope">
        <el-button
          round
          type="info"
          size="small"
          @click="this.$router.push('/JobInfo')"
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

onMounted(() => {
      console.log('页面加载完成！');
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
  "enterprise_logo": "https://sxsimg.xiaoyuanzhao.com/61/80/619CBC6070EA409410303439DDF9B480.png",
  "enterprise_field": "",
  "recruiter": ""
})


const tableData = ref([
  
  
])

const SubmitForm = ()=>{
  tableData.value.push({
    date: form.value.job_name,
    name: form.value.job_name,
    salary: form.value.job_salary,
    number: form.value.number,
    address: form.value.job_location,
    day: form.value.job_day
  })
  dialogFormVisible.value=false
  //发送表单api
  var axios = require('axios');
  var FormData = require('form-data');
  var data = new FormData();
  data.append('enterprise', 1);
  data.append('introduction', 'zty');
  data.append('name', 'lzy');
  data.append('job_name', form.value.job_name);
  data.append('job_salary', form.value.job_salary);
  data.append('job_advantage', form.value.job_advantage);
  data.append('job_location', form.value.job_location);
  data.append('job_day', form.value.job_day);
  data.append('job_month', form.value.job_month);
  data.append('number', form.value.number);
  data.append('recruiter', '1');
  data.append('enterprise_filed', form.value.enterprise_field);

  var config = {
    method: 'post',
    url: '8.130.25.189:8000/api/recruit/recruit_create',
    headers: { 
      //'User-Agent': 'Apifox/1.0.0 (https://apifox.com)', 
      //...data.getHeaders()
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
}

const deleteRow = (index: number) => {
  tableData.value.splice(index, 1)
}

const onAddItem = () => {
  now.setDate(now.getDate() + 1)
  tableData.value.push({
    date: dayjs(now).format('YYYY-MM-DD'),
    name: 'Tom',
    salary: "",
    number: 0,
    address: 'No. 189, Grove St, Los Angeles',
    day: 5
  })
}
</script>

  
  