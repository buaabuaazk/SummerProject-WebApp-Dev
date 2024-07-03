<!--
 * @Author: aliyun0459792885-nakAm 1308199540@qq.com
 * @Date: 2024-06-24 14:29:21
 * @LastEditors: aliyun0459792885-nakAm 1308199540@qq.com
 * @LastEditTime: 2024-07-01 16:20:01
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
  <el-table :data="tableData" style="width: 100%" max-height="32rem" :default-sort="{ prop: 'job_day', order: 'descending' }">
    <el-table-column fixed prop="job_name" label="岗位名称" width="250rem" :filters="[
      { text: '后端开发', value: '后端开发' },
      { text: '前端开发', value: '前端开发' },
      { text: '产品经理', value: '产品经理' },
      { text: '算法工程师', value: '算法工程师' },
      { text: '市场营销', value: '市场营销' },
      { text: '运营', value: '运营' },
      { text: '设计', value: '设计' },
  ]"
  :filter-method="filter1"
  filter-placement="bottom-end"/>
    <el-table-column prop="job_salary" label="岗位薪资" width="250rem" sortable/>
    <el-table-column prop="job_needed_people" label="招聘人数" width="100rem" sortable />
    <el-table-column prop="job_location" label="工作地点" width="350rem" />
    <el-table-column prop="job_day" label="每周工作天数" width="100rem"  sortable/>
    <el-table-column fixed="right" label="Operations" min-width="100rem">
      <template #default="scope">
        <el-button
          round
          type="info"
          size="small"
          @click="router.push(`/JobInfo/${scope.row.recruit_id}`)"
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
    <el-form :model="form" >
      <el-form-item label="岗位名称" :label-width="formLabelWidth" >
        <el-input v-model="form.job_name" autocomplete="off" />
      </el-form-item>
      <el-form-item label="岗位薪资" :label-width="formLabelWidth">
        <el-input v-model="form.job_salary" autocomplete="off" />
      </el-form-item>
      <el-form-item label="岗位优势" :label-width="formLabelWidth" >
        <el-select v-model="form.job_advantage" placeholder="该岗位有哪些优势" 
        multiple
        filterable
        allow-create
        default-first-option>
          <el-option label="不加班" value="不加班" />
          <el-option label="餐补" value="餐补" />
          <el-option label="下午茶" value="下午茶" />
          <el-option label="可转正实习" value="可转正实习" />
          <el-option label="五险一金" value="五险一金" />
          <el-option label="晋升速度快" value="晋升速度快" />
          <el-option label="带薪年假" value="带薪年假" />
          <el-option label="股权激励" value="股权激励" />
        </el-select>
      </el-form-item>
      <el-form-item label="工作地点" :label-width="formLabelWidth">
        <el-input v-model="form.job_location" autocomplete="off" />
      </el-form-item>
      <el-form-item label="工作内容" :label-width="formLabelWidth" >
        <el-select v-model="form.job_content" placeholder="该岗位的工作内容" 
        multiple
        filterable
        allow-create
        default-first-option>
          
        </el-select>
      </el-form-item>
      <el-form-item label="岗位需求" :label-width="formLabelWidth" >
        <el-select v-model="form.job_request" placeholder="该岗位需要何种员工" 
        multiple
        filterable
        allow-create
        default-first-option>
          
        </el-select>
      </el-form-item>
      <el-form-item label="每周工作天数" :label-width="formLabelWidth" sortable>
        <el-input v-model="form.job_day" autocomplete="off" />
      </el-form-item>
      <el-form-item label="最少工作月数" :label-width="formLabelWidth">
        <el-input v-model="form.job_month" autocomplete="off" />
      </el-form-item>
      <el-form-item label="企业领域" :label-width="formLabelWidth" >
        <el-select v-model="form.enterprise_field" placeholder="选择企业/招聘岗位的领域分类"
        multiple
        filterable
        allow-create
        default-first-option>
          <el-option label="互联网" value="互联网" />
          <el-option label="游戏" value="游戏" />
          <el-option label="软件开发" value="软件开发" />
          <el-option label="制造业" value="制造业" />
          <el-option label="农业" value="农业" />
          <el-option label="生物医学" value="生物医学" />
          <el-option label="行业运营" value="行业运营" />
          <el-option label="市场营销" value="市场营销" />
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
import { useRouter,useRoute} from 'vue-router';
import { ClassDictionary } from 'clsx';
const router = useRouter()
const props = defineProps({
  id: {
    type: [String, Number],
    required: true
  }
})

onMounted(async () => {
      console.log('页面加载完成！');
      //console.log(typeof(useRoute().params.id))
      let str=useRoute().params.id
      //console.log(str)
      let id=Number(str)
      form.value.enterprise=Number(str)
      console.log(form.value.enterprise)
      let res=await axios.get('/api/recruit/'+id)
      for(let i=0;i<res.data.length;i++){
        tableData.push({
        "recruit_id": res.data[i].recruit_id,
        "job_name": res.data[i].job_name,
        "job_salary": res.data[i].job_salary,
        "job_advantage": res.data[i].job_advantage,
        "job_location": res.data[i].job_location,
        "job_day": res.data[i].job_day,
        "job_month": res.data[i].job_month,
        "created_at": res.data[i].created_at,
        "job_needed_people": res.data[i].job_needed_people,
        "job_request": res.data[i].job_request,
        "job_content": res.data[i].job_content,
        "enterprise_name": res.data[i].enterprise_name,
        "enterprise_field": res.data[i].enterprise_field,
        "enterprise_icon": res.data[i].enterprise_icon,
        "enterprise": res.data[i].enterprise,
        "job_interested_id": res.data[i].job_interested_id,
        "received_resumes": res.data[i].received_resumes,
        "tag": res.data[i].tag
        })
      }
      
      //tableData=res.data
      //console.log(res)
      console.log(tableData)
      //tableData[1].job_advantage['优势2']='aaaaaa'
      //console.log(tableData[1].job_advantage['优势2'])
      //更新tabledata
    });

