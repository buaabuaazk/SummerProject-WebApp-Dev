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
import useTokenStore from '@/stores/useTokenStore'

const props = defineProps({
  id: {
    type: [String, Number],
    required: true
  }
})

let test = defineModel()

let isOpen = ref(false)

function closeModal() {
  isOpen.value = false
}
function openModal() {
  isOpen.value = true
}

const jobs = ref([
  {
    id: '1',
    company: {
      name: 'Microsoft Corporation',
      location: 'Califonia',
      email: 'support@microsoft.com',
      contact: 'support@microsoft',
      about:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
      profileUrl: 'https://pic.imgdb.cn/item/667d1348d9c307b7e94596e4.png'
    },
    jobTitle: 'Software Engineer',
    location: 'West US',
    jobType: 'Full-Time',
    salary: '1200',
    detail: [
      {
        desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
        requirement:
          "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
      }
    ],
    applicants: ['1', '2', '3', '4'],
    vacancies: 25,
    createdAt: '2024-06-26T03:20:18.283Z'
  },
  {
    id: '2',
    company: {
      name: 'Google Corporation',
      location: 'Califonia',
      email: 'support@google.com',
      contact: 'support@google',
      about:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
      profileUrl: 'https://pic.imgdb.cn/item/667d1369d9c307b7e945d2b4.png'
    },
    jobTitle: 'System Analyst',
    location: 'New York',
    jobType: 'Full-Time',
    salary: '1200',
    detail: [
      {
        desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
        requirement:
          "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
      }
    ],
    applicants: ['1', '2', '3', '4'],
    vacancies: 25,
    createdAt: '2024-06-26T03:20:18.283Z'
  },
  {
    id: '3',
    company: {
      name: 'LinkedIn Corporation',
      location: 'Germany',
      email: 'support@microsoft.com',
      contact: 'support@microsoft',
      about:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
      profileUrl: 'https://pic.imgdb.cn/item/667d140ad9c307b7e946edea.png'
    },
    jobTitle: 'Social Meia Manager',
    location: 'India, Mumbai',
    jobType: 'Full-Time',
    salary: '1200',
    detail: [
      {
        desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
        requirement:
          "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
      }
    ],
    applicants: ['1', '2', '3', '4'],
    vacancies: 25,
    createdAt: '2024-06-26T03:20:18.283Z'
  },
  {
    id: '4',
    company: {
      name: 'Spotify Corporation',
      location: 'Germany',
      email: 'support@microsoft.com',
      contact: 'support@microsoft',
      about:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
      profileUrl: 'https://pic.imgdb.cn/item/667d141fd9c307b7e947179f.png'
    },
    jobTitle: 'CFO',
    location: 'Norway',
    jobType: 'Full-Time',
    salary: '1200',
    detail: [
      {
        desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
        requirement:
          "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
      }
    ],
    applicants: ['1', '2', '3', '4'],
    vacancies: 25,
    createdAt: '2024-06-26T03:20:18.283Z'
  },
  {
    id: '5',
    company: {
      name: 'Facebook Corporation',
      location: 'Germany',
      email: 'support@microsoft.com',
      contact: 'support@microsoft',
      about:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
      profileUrl: 'https://pic.imgdb.cn/item/667d1348d9c307b7e94596e4.png'
    },
    jobTitle: 'CFO',
    location: 'Norway',
    jobType: 'Full-Time',
    salary: '1200',
    detail: [
      {
        desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
        requirement:
          "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
      }
    ],
    applicants: ['1', '2', '3', '4'],
    vacancies: 25,
    createdAt: '2024-06-26T03:20:18.283Z'
  },
  {
    id: '6',
    company: {
      name: 'WhatsApp Corporation',
      location: 'Germany',
      email: 'support@microsoft.com',
      contact: 'support@microsoft',
      about:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
      profileUrl: 'https://pic.imgdb.cn/item/667d1442d9c307b7e9475239.png'
    },
    jobTitle: 'Product Manager',
    location: 'Norway',
    jobType: 'Full-Time',
    salary: '1200',
    detail: [
      {
        desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
        requirement:
          "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
      }
    ],
    applicants: ['1', '2', '3', '4'],
    vacancies: 25,
    createdAt: '2024-06-26T03:20:18.283Z'
  },
  {
    id: '7',
    company: {
      name: 'Instagram Corporation',
      location: 'Germany',
      email: 'support@microsoft.com',
      contact: 'support@microsoft',
      about:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
      profileUrl: 'https://pic.imgdb.cn/item/667d1456d9c307b7e9476fb5.png'
    },
    jobTitle: 'Product Manager',
    location: 'Norway',
    jobType: 'Full-Time',
    salary: '1200',
    detail: [
      {
        desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
        requirement:
          "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
      }
    ],
    applicants: ['1', '2', '3', '4'],
    vacancies: 25,
    createdAt: '2024-06-26T03:20:18.283Z'
  },
  {
    id: '8',
    company: {
      name: 'Youtube Corporation',
      location: 'Germany',
      email: 'support@microsoft.com',
      contact: 'support@microsoft',
      about:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
      profileUrl: 'https://pic.imgdb.cn/item/667d132dd9c307b7e945631f.png'
    },
    jobTitle: 'Product Manager',
    location: 'Norway',
    jobType: 'Full-Time',
    salary: '1200',
    detail: [
      {
        desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
        requirement:
          "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
      }
    ],
    applicants: ['1', '2', '3', '4'],
    vacancies: 25,
    createdAt: '2024-06-26T03:20:18.283Z'
  },
  {
    id: '9',
    company: {
      name: 'CodeWave Solutions',
      location: 'India',
      email: 'support@microsoft.com',
      contact: 'support@microsoft',
      about:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
      profileUrl: 'https://pic.imgdb.cn/item/667d147fd9c307b7e947b031.png'
    },
    jobTitle: 'Subscribe Please',
    location: 'Norway',
    jobType: 'Full-Time',
    salary: '1200',
    detail: [
      {
        desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
        requirement:
          "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
      }
    ],
    applicants: ['1', '2', '3', '4'],
    vacancies: 25,
    createdAt: '2024-06-26T03:20:18.283Z'
  }
])

const info = ref({
  name: 'Google',
  location: 'US State',
  email: '1270414897@gmail.com',
  contact: '13467843418',
  jobPosts: ['1', '2', '3']
})

onMounted(async () => {
  // const enterprise = localStorage.getItem('enterprise')
  let enterprise
  if (props?.id) {
    enterprise = props.id
  } else {
    const tokenStore = useTokenStore()
    console.log(tokenStore.getToken)
    let user_id = await axios
      .get('http://8.130.25.189:8000/api/user/detail', {
        headers: {
          Authorization: tokenStore.getToken
        }
      })
      .then((res) => {
        console.log(res)
        return res.data.user_id
      })
      .catch((err) => {
        console.log(err)
      })

    console.log(user_id)

    await axios
      .get('http://8.130.25.189:8000/api/profile?user_id=' + user_id)
      .then((res) => {
        console.log(res)
        enterprise = res.data.enterprise
      })
      .catch((err) => {
        console.log(err)
      })
  }

  await axios
    .get('http://8.130.25.189:8000/api/enterprise/info?enterprise_id=' + enterprise)
    .then((res) => {
      info.value.name = res.data.name
      info.value.icon_url = res.data.icon_url
      info.value.introduction = res.data.introduction
    })
    .catch((err) => {
      console.log(err)
    })
})

const updateInfo = async (
  name = info.value.name,
  introduction = info.value.introduction,
  icon_url = info.value.icon_url
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
