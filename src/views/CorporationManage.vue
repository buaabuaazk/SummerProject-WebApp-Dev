<!--
 * @Date: 2024-06-23 13:30:59
 * @Author: Q9K
 * @Description: 对企业的信息进行修改，发布招聘信息按钮
-->
<template>
  <div>
    <CoSideBarVue />
    <div class="container mx-auto p-5">
      <div class="">
        <!-- 展示（tailwindcss） -->
        <div class="flex gap-2">
          <img class="inline-block h-20 w-20 rounded-full" :src="info.icon" alt="" />
          <div class="px-4 sm:px-0">
            <h3 class="text-base font-bold leading-7 text-gray-900">{{ info.name }}</h3>
            <p class="mt-1 max-w-2xl text-sm leading-6 text-gray-500">下面是企业的相关介绍👇🏻</p>
          </div>
          <div class="flex items-center justifu-center py-5 md:py-0 gap-4" v-if="info.is_admin">
            <CustomButton
              @click="openModal"
              title="Edit"
              containerStyles="py-1.5 px-3 md:px-5 focus:outline-none bg-blue-600  hover:bg-blue-700 text-white rounded text-sm md:text-base border border-blue-600"
            />
            <CustomButton
              @click="router.push('/Recruitment')"
              title="招聘管理"
              containerStyles="py-1.5 px-3 md:px-5 focus:outline-none bg-red-600  hover:bg-red-700 text-white rounded text-sm md:text-base border border-blue-600"
            />
            <CustomButton
              @click="router.push('/ApplymentAction')"
              title="应聘审核"
              containerStyles="py-1.5 px-3 md:px-5 focus:outline-none bg-slate-600  hover:bg-slate-700 text-white rounded text-sm md:text-base border border-blue-600"
            />

            <!-- <CustomButton
          title="Upload Job"
          containerStyles="text-blue-600 py-1.5 px-3 md:px-5 focus:outline-none  rounded text-sm md:text-base border border-blue-600"
        /> -->
          </div>
        </div>

        <div class="mt-6 border-t border-gray-100">
          <dl class="divide-y divide-gray-100">
            <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt class="text-sm font-medium leading-6 text-gray-900">公司全名</dt>
              <dd class="mt-1 flex text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                <span class="flex-grow">{{ info.name }}</span>
                <!-- <span class="flex-grow">{{ info.name + '有限公司' }} </span> -->
              </dd>
            </div>
            <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt class="text-sm font-medium leading-6 text-gray-900">公司主要业务</dt>
              <dd class="mt-1 flex text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                <span class="flex-grow">Backend Developer</span>
              </dd>
            </div>
            <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt class="text-sm font-medium leading-6 text-gray-900">联系邮箱</dt>
              <dd class="mt-1 flex text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                <span class="flex-grow">{{ info.email }}</span>
              </dd>
            </div>
            <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt class="text-sm font-medium leading-6 text-gray-900">平均薪资</dt>
              <dd class="mt-1 flex text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                <span class="flex-grow">$120,000</span>
              </dd>
            </div>
            <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt class="text-sm font-medium leading-6 text-gray-900">企业介绍</dt>
              <dd class="mt-1 flex text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                <span class="flex-grow">{{ info.introduction }}</span>
              </dd>
            </div>
          </dl>
        </div>
      </div>

      <CreateCorporation
        :isOpen="isOpen"
        :closeModal="closeModal"
        :openModal="openModal"
        :updateData="updateData"
        v-if="enterpriseInfo"
        :enterpriseInfo="enterpriseInfo"
      />
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue'
import CustomButton from '@/components/Corporation/CustomButton.vue'
import JobCard from '@/components/Corporation/JobCard.vue'
import CreateCorporation from '@/views/CreateCorporation.vue'

import CoSideBar from '@/components/Corporation/CoSideBar.vue'

import { PaperClipIcon } from '@heroicons/vue/20/solid'
import { getUserInfo, getEnterpriseInfo, getUserProfile } from '@/stores/useCorporationStore'
import { useRouter } from 'vue-router'
import CoSideBarVue from '@/components/Corporation/CoSideBar.vue'

const router = useRouter()

let userInfo = ref(null)
let userProfile = ref(null)
let enterpriseInfo = ref(null)

const props = defineProps({
  id: {
    type: [String, Number],
    required: true
  }
})

let isOpen = ref(false)

function closeModal() {
  isOpen.value = false
}
function openModal() {
  // router.push('/Recruitment')
  isOpen.value = true
}

const info = ref({
  name: 'Google',
  location: 'US State',
  email: '1270414897@gmail.com',
  contact: '13467843418',
  jobPosts: ['1', '2', '3'],
  is_admin: false
})

async function fetchData() {
  userInfo.value = await getUserInfo()
  console.log(userInfo.value)
  userProfile.value = await getUserProfile()
  console.log(userProfile.value)
  enterpriseInfo.value = await getEnterpriseInfo(userProfile.value.enterprise)
  console.log(enterpriseInfo.value)
}

async function updateData() {
  enterpriseInfo.value = await getEnterpriseInfo(info.value.id)
  info.value.name = enterpriseInfo.value.name
  info.value.introduction = enterpriseInfo.value.introduction
  info.value.icon = enterpriseInfo.value.icon
  info.value.is_admin = userProfile.value.is_admin
}

onMounted(async () => {
  await fetchData()
  info.value.id = userProfile.value.enterprise
  if (props?.id) {
    enterpriseInfo.value = await getEnterpriseInfo(props.id)
    info.value.id = props.id
  }
  info.value.name = enterpriseInfo.value.name
  info.value.introduction = enterpriseInfo.value.introduction
  info.value.icon = enterpriseInfo.value.icon
  info.value.is_admin = userProfile.value.is_admin
})
</script>