const now = new Date()
const user_type = ref("manager") 

const dialogTableVisible = ref(false)
const dialogFormVisible = ref(false)
const formLabelWidth = '8rem'
interface Job{
        "recruit_id": Number,
        "job_name": String,
        "job_salary": String,
        "job_advantage": Object,
        "job_location": String,
        "job_day": Number,
        "job_month": Number,
        "created_at": String,
        "job_needed_people": Number,
        "job_request": Object,
        "job_content": Object,
        "enterprise_name": String,
        "enterprise_field": string,
        "enterprise_icon": String,
        "enterprise": Number,
        "job_interested_id": [],
        "received_resumes": [],
        "tag": []
}

const form = ref({
  "enterprise":16,
  "introduction":"",
  "job_name": "",
  "job_salary": "",
  "job_advantage": [],
  "job_location": "",
  "number":6,
  "job_day": 5,
  "job_month":6,
  "job_request":[],
  "job_content":[],
  "enterprise_name":"",
  "enterprise_field": [],
  "enterprise_icon":""
})

var tableData : Job[]=[
  {
        "recruit_id": 14,
        "job_name": "行业运营实习生",
        "job_salary": "6-7.5K",
        "job_advantage": {
            "优势1": "周末双休"
        },
        "job_location": "上海",
        "job_day": 5,
        "job_month": 6,
        "created_at": "2024-06-27T10:28:00.076479+08:00",
        "job_needed_people": 6,
        "job_request": {
            "需求1": "优秀的数据分析和拆解能力，逻辑强、能深入还原事实和发现问题",
            "需求2": "善于沟通，具备良好的协作能力，能发现更多业务合作机会"
        },
        "job_content": {
            "内容1": "负责雇主品牌传播的平面设计，输出创意设计方案，包括整体视觉风格呈现、主视觉、海报、H5等",
            "内容2": "支持线下实体物料的手绘、平面设计以及IP周边衍生品开发",
            "内容3": "完成部门内外部文件、演示文稿的视觉美化",
            "内容4": "参与项目前期规划构思、概念传达和创意过程"
        },
        "enterprise_name": "美团",
        "enterprise_field": "行业运营",
        "enterprise_icon": "https://sxsimg.xiaoyuanzhao.com/61/80/619CBC6070EA409410303439DDF9B480.png",
        "enterprise": 16,
        "job_interested_id": [],
        "received_resumes": [],
        "tag": []
      },
      
      
]

const SubmitForm = async ()=>{
  var advantage={}
  var request={}
  var content={}
  for(let i=0;i<form.value.job_advantage.length;i++){
    advantage['优势'+(i+1)]=form.value.job_advantage[i]
  }
  for(let i=0;i<form.value.job_request.length;i++){
    request['需求'+(i+1)]=form.value.job_request[i]
  }
  for(let i=0;i<form.value.job_content.length;i++){
    content['内容'+(i+1)]=form.value.job_content[i]
  }
  //console.log(advantage)
  dialogFormVisible.value=false
  //console.log(typeof(form.value.enterprise))
  //发送表单api
  let response=await axios.get('/api/enterprise/info?enterprise_id='+form.value.enterprise)
  //console.log(response)
  var data = JSON.stringify({
   "job_name":form.value.job_name ,
   "job_salary": form.value.job_salary,
   "job_advantage": advantage,
   "job_location": form.value.job_location,
   "job_day": form.value.job_day,
   "job_month": form.value.job_month,
   "enterprise": form.value.enterprise,
   "created_at": "2024-06-29T10:10:34.700582+08:00",
   "job_needed_people": form.value.number,
   "job_interested_id": [
      1,
      2,
      3,
      7,
      9,
      10,
      11
   ],
   "job_request": request,
   "job_content": content,
   "enterprise_name": response.data.name,
   "enterprise_field": form.value.enterprise_field.join(','),
   "enterprise_icon": response.data.icon,
});
console.log(data)


var config = {
   method: 'post',
   url: '/api/recruit/recruit_create',
   headers: { 
    'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzIyMTY4NjY0LCJpYXQiOjE3MTkxNDQ2NjQsImp0aSI6ImViYTk3OWM0YmQ4NzQ3MWQ4OWFhMTgzMjYyYjczZWY2IiwidXNlcl9pZCI6M30.9JXjllHVQ3sEl5-eO5YpUAAOojMSAXH9tAdsEX7N2Bc',   
    'Content-Type': 'application/json', 
   },
   data : data
};

axios(config)
.then(function (response) {
   console.log(JSON.stringify(response.data));
   console.log('aaaa')
})
.catch(function (error) {
   console.log(error);
});

}

const deleteRow = (index: number) => {
  tableData.splice(index, 1)
}
const filter1 = (value: string, row:Job ) => {
    return row.job_name === value
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

  