<template>
  <div class="container mx-auto p-5">
    <div class="">
      <!-- 展示（tailwindcss） -->
      <div class="flex gap-2">
        <img class="inline-block h-20 w-20 rounded-full" :src="info.icon_url" alt="" />
        <div class="px-4 sm:px-0">
          <h3 class="text-base font-bold leading-7 text-gray-900">{{ info.name }}</h3>
          <p class="mt-1 max-w-2xl text-sm leading-6 text-gray-500">下面是企业的相关介绍👇🏻</p>
        </div>
        <div class="flex items-center justifu-center py-5 md:py-0 gap-4">
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
          <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt class="text-sm font-medium leading-6 text-gray-900">公司成就介绍</dt>
            <dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
              <ul role="list" class="divide-y divide-gray-100 rounded-md border border-gray-200">
                <li class="flex items-center justify-between py-4 pl-4 pr-5 text-sm leading-6">
                  <div class="flex w-0 flex-1 items-center">
                    <PaperClipIcon class="h-5 w-5 flex-shrink-0 text-gray-400" aria-hidden="true" />
                    <div class="ml-4 flex min-w-0 flex-1 gap-2">
                      <span class="truncate font-medium">resume_back_end_developer.pdf</span>
                      <span class="flex-shrink-0 text-gray-400">2.4mb</span>
                    </div>
                  </div>
                  <div class="ml-4 flex flex-shrink-0 space-x-4">
                    <button
                      type="button"
                      class="rounded-md bg-white font-medium text-indigo-600 hover:text-indigo-500"
                    >
                      Download
                    </button>
                    <span class="text-gray-200" aria-hidden="true">|</span>
                    <button
                      type="button"
                      class="rounded-md bg-white font-medium text-gray-900 hover:text-gray-800"
                    >
                      Preview
                    </button>
                  </div>
                </li>
                <li class="flex items-center justify-between py-4 pl-4 pr-5 text-sm leading-6">
                  <div class="flex w-0 flex-1 items-center">
                    <PaperClipIcon class="h-5 w-5 flex-shrink-0 text-gray-400" aria-hidden="true" />
                    <div class="ml-4 flex min-w-0 flex-1 gap-2">
                      <span class="truncate font-medium">coverletter_back_end_developer.pdf</span>
                      <span class="flex-shrink-0 text-gray-400">4.5mb</span>
                    </div>
                  </div>
                  <div class="ml-4 flex flex-shrink-0 space-x-4">
                    <button
                      type="button"
                      class="rounded-md bg-white font-medium text-indigo-600 hover:text-indigo-500"
                    >
                      Download
                    </button>
                    <span class="text-gray-200" aria-hidden="true">|</span>
                    <button
                      type="button"
                      class="rounded-md bg-white font-medium text-gray-900 hover:text-gray-800"
                    >
                      Preview
                    </button>
                  </div>
                </li>
              </ul>
            </dd>
          </div>
        </dl>
      </div>
    </div>

    <div class="w-full mt-20 flex flex-col gap-2">
      <p class="font-extrabold italic">Jobs Posted</p>

      <div class="flex flex-wrap gap-3">
        <JobCard v-for="(job, index) in jobs" :key="index" :job="job" />
      </div>
    </div>

    <CreateCorporation :isOpen="isOpen" :closeModal="closeModal" :openModal="openModal" />
  </div>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue'
import axios from 'axios'
import CustomButton from '@/components/Corporation/CustomButton.vue'
import JobCard from '@/components/Corporation/JobCard.vue'
import CreateCorporation from '@/views/CreateCorporation.vue'

import { EnvelopeIcon, MapPinIcon, PhoneIcon } from '@heroicons/vue/24/outline'
import { PaperClipIcon } from '@heroicons/vue/20/solid'
import {
  staticJobs,
  getUserInfo,
  getEnterpriseInfo,
  getUserProfile
} from '@/stores/useCorporationStore'
import { useRouter } from 'vue-router'

const router = useRouter()

const jobs = ref(staticJobs)

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
  jobPosts: ['1', '2', '3']
})

async function fetchData() {
  userInfo.value = await getUserInfo()
  console.log(userInfo.value)
  userProfile.value = await getUserProfile()
  console.log(userProfile.value)
  enterpriseInfo.value = await getEnterpriseInfo(userProfile.value.enterprise)
  console.log(enterpriseInfo.value)
}

onMounted(async () => {
  await fetchData()
  if (props?.id) {
    enterpriseInfo.value = await getEnterpriseInfo(props.id)
  }
  info.value.name = enterpriseInfo.value.name
  info.value.introduction = enterpriseInfo.value.introduction
  info.value.icon_url = enterpriseInfo.value.icon_url
})

const updateInfo = async (
  name = enterpriseInfo.value.name,
  introduction = enterpriseInfo.value.introduction,
  icon_url = enterpriseInfo.value.icon_url
) => {
  const data = {
    name: name,
    introduction: introduction,
    img: icon_url
  }
  await axios
    .put('http://8.130.25.189:8000/api/enterprise/info?enterprise_id=1', data)
    .then((res) => {
      console.log(res)
    })
    .catch((err) => {
      console.log(err)
    })
}
</script>
