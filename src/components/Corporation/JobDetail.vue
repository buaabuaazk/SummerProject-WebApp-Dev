<template>
  <div>
    <div class="container mx-auto">
      <div class="w-full flex flex-col md:flex-row gap-10">
        <div class="w-full h-fit md:w-2/3 2xl:2/4 bg-white px-5 py-10 md:px-10 shadow-md">
          <div class="w-full flex items-center justify-between">
            <div class="w-3/4 flex gap-2">
              <img
                :src="job?.company?.profileUrl"
                :alt="job?.company?.name"
                class="w-20 h-20 md:w-24 md:h-20 rounded"
              />

              <div class="flex flex-col">
                <p class="text-xl font-semibold text-gray-600">
                  {{ job?.jobTitle }}
                </p>

                <span class="text-base">{{ job?.location }}</span>

                <span class="text-base text-blue-600">
                  {{ job?.company?.name }}
                </span>

                <span class="text-gray-500 text-sm">
                  {{ timeSince(job?.createdAt) }}
                </span>
              </div>
            </div>

            <!-- <div class=''>
              <AiOutlineSafetyCertificate className='text-3xl text-blue-500' />
            </div> -->
          </div>

          <div class="w-full flex flex-wrap md:flex-row gap-2 items-center justify-between my-10">
            <div
              class="bg-[#bdf4c8] w-40 h-16 rounded-lg flex flex-col items-center justify-center"
            >
              <span class="text-sm">Salary</span>
              <p class="text-lg font-semibold text-gray-700">$ {{ job?.salary }}</p>
            </div>

            <div
              class="bg-[#bae5f4] w-40 h-16 rounded-lg flex flex-col items-center justify-center"
            >
              <span class="text-sm">Job Type</span>
              <p class="text-lg font-semibold text-gray-700">
                {{ job?.jobType }}
              </p>
            </div>

            <div
              class="bg-[#fed0ab] w-40 h-16 px-6 rounded-lg flex flex-col items-center justify-center"
            >
              <span class="text-sm">No. of Applicants</span>
              <p class="text-lg font-semibold text-gray-700">{{ job?.applicants?.length }}K</p>
            </div>

            <div
              class="bg-[#cecdff] w-40 h-16 px-6 rounded-lg flex flex-col items-center justify-center"
            >
              <span class="text-sm">No. of Vacancies</span>
              <p class="text-lg font-semibold text-gray-700">
                {{ job?.vacancies }}
              </p>
            </div>
          </div>

          <div class="w-full flex gap-4 py-5">
            <CustomButton
              @click="setSelected('0')"
              title="Job Description"
              :containerStyles="
                selected == '0'
                  ? 'w-full flex items-center justify-center py-3 px-5 outline-none rounded-full text-sm bg-black text-white'
                  : 'w-full flex items-center justify-center py-3 px-5 outline-none rounded-full text-sm bg-white text-black border border-gray-300'
              "
            />

            <CustomButton
              @click="setSelected('1')"
              title="Company"
              :containerStyles="
                selected == '1'
                  ? 'w-full flex items-center justify-center py-3 px-5 outline-none rounded-full text-sm bg-black text-white'
                  : 'w-full flex items-center justify-center py-3 px-5 outline-none rounded-full text-sm bg-white text-black border border-gray-300'
              "
            />
          </div>

          <div class="my-6">
            <template v-if="selected === '0'">
              <p class="text-xl font-semibold">Job Description</p>
              <span class="text-base">{{ job?.detail[0]?.desc }}</span>
              <template v-if="job?.detail[0]?.requirement">
                <p class="text-xl font-semibold mt-8">Requirement</p>
                <span class="text-base">{{ job?.detail[0]?.requirement }}</span>
              </template>
            </template>
            <template v-else>
              <div class="mb-6 flex flex-col">
                <p class="text-xl text-blue-600 font-semibold">{{ job?.company?.name }}</p>
                <span class="text-base">{{ job?.company?.location }}</span>
                <span class="text-sm">{{ job?.company?.email }}</span>
              </div>
              <p class="text-xl font-semibold">About Company</p>
              <span>{{ job?.company?.about }}</span>
            </template>
          </div>

          <div class="w-full">
            <CustomButton
              title="Apply Now"
              containerStyles="w-full flex items-center justify-center text-white bg-black py-3 px-5 outline-none rounded-full text-base"
            />
          </div>
        </div>

        <div class="w-full md:w-1/3 2xl:w-2/4 p-5 mt-20 md:mt-0">
          <p class="text-gray-500 font-semibold">Similar Job Post</p>

          <div class="w-full flex flex-wrap gap-4">
            <JobCard v-for="(job, index) in jobs" :key="index" :job="job" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import CustomButton from './CustomButton.vue'
import { ref } from 'vue'

// const props = defineProps({
//   job: Object,
//   jobs: Array
// })

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
      profileUrl: '/src/assets/Corporation/twitter.png'
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
      profileUrl: '/src/assets/Corporation/google.png'
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
      profileUrl: '/src/assets/Corporation/linkedin.png'
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
      profileUrl: '/src/assets/Corporation/spotify.png'
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
      profileUrl: '/src/assets/Corporation/facebook.png'
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
      profileUrl: '/src/assets/Corporation/whatsapp.png'
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
      profileUrl: '/src/assets/Corporation/instagram.png'
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
      profileUrl: '/src/assets/Corporation/youtube.png'
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
      profileUrl: '/src/assets/Corporation/codewave.png'
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

let selected = ref('0')

function setSelected(value) {
  selected.value = value
}

let job = ref(jobs.value[window.location.href.split('/').pop() - 1])
// let jobs = ref(props.jobs)

console.log(job.value)

function timeSince(date) {
  const seconds = Math.floor((new Date() - new Date(date)) / 1000)
  let interval = seconds / 31536000

  if (interval > 1) {
    return Math.floor(interval) + '年前'
  }
  interval = seconds / 2592000
  if (interval > 1) {
    return Math.floor(interval) + '个月前'
  }
  interval = seconds / 86400
  if (interval > 1) {
    return Math.floor(interval) + '天前'
  }
  interval = seconds / 3600
  if (interval > 1) {
    return Math.floor(interval) + '小时前'
  }
  interval = seconds / 60
  if (interval > 1) {
    return Math.floor(interval) + '分钟前'
  }
  return Math.floor(seconds) + '秒前'
}
</script>
