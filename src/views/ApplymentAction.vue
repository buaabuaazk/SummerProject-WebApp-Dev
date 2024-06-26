<!--
 * @Date: 2024-06-23 20:22:00
 * @Author: Q9K
 * @Description: 对一般用户的投递信息进行操作
-->
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
    
      
    
  </template>

<script lang="ts" setup>
import { ref } from 'vue'
import dayjs from 'dayjs'
import { onMounted } from 'vue';
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
    var axios = require('axios');

    var config = {
    method: 'get',
    url: '',
    headers: { 'User-Agent': 'Apifox/1.0.0 (https://apifox.com)'}
    };

    axios(config)
    .then(function (response) {
    console.log(JSON.stringify(response.data));
    })
    .catch(function (error) {
    console.log(error);
    });
}

const Accept=(x)=>{
    workerList.value[x-1].luyong=true

}

onMounted(()=>{
    var axios = require('axios');

    var config = {
    method: 'get',
    url: '',
    headers: { 'User-Agent': 'Apifox/1.0.0 (https://apifox.com)'}
    };

    axios(config)
    .then(function (response) {
    console.log(JSON.stringify(response.data));
    })
    .catch(function (error) {
    console.log(error);
    });
    //更新员工列表
})

</script>