<!--
 * @Date: 2024-06-23 17:55:38
 * @Author: Q9K
 * @Description: 展示具体某一个岗位和企业的详细信息
-->
<template>
  <div>
    <div class="flex mx-20 min-h-96">
      <div class="basis-3/4 flex flex-col">
        <Card class="my-2 h-30">
          <CardHeader>
            <CardTitle>{{ data.job_name }}</CardTitle>
            <CardDescription>
              <span>{{ data.job_salary }}</span>
              |
              <span>{{ data.job_location + ' ' }}</span>
              <span v-for="(job_advantage, index) in data.job_advantage" :key="index">
                {{ job_advantage + ' ' }}
              </span>
              <div>
                发布时间：
                {{ data.created_at.substring(0, 10) }}
              </div>
              <div>招聘人数：{{ data.job_needed_people }}</div>
              <div>招聘持续时间：{{ data.job_month }}个月</div>
            </CardDescription>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader>
            <div>岗位关键词：</div>
            <div>
              <Badge
                v-for="(val, index) in data.tag"
                :key="index"
                class="inline-block mx-1"
                variant="secondary"
              >
                {{ val }}
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div>岗位内容：</div>
            <div v-for="(val, key, index) in data.job_content" :key="key">
              {{ index + 1 + '. ' + val }}
            </div>
          </CardContent>
          <CardContent>
            <div>岗位要求：</div>
            <div v-for="(val, key, index) in data.job_request" :key="key">
              {{ index + 1 + '. ' + val }}
            </div>
          </CardContent>
          <CardFooter>
            <Button class="mx-auto" @click="submitResume(props.id)" :disabled="!isLogined()"
              >投递简历</Button
            >
          </CardFooter>
        </Card>
      </div>
      <div class="basis-1/4 p-4 shrink-0">
        <Card class="mx-auto text-center">
          <CardHeader>
            <Avatar class="mx-auto h-32 w-32">
              <AvatarImage :src="data.enterprise_icon" alt="@radix-vue" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </CardHeader>
          <CardContent>
            <Badge>
              {{ data.enterprise_field }}
            </Badge>
            <div>
              <Button variant="link" @click="goToEnterprise()" class="my-3 text-xl">
                {{ data.enterprise_name }}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  </div>
</template>
<script setup>
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import Button from '@/components/ui/button/Button.vue'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { ref, onMounted } from 'vue'
import submitResume from '@/utils/submitResume'
import axios from '@/utils/request'
import { Badge } from '@/components/ui/badge'
import { useRouter } from 'vue-router'
import useTokenStore from '@/stores/useTokenStore'
const tokenStore = useTokenStore()

const router = useRouter()

const props = defineProps({
  id: {
    type: [String, Number],
    required: true
  }
})

const isLogined = () => {
  if (tokenStore.getToken) {
    return true
  } else {
    return false
  }
}

let data = ref({
  recruit_id: 4,
  job_name: '虚拟网络研发工程师',
  job_salary: '35-45K',
  job_advantage: {
    优势1: '免费班车',
    优势2: '周末双休'
  },
  job_location: '深圳',
  job_day: 5,
  job_month: 6,
  created_at: '2024-06-26T20:56:07.461684+08:00',
  job_needed_people: 5,
  job_request: {
    需求1: '熟悉Docker、Kubernetes或者Openstack，并有相关研发和优化经验优先',
    需求2: '有信创国产化研发和测试经验优先'
  },
  job_content: {
    内容1: '协助MA整理材料文献，核对资料等（肺癌）',
    内容2: '深度参与医学部项目，并参会议进行讨论',
    内容3: '在国际化的工作环境中，深入了解医药行业的商业模式和产业结构',
    内容4: '与内外部同事沟通与配合，全方位支持医学部工作运行 任职资格'
  },
  enterprise_name: '哇哦互联',
  enterprise_field: '互联网',
  enterprise_icon: 'https://sxsimg.xiaoyuanzhao.com/2B/EE/2BFD5C732B853B5ACAE0CB397EEC99EE.jpeg',
  enterprise: 8,
  job_interested_id: [1, 2, 3, 7, 9, 10, 11],
  received_resumes: [],
  tag: [
    '前端工程师',
    '后端工程师',
    '全栈工程师',
    '人工智能工程师',
    '大数据工程师',
    '云计算工程师',
    'DevOps工程师'
  ]
})

const goToEnterprise = () => {
  router.push(`/CorporationInfo/${data.value.enterprise}`)
}

onMounted(async () => {
  // console.log(props.id)
  const res = await axios.get(`/api/recruit/jobinfo/${props.id}`)
  const info = res.data
  console.log('🚀 ~ file: JobInfo.vue:65 ~ getInfo ~ data:', info)
  data.value = info
})
</script>
