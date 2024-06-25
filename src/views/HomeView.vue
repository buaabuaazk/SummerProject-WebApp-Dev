<!--
 * @Date: 2024-06-18 22:18:30
 * @Author: Q9K
 * @Description: 进入网站的首页，需要展示企业的信息
-->
<template>
  <div class="search-container">
    <div class="dropdown">
    </div>
    <div class="search-form">
      <a-input-search
        v-model:value="value"
        placeholder="input search text"
        enter-button="Search"
        size="large"
        @search="onSearch"
        style="width: 40rem; margin-left: 30rem;"
      />
    </div>
  </div>
  <div class="mid-bar" >
    <div class="job-classify" >
      <a-card title="热门城市" style="text-align: center;">
        <a-card-grid v-for="(city, index) in cities" :key="index" class="hot-location" @click="fetchData(city)">{{ city }}</a-card-grid>
      </a-card>
    </div>
    <div class="advert-contanier">
      <a-carousel autoplay style="width: 50rem;">
        <div><h3>招租</h3></div>
        <div><h3>招租</h3></div>
        <div><h3>招租</h3></div>
        <div><h3>招租</h3></div>
      </a-carousel>
      <div class="advert-enterprise">
        <a-card>
        <a-card-grid style="width: 20%; text-align: center">招租</a-card-grid>
        <a-card-grid style="width: 20%; text-align: center" :hoverable="false">招租</a-card-grid>
        <a-card-grid style="width: 20%; text-align: center">招租</a-card-grid>
        <a-card-grid style="width: 20%; text-align: center">招租</a-card-grid>
        <a-card-grid style="width: 20%; text-align: center">招租</a-card-grid>
      </a-card>
      </div>
    </div>
  </div>
  <div class="job-list-container"> 
      <div class="job-nav">
          <a-button type="primary" style="margin-right: 0.5rem;">热门岗位</a-button>
          <a-button type="primary">最新招聘</a-button>
          <a-button type="link" class="link-button">
            <span style="margin-right: 0;">更多职业</span>
            <RightOutlined style="margin-left: 0; padding: 0; font-size: 1rem;"></RightOutlined>
          </a-button>
      </div>
      <div class="job-list" v-if="data &&data.length > 1">
        <a-card v-for="item in data" :key="item.id" :title="item.name" style="width: 23rem; margin-right: 1.5rem;">
          <template #extra><a href="#">{{ item.job_salary }}</a></template>
          <div>
            <div class="advantege" style="display: flex;">
                <a-button type="text" style="margin-right: 1rem; background: #fafaf3;">免费午餐</a-button>
                <a-button type="text" style="margin-right: 1rem; background: #fafaf3;">下午茶</a-button>
                <a-button type="text" style="margin-right: 1rem; background: #fafaf3;">实习转正</a-button>
            </div>
            <div class="basic-info" style="display: flex; align-items: center; margin-top: 1rem; margin-left: 1rem;">
                <EnvironmentOutlined />
                <span  class="content" style="padding: 0; margin-right: 4rem; margin-left: 0.1rem;">北京</span>
                <DashboardOutlined />
                <span  class="content" style="margin: 0; margin-right: 4rem; margin-left: 0.11rem;">5天/周</span>
                <IdcardOutlined />
                <span  class="content" style="margin: 0; margin-left: 0.1rem;">3个月</span>
            </div>
            <a-divider style="margin-bottom: 0;"/>
            <div class="enterprise-info" style="display: flex; margin-bottom: 0;">
              <img src="https://sxsimg.xiaoyuanzhao.com/69/8D/69D89E01806ACAEE6472C6D5D5C7CC8D.jpg?x-oss-process=image/format,jpg/quality,q_90/resize,w_100"/>
              <div style="margin-top: 1rem; margin-left: 2rem;">
                <p>字节跳动</p>
                <p style="margin-top: 1rem;">互联网/游戏/软件</p>
              </div>
            </div>
          </div>
        </a-card>
        <a-card title="市场营销实习生（大制造方向）-飞书" style="width: 23rem; margin-right: 1.5rem;">
          <template #extra><a href="#">150/天</a></template>
          <div>
            <div class="advantege" style="display: flex;">
                <a-button type="text" style="margin-right: 1rem; background: #fafaf3;">免费午餐</a-button>
                <a-button type="text" style="margin-right: 1rem; background: #fafaf3;">下午茶</a-button>
                <a-button type="text" style="margin-right: 1rem; background: #fafaf3;">实习转正</a-button>
            </div>
            <div class="basic-info" style="display: flex; align-items: center; margin-top: 1rem; margin-left: 1rem;">
                <EnvironmentOutlined />
                <span  class="content" style="padding: 0; margin-right: 4rem; margin-left: 0.1rem;">北京</span>
                <DashboardOutlined />
                <span  class="content" style="margin: 0; margin-right: 4rem; margin-left: 0.11rem;">5天/周</span>
                <IdcardOutlined />
                <span  class="content" style="margin: 0; margin-left: 0.1rem;">3个月</span>
            </div>
            <a-divider style="margin-bottom: 0;"/>
            <div class="enterprise-info" style="display: flex; margin-bottom: 0;">
              <img src="https://sxsimg.xiaoyuanzhao.com/69/8D/69D89E01806ACAEE6472C6D5D5C7CC8D.jpg?x-oss-process=image/format,jpg/quality,q_90/resize,w_100"/>
              <div style="margin-top: 1rem; margin-left: 2rem;">
                <p>字节跳动</p>
                <p style="margin-top: 1rem;">互联网/游戏/软件</p>
              </div>
            </div>
          </div>
        </a-card>
        <a-card title="市场营销实习生（大制造方向）-飞书" style="width: 23rem; margin-right: 1.5rem;">
          <template #extra><a href="#">150/天</a></template>
          <div>
            <div class="advantege" style="display: flex;">
                <a-button type="text" style="margin-right: 1rem; background: #fafaf3;">免费午餐</a-button>
                <a-button type="text" style="margin-right: 1rem; background: #fafaf3;">下午茶</a-button>
                <a-button type="text" style="margin-right: 1rem; background: #fafaf3;">实习转正</a-button>
            </div>
            <div class="basic-info" style="display: flex; align-items: center; margin-top: 1rem; margin-left: 1rem;">
                <EnvironmentOutlined />
                <span  class="content" style="padding: 0; margin-right: 4rem; margin-left: 0.1rem;">北京</span>
                <DashboardOutlined />
                <span  class="content" style="margin: 0; margin-right: 4rem; margin-left: 0.11rem;">5天/周</span>
                <IdcardOutlined />
                <span  class="content" style="margin: 0; margin-left: 0.1rem;">3个月</span>
            </div>
            <a-divider style="margin-bottom: 0;"/>
            <div class="enterprise-info" style="display: flex; margin-bottom: 0;">
              <img src="https://sxsimg.xiaoyuanzhao.com/69/8D/69D89E01806ACAEE6472C6D5D5C7CC8D.jpg?x-oss-process=image/format,jpg/quality,q_90/resize,w_100"/>
              <div style="margin-top: 1rem; margin-left: 2rem;">
                <p>字节跳动</p>
                <p style="margin-top: 1rem;">互联网/游戏/软件</p>
              </div>
            </div>
          </div>
        </a-card>
        <a-card title="市场营销实习生（大制造方向）-飞书" style="width: 23rem; margin-right: 1.5rem;">
          <template #extra><a href="#">150/天</a></template>
          <div>
            <div class="advantege" style="display: flex;">
                <a-button type="text" style="margin-right: 1rem; background: #fafaf3;">免费午餐</a-button>
                <a-button type="text" style="margin-right: 1rem; background: #fafaf3;">下午茶</a-button>
                <a-button type="text" style="margin-right: 1rem; background: #fafaf3;">实习转正</a-button>
            </div>
            <div class="basic-info" style="display: flex; align-items: center; margin-top: 1rem; margin-left: 1rem;">
                <EnvironmentOutlined />
                <span  class="content" style="padding: 0; margin-right: 4rem; margin-left: 0.1rem;">北京</span>
                <DashboardOutlined />
                <span  class="content" style="margin: 0; margin-right: 4rem; margin-left: 0.11rem;">5天/周</span>
                <IdcardOutlined />
                <span  class="content" style="margin: 0; margin-left: 0.1rem;">3个月</span>
            </div>
            <a-divider style="margin-bottom: 0;"/>
            <div class="enterprise-info" style="display: flex; margin-bottom: 0;">
              <img src="https://sxsimg.xiaoyuanzhao.com/69/8D/69D89E01806ACAEE6472C6D5D5C7CC8D.jpg?x-oss-process=image/format,jpg/quality,q_90/resize,w_100"/>
              <div style="margin-top: 1rem; margin-left: 2rem;">
                <p>字节跳动</p>
                <p style="margin-top: 1rem;">互联网/游戏/软件</p>
              </div>
            </div>
          </div>
        </a-card>
        <a-card title="市场营销实习生（大制造方向）-飞书" style="width: 23rem; margin-right: 1.5rem;">
          <template #extra><a href="#">150/天</a></template>
          <div>
            <div class="advantege" style="display: flex;">
                <a-button type="text" style="margin-right: 1rem; background: #fafaf3;">免费午餐</a-button>
                <a-button type="text" style="margin-right: 1rem; background: #fafaf3;">下午茶</a-button>
                <a-button type="text" style="margin-right: 1rem; background: #fafaf3;">实习转正</a-button>
            </div>
            <div class="basic-info" style="display: flex; align-items: center; margin-top: 1rem; margin-left: 1rem;">
                <EnvironmentOutlined />
                <span  class="content" style="padding: 0; margin-right: 4rem; margin-left: 0.1rem;">北京</span>
                <DashboardOutlined />
                <span  class="content" style="margin: 0; margin-right: 4rem; margin-left: 0.11rem;">5天/周</span>
                <IdcardOutlined />
                <span  class="content" style="margin: 0; margin-left: 0.1rem;">3个月</span>
            </div>
            <a-divider style="margin-bottom: 0;"/>
            <div class="enterprise-info" style="display: flex; margin-bottom: 0;">
              <img src="https://sxsimg.xiaoyuanzhao.com/69/8D/69D89E01806ACAEE6472C6D5D5C7CC8D.jpg?x-oss-process=image/format,jpg/quality,q_90/resize,w_100"/>
              <div style="margin-top: 1rem;">
                <p>字节跳动</p>
                <p>互联网/游戏/软件</p>
              </div>
            </div>
          </div>
        </a-card>
        <a-card title="市场营销实习生（大制造方向）-飞书" style="width: 23rem;">
          <template #extra><a href="#">150/天</a></template>
          <div>
            <div class="advantege" style="display: flex;">
                <a-button type="text" style="margin-right: 1rem; background: #fafaf3;">免费午餐</a-button>
                <a-button type="text" style="margin-right: 1rem; background: #fafaf3;">下午茶</a-button>
                <a-button type="text" style="margin-right: 1rem; background: #fafaf3;">实习转正</a-button>
            </div>
            <div class="basic-info" style="display: flex; align-items: center; margin-top: 1rem; margin-left: 1rem;">
                <EnvironmentOutlined />
                <span  class="content" style="padding: 0; margin-right: 4rem; margin-left: 0.1rem;">北京</span>
                <DashboardOutlined />
                <span  class="content" style="margin: 0; margin-right: 4rem; margin-left: 0.11rem;">5天/周</span>
                <IdcardOutlined />
                <span  class="content" style="margin: 0; margin-left: 0.1rem;">3个月</span>
            </div>
            <a-divider style="margin-bottom: 0;"/>
            <div class="enterprise-info" style="display: flex; margin-bottom: 0;">
              <img src="https://sxsimg.xiaoyuanzhao.com/69/8D/69D89E01806ACAEE6472C6D5D5C7CC8D.jpg?x-oss-process=image/format,jpg/quality,q_90/resize,w_100"/>
              <div style="margin-top: 1rem;">
                <p>字节跳动</p>
                <p>互联网/游戏/软件</p>
              </div>
            </div>
          </div>
        </a-card>
        <a-card title="市场营销实习生（大制造方向）-飞书" style="width: 23rem; margin-right: 1.5rem;">
          <template #extra><a href="#">150/天</a></template>
          <div>
            <div class="advantege" style="display: flex;">
                <a-button type="text" style="margin-right: 1rem; background: #fafaf3;">免费午餐</a-button>
                <a-button type="text" style="margin-right: 1rem; background: #fafaf3;">下午茶</a-button>
                <a-button type="text" style="margin-right: 1rem; background: #fafaf3;">实习转正</a-button>
            </div>
            <div class="basic-info" style="display: flex; align-items: center; margin-top: 1rem; margin-left: 1rem;">
                <EnvironmentOutlined />
                <span  class="content" style="padding: 0; margin-right: 4rem; margin-left: 0.1rem;">北京</span>
                <DashboardOutlined />
                <span  class="content" style="margin: 0; margin-right: 4rem; margin-left: 0.11rem;">5天/周</span>
                <IdcardOutlined />
                <span  class="content" style="margin: 0; margin-left: 0.1rem;">3个月</span>
            </div>
            <a-divider style="margin-bottom: 0;"/>
            <div class="enterprise-info" style="display: flex; margin-bottom: 0;">
              <img src="https://sxsimg.xiaoyuanzhao.com/69/8D/69D89E01806ACAEE6472C6D5D5C7CC8D.jpg?x-oss-process=image/format,jpg/quality,q_90/resize,w_100"/>
              <div style="margin-top: 1rem;">
                <p>字节跳动</p>
                <p>互联网/游戏/软件</p>
              </div>
            </div>
          </div>
        </a-card>
        <a-card title="市场营销实习生（大制造方向）-飞书" style="width: 23rem; margin-right: 1.5rem;">
          <template #extra><a href="#">150/天</a></template>
          <div>
            <div class="advantege" style="display: flex;">
                <a-button type="text" style="margin-right: 1rem; background: #fafaf3;">免费午餐</a-button>
                <a-button type="text" style="margin-right: 1rem; background: #fafaf3;">下午茶</a-button>
                <a-button type="text" style="margin-right: 1rem; background: #fafaf3;">实习转正</a-button>
            </div>
            <div class="basic-info" style="display: flex; align-items: center; margin-top: 1rem; margin-left: 1rem;">
                <EnvironmentOutlined />
                <span  class="content" style="padding: 0; margin-right: 4rem; margin-left: 0.1rem;">北京</span>
                <DashboardOutlined />
                <span  class="content" style="margin: 0; margin-right: 4rem; margin-left: 0.11rem;">5天/周</span>
                <IdcardOutlined />
                <span  class="content" style="margin: 0; margin-left: 0.1rem;">3个月</span>
            </div>
            <a-divider style="margin-bottom: 0;"/>
            <div class="enterprise-info" style="display: flex; margin-bottom: 0;">
              <img src="https://sxsimg.xiaoyuanzhao.com/69/8D/69D89E01806ACAEE6472C6D5D5C7CC8D.jpg?x-oss-process=image/format,jpg/quality,q_90/resize,w_100"/>
              <div style="margin-top: 1rem;">
                <p>字节跳动</p>
                <p>互联网/游戏/软件</p>
              </div>
            </div>
          </div>
        </a-card>
        <a-card title="市场营销实习生（大制造方向）-飞书" style="width: 23rem;">
          <template #extra><a href="#">150/天</a></template>
          <div>
            <div class="advantege" style="display: flex;">
                <a-button type="text" style="margin-right: 1rem; background: #fafaf3;">免费午餐</a-button>
                <a-button type="text" style="margin-right: 1rem; background: #fafaf3;">下午茶</a-button>
                <a-button type="text" style="margin-right: 1rem; background: #fafaf3;">实习转正</a-button>
            </div>
            <div class="basic-info" style="display: flex; align-items: center; margin-top: 1rem; margin-left: 1rem;">
                <EnvironmentOutlined />
                <span  class="content" style="padding: 0; margin-right: 4rem; margin-left: 0.1rem;">北京</span>
                <DashboardOutlined />
                <span  class="content" style="margin: 0; margin-right: 4rem; margin-left: 0.11rem;">5天/周</span>
                <IdcardOutlined />
                <span  class="content" style="margin: 0; margin-left: 0.1rem;">3个月</span>
            </div>
            <a-divider style="margin-bottom: 0;"/>
            <div class="enterprise-info" style="display: flex; margin-bottom: 0;">
              <img src="https://sxsimg.xiaoyuanzhao.com/69/8D/69D89E01806ACAEE6472C6D5D5C7CC8D.jpg?x-oss-process=image/format,jpg/quality,q_90/resize,w_100"/>
              <div style="margin-top: 1rem;">
                <p>字节跳动</p>
                <p>互联网/游戏/软件</p>
              </div>
            </div>
          </div>
        </a-card>
      </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import axios from '@/utils/request';
