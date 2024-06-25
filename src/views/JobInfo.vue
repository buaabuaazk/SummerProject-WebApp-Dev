<!--
 * @Date: 2024-06-23 17:55:38
 * @Author: Q9K
 * @Description: 展示具体某一个岗位和企业的详细信息
-->
<template>
  <div>
    <Card class="mx-auto max-w-5xl">
      <CardHeader>
        <CardTitle>{{ jobInfo.jobTitle }}</CardTitle>
        <CardDescription>{{ jobInfo.description }}</CardDescription>
      </CardHeader>
      <CardContent>
        <div v-for="(requirement, index) in jobInfo.requirements" :key="index">
          {{ index + 1 + '. ' + requirement }}
        </div>
      </CardContent>
      <CardFooter>
        <Button class="mx-auto" @click="submitResume(props.id)">投递简历</Button>
      </CardFooter>
    </Card>
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
import { ref, reactive, onMounted } from 'vue'
import qs from 'qs'
import submitResume from '@/utils/submitResume'

const props = defineProps({
  id: {
    type: [String, Number],
    required: true
  }
})

let jobInfo = reactive({
  jobTitle: '后端开发实习生-客服平台',
  companyName: 'Google',
  location: 'Mountain View, CA',
  salary: '$150,000',
  description: `ByteIntern：面向2025届毕业生（2024年9月-2025年8月期间毕业），为符合岗位要求的同学提供转正机会。
  团队介绍：客服平台团队，负责字节跳动客服业务平台的设计研发工作，打造支撑字节跳动多业务线的客服中台，建设提供极致体验的多场景客服系统。让用户从产品一站式解决问题，提升用户满意度，助力核心产品线保护用户留存。`,
  requirements: [
    '负责字节跳动全球客服业务平台的设计研发工作，深入业务，理解抽象，为用户提供智能化、高效的服务解决方案',
    '对不同周期和紧急程度的产品需求进行合理拆解实现',
    '进行相关产品的技术文档编写，方案设计',
    '学习研究业界先进技术，保持技术进步'
  ],
  benefits: ['Health insurance', '401k', 'Free lunch']
})

onMounted(() => {
  getInfo()
})
const getInfo = async () => {
  const res = await this.$axios.get('/api/jobinfo/', qs.stringify({ job_id: props.id }))
  const data = res.data

  console.log('🚀 ~ file: JobInfo.vue:65 ~ getInfo ~ data:', data)
}
</script>
