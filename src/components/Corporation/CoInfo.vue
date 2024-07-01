<template>
  <div class="flex h-full">
    <div class="flex min-w-0 flex-1 flex-col overflow-hidden">
      <div class="relative z-0 flex flex-1 overflow-hidden">
        <main class="relative z-0 flex-1 overflow-y-auto focus:outline-none xl:order-last">
          <!-- Breadcrumb -->

          <article>
            <!-- Profile header -->
            <div>
              <div>
                <img class="h-32 w-full object-cover lg:h-48" :src="profile.coverImageUrl" alt="" />
              </div>
              <div class="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
                <div class="-mt-12 sm:-mt-16 sm:flex sm:items-end sm:space-x-5">
                  <div class="flex">
                    <img
                      class="h-24 w-24 rounded-full ring-4 ring-white sm:h-32 sm:w-32"
                      :src="info.icon"
                      alt=""
                    />
                  </div>
                  <div
                    class="mt-6 sm:flex sm:min-w-0 sm:flex-1 sm:items-center sm:justify-end sm:space-x-6 sm:pb-1"
                  >
                    <div class="mt-6 min-w-0 flex-1 sm:hidden 2xl:block">
                      <h1 class="truncate text-2xl font-bold text-gray-900">{{ info.name }}</h1>
                    </div>
                    <div
                      class="mt-6 flex flex-col justify-stretch space-y-3 sm:flex-row sm:space-x-4 sm:space-y-0"
                    >
                      <button
                        type="button"
                        class="inline-flex justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                      >
                        <EnvelopeIcon class="-ml-0.5 h-5 w-5 text-gray-400" aria-hidden="true" />
                        Message
                      </button>
                      <button
                        type="button"
                        class="inline-flex justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                      >
                        <PhoneIcon class="-ml-0.5 h-5 w-5 text-gray-400" aria-hidden="true" />
                        Call
                      </button>
                    </div>
                  </div>
                </div>
                <div class="mt-6 hidden min-w-0 flex-1 sm:block 2xl:hidden">
                  <h1 class="truncate text-2xl font-bold text-gray-900">{{ info.name }}</h1>
                </div>
              </div>
            </div>

            <!-- Description list -->
            <div class="mx-auto mt-6 max-w-5xl px-4 sm:px-6 lg:px-8">
              <dl class="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
                <div
                  v-for="field in Object.keys(profile.fields)"
                  :key="field"
                  class="sm:col-span-1"
                >
                  <dt class="text-sm font-medium text-gray-500">{{ field }}</dt>
                  <dd class="mt-1 text-sm text-gray-900">{{ profile.fields[field] }}</dd>
                </div>
                <div class="sm:col-span-2">
                  <dt class="text-sm font-medium text-gray-500">About</dt>
                  <dd
                    class="mt-1 max-w-prose space-y-5 text-sm text-gray-900"
                    v-html="info.introduction"
                  />
                </div>
              </dl>
            </div>

            <div class="relative mt-6 mx-10">
              <div class="absolute inset-0 flex items-center" aria-hidden="true">
                <div class="w-full border-t border-gray-300" />
              </div>
              <div class="relative flex justify-center">
                <span class="bg-white px-3 text-base font-semibold leading-6 text-gray-900"
                  >企业核心成员</span
                >
              </div>
            </div>

            <!-- Team member list -->
            <div class="mx-auto mt-4 max-w-5xl px-4 pb-12 sm:px-6 lg:px-8">
              <div class="mt-1 grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div
                  v-for="user in enterpriseUserInfoProfile"
                  :key="user.user_id"
                  class="relative flex items-center space-x-3 rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm focus-within:ring-2 focus-within:ring-pink-500 focus-within:ring-offset-2 hover:border-gray-400"
                >
                  <div class="flex-shrink-0">
                    <img class="h-10 w-10 rounded-full" :src="user.content.icon" alt="" />
                  </div>
                  <div class="min-w-0 flex-1">
                    <a href="#" class="focus:outline-none">
                      <span class="absolute inset-0" aria-hidden="true" />
                      <p class="text-sm font-medium text-gray-900">{{ user.content.username }}</p>
                      <p class="truncate text-sm text-gray-500">{{ user.content.degree }}</p>
                    </a>
                  </div>
                  <div v-if="user.is_admin" class="flex flex-col items-center">
                    <UserPlusIcon class="h-6 w-6 text-red-500" />
                    <i class="text-xs font-bold underline decoration-pink-500 decoration-2"
                      >admin</i
                    >
                  </div>
                  <div v-else class="flex flex-col items-center">
                    <UserMinusIcon class="h-6 w-6 text-gray-500" />
                    <i class="text-xs font-bold decoration-gray-500 underline">normal</i>
                  </div>
                </div>
              </div>
            </div>
          </article>
        </main>
      </div>
    </div>
  </div>
</template>

<script setup>
import { EnvelopeIcon, PhoneIcon } from '@heroicons/vue/20/solid'

import { UserPlusIcon, UserMinusIcon } from '@heroicons/vue/24/outline'

import { onMounted, ref } from 'vue'

import {
  getEnterpriseInfo,
  getUserProfile,
  getEnterpriseUserInfoProfile
} from '@/stores/useCorporationStore'

let userProfile = ref(null)
let enterpriseInfo = ref(null)
let enterpriseUserInfoProfile = ref(null)

const props = defineProps({
  id: {
    type: [String, Number],
    required: true
  }
})

const info = ref({
  name: 'Google',
  location: 'US State',
  email: '1270414897@gmail.com',
  contact: '13467843418',
  jobPosts: ['1', '2', '3'],
  is_admin: false
})

async function fetchData() {
  userProfile.value = await getUserProfile()
  console.log(userProfile.value)
  enterpriseInfo.value = await getEnterpriseInfo(userProfile.value.enterprise)
  console.log(enterpriseInfo.value)
  enterpriseUserInfoProfile.value = await getEnterpriseUserInfoProfile()
  console.log(enterpriseUserInfoProfile.value)
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

const profile = {
  name: 'Ricardo Cooper',
  imageUrl:
    'https://images.unsplash.com/photo-1463453091185-61582044d556?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=1024&h=1024&q=80',
  coverImageUrl:
    'https://images.unsplash.com/photo-1444628838545-ac4016a5418a?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80',
  about: `
        <p>Tincidunt quam neque in cursus viverra orci, dapibus nec tristique. Nullam ut sit dolor consectetur urna, dui cras nec sed. Cursus risus congue arcu aenean posuere aliquam.</p>
        <p>Et vivamus lorem pulvinar nascetur non. Pulvinar a sed platea rhoncus ac mauris amet. Urna, sem pretium sit pretium urna, senectus vitae. Scelerisque fermentum, cursus felis dui suspendisse velit pharetra. Augue et duis cursus maecenas eget quam lectus. Accumsan vitae nascetur pharetra rhoncus praesent dictum risus suspendisse.</p>
      `,
  fields: {
    Phone: '(555) 123-4567',
    Email: 'ricardocooper@example.com',
    Title: 'Senior Front-End Developer',
    Team: 'Product Development',
    Location: 'San Francisco',
    Sits: 'Oasis, 4th floor',
    Salary: '$145,000',
    Birthday: 'June 8, 1990'
  }
}
</script>
