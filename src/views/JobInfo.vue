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
                {{ data.created_at }}
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
            <div @click="subscribeEnterprise()">
              <n-button v-if="!hasSubscribed" type="primary" class="text-black">关注企业</n-button>
              <n-button v-else type="tertiary">取消关注</n-button>
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
import { ref, onMounted, watch } from 'vue'
import axios from '@/utils/request'
import { Badge } from '@/components/ui/badge'
import { useRouter } from 'vue-router'
import useTokenStore from '@/stores/useTokenStore'
import { debug } from '@/config'

import { useNotification } from 'naive-ui'
const notification = useNotification()
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

const data = ref({})
const recruitment_id = ref(props.id)

const goToEnterprise = () => {
  router.push(`/CorporationInfo/${data.value.enterprise}`)
}

onMounted(async () => {
  const res = await axios.get(`/api/recruit/jobinfo/${props.id}`)
  data.value = res.data
  data.value.created_at = data.value.created_at.substring(0, 10)
  debug.log('🚀 ~ file: JobInfo.vue:139 ~ getInfo ~ data:', data.value)
  const response = await axios.get('/api/enterprise/subscribe', {
    params: {
      enterprise_id: data.value.enterprise
    }
  })
  hasSubscribed.value = response.data.isSubscribed
})

watch(recruitment_id, async (oldval, newval) => {
  const res = await axios.get(`/api/recruit/jobinfo/${newval}`)
  data.value = res.data
  data.value.created_at = data.value.created_at.substring(0, 10)
  debug.log('🚀 ~ file: JobInfo.vue:146 ~ getInfo ~ data:', data.value)
  const response = await axios.get('/api/enterprise/subscribe', {
    params: {
      enterprise_id: newval
    }
  })
  debug.log('111', response.data)
  hasSubscribed.value = response.data.isSubscribed
})

const submitResume = async (job_id) => {
  debug.log('🚀 ~ file: submitResume.js:4 ~ submitResume ~ job_id:', job_id)

  const res = await axios.post('/api/recruit/upload_resume', {
    recruit_id: job_id
  })
  const data = res.data

  debug.log('🚀 ~ file: submitResume.js:20 ~ submitResume ~ data:', data)
  notification.success({
    title: '简历提交成功',
    content: '请等待管理员联系'
  })
  router.push('/')
}

const hasSubscribed = ref(false)
const subscribeEnterprise = async () => {
  const res = await axios.put('/api/enterprise/subscribe', {
    enterprise_id: data.value.enterprise
  })
  const response = res.data

  debug.log('🚀 ~ file: JobInfo.vue:160 ~ subscribeEnterprise ~ data:', response)
  hasSubscribed.value = !hasSubscribed.value
  if (hasSubscribed.value) {
    notification.success({
      title: '关注成功',
      content: '您已成功关注该企业'
    })
  } else {
    notification.success({
      title: '取消关注',
      content: '您已取消关注该企业'
    })
  }
}
</script>
