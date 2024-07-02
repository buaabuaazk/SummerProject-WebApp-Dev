<template>
  <div>
    <div class="bg-gray-50">
      <div class="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:max-w-7xl lg:px-8">
        <div class="py-24">
          <h1 class="text-4xl font-bold tracking-tight text-gray-900">企业动态</h1>
          <p class="mx-auto mt-4 max-w-3xl text-base text-gray-500">
            “企业动态”主要是指发布企业及周边企业的最新动态，它是企业中或企业间利用重大产销资讯、营运信息、广告宣传等活动形式打造企业品牌、宣传企业形象的基本动态。
          </p>
        </div>
      </div>
    </div>
    <ul role="list" class="divide-y divide-gray-100 mx-8">
      <div
        v-for="id in enterprisePosts"
        :key="id"
        class="overflow-hidden bg-white shadow sm:rounded-lg"
      >
        <div class="px-4 py-5 sm:p-6">
          <!-- Content goes here -->
          <PostCard :post_id="id" class="mx-auto max-w-80%" />
        </div>
      </div>
    </ul>
  </div>
</template>

<script setup>
import PostCard from '@/components/Post/PostCard.vue'
import { ref, onMounted } from 'vue'

import { ChatBubbleLeftIcon, CheckCircleIcon } from '@heroicons/vue/24/outline'
import { getUserProfile, getEnterprisePosts } from '@/stores/useCorporationStore'

import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()

let userProfile = ref(null)
let enterprisePosts = ref([])

async function fetchData() {
  if (route.params.id) {
    enterprisePosts.value = await getEnterprisePosts(route.params.id)
  } else {
    userProfile.value = await getUserProfile()
    enterprisePosts.value = await getEnterprisePosts(userProfile.value.enterprise)
  }
  console.log('enterprisePosts', enterprisePosts.value)
}

onMounted(async () => {
  await fetchData()
  console.log('CoRecruit_ID', route.params.id)
})
</script>