import { onMounted } from 'vue';
import {RightOutlined, EnvironmentOutlined, DashboardOutlined, IdcardOutlined} from '@ant-design/icons-vue'

const value = ref('');
const data = ref(null); //招聘数据
const error = ref();
const cities = ref(['北京','上海','深圳','杭州','武汉','广州','成都','重庆','南京','天津','西安','苏州','长沙','青岛','大连'])
const fetchData = async (city) => {
  try {
    const response = await axios.get('/api/recruit/list_recruit', {
      params: {
        job_location:  city,
      }
    });
    data.value = response.data;
  } catch(err) {
    error.value = err.message;
  }
};

onMounted( ()=> {
  fetchData();
});

</script>

<style scoped>
  :deep(.slick-slide) {
    text-align: center;
    height: 12rem;
    line-height: 12rem;
    background: #364d79;
    overflow: hidden;
  }

  .search-container {
    margin-bottom: 1rem;
  }

  .mid-bar {
    width: 80rem; 
    display: flex; 
    margin-left: 1rem;
  }

  .job-classify {
    margin-right: 1rem; 
    width: 25rem;
  }

  .hot-location {
    width: 20%; 
    text-align: center;
  }
  
  .job-list-container {
    margin-left: 5rem; 
    margin-right: 4rem;
  }

  .job-nav {
    width: 72rem;
    height: 2rem; 
    background: #fafafa; 
    font-size: 0;
    align-items: center; 
    display: flex; 
    align-items: center;
  }

  .link-button {
    padding: 0; 
    margin-left: 55rem;
    display: flex; 
    align-items: center;
  }

  .job-list {
    display: flex;
    flex-wrap: wrap;
  }
</style>
