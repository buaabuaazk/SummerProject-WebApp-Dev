<template>
  <div>
    <div class="xl:pl-72">
      <main>
        <h1 class="sr-only">Account Settings</h1>

        <!-- Settings forms -->
        <div class="divide-y divide-white/5">
          <div
            class="grid max-w-7xl grid-cols-1 gap-x-8 gap-y-10 px-4 py-16 sm:px-6 md:grid-cols-3 lg:px-8"
          >
            <div>
              <h2 class="text-base font-semibold leading-7 text-black">公司信息</h2>
              <p class="mt-1 text-sm leading-6 text-gray-400">
                公司信息是您的企业的基本信息，包括公司名称、公司简介、公司头像等。
              </p>
            </div>

            <form class="md:col-span-2">
              <div class="grid grid-cols-1 gap-x-6 gap-y-8 sm:max-w-xl sm:grid-cols-6">
                <div class="col-span-full flex items-center gap-x-8">
                  <img
                    :src="formData.icon"
                    alt="None"
                    class="h-24 w-24 flex-none rounded-full bg-gray-800 object-cover"
                  />
                  <div>
                    <div class="mt-4 flex text-sm leading-6 text-gray-600">
                      <label
                        for="file-upload"
                        class="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                      >
                        <span class="shadow-lg rounded-md bg-slate-100 p-2">Upload a file</span>
                        <input
                          id="file-upload"
                          name="file-upload"
                          type="file"
                          class="sr-only"
                          @change="handleFileUpload"
                        />
                      </label>
                    </div>
                    <p class="mt-2 text-xs leading-5 text-gray-400">JPG, GIF or PNG. 1MB max.</p>
                  </div>
                </div>

                <div class="sm:col-span-3">
                  <label for="first-name" class="block text-sm font-medium leading-6 text-black"
                    >企业名</label
                  >
                  <div class="mt-2">
                    <input
                      type="text"
                      name="first-name"
                      id="first-name"
                      autocomplete="given-name"
                      v-model="formData.name"
                      class="block w-full rounded-md border-0 bg-white/5 p-1.5 text-black shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div class="col-span-full">
                  <label for="email" class="block text-sm font-medium leading-6 text-black"
                    >企业介绍</label
                  >
                  <div class="mt-2">
                    <textarea
                      v-model="formData.introduction"
                      class="block w-full rounded-md border-0 bg-white/5 p-1.5 text-black shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
              </div>

              <div class="mt-8 flex">
                <button
                  @click="handleSubmit"
                  type="submit"
                  class="rounded-md bg-indigo-500 px-3 py-2 text-sm font-semibold text-black shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
                >
                  Save
                </button>
              </div>
            </form>
          </div>

          <div
            class="grid max-w-7xl grid-cols-1 gap-x-8 gap-y-10 px-4 py-16 sm:px-6 md:grid-cols-3 lg:px-8"
          >
            <div>
              <h2 class="text-base font-semibold leading-7 text-black">管理员权限转让</h2>
              <p class="mt-1 text-sm leading-6 text-gray-400">
                管理员权限转让后，您将不再是企业的管理员，您可以选择将管理员权限转让给其他员工。
              </p>
            </div>

            <form class="flex items-start flex-col md:col-span-2 gap-2">
              <label for="timezone" class="block text-sm font-medium leading-6 text-black"
                >非管理员</label
              >
              <div class="my-2">
                <select
                  id="timezone"
                  name="timezone"
                  class="block w-full rounded-md border-0 bg-white/5 py-1.5 text-black shadow-lg ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6 [&_*]:text-black"
                >
                  <option v-for="user in normalUserInfoProfile()" :key="user.user_id">
                    {{ user.first_name }}_{{ user.last_name }}
                  </option>
                </select>
              </div>
              <button
                type="submit"
                class="rounded-md bg-red-500 px-3 py-2 text-sm font-semibold text-black shadow-sm hover:bg-red-400"
              >
                是的，转移我的管理员权限
              </button>
            </form>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import {
  getEnterpriseInfo,
  getUserInfo,
  getUserProfile,
  getEnterpriseUserInfoProfile
} from '@/stores/useCorporationStore'

import axios from '@/utils/request'

let userInfo = ref(null)
let userProfile = ref(null)
let enterpriseInfo = ref(null)
let enterpriseUserInfoProfile = ref(null)

let formData = ref({
  name: '',
  introduction: '',
  icon: '',
  file: null,
  field: ''
})

async function fetchData() {
  userInfo.value = await getUserInfo()
  console.log(userInfo.value)
  userProfile.value = await getUserProfile()
  console.log(userProfile.value)
  enterpriseInfo.value = await getEnterpriseInfo(userProfile.value.enterprise)
  console.log(enterpriseInfo.value)
  enterpriseUserInfoProfile.value = await getEnterpriseUserInfoProfile()
}

let normalUserInfoProfile = () => {
  return enterpriseUserInfoProfile.value?.filter((item) => !item.is_admin)
}

async function refresh() {
  await fetchData()
  formData.value.name = enterpriseInfo.value.name
  formData.value.introduction = enterpriseInfo.value.introduction
  formData.value.icon = enterpriseInfo.value.icon
}

function handleFileUpload(e) {
  const file = e.target.files[0]
  console.log(file)
  formData.value.file = file
}

onMounted(async () => {
  await refresh()
})

let handleSubmit = async () => {
  const formDataUpload = new FormData()

  formDataUpload.append('name', formData.value.name)
  formDataUpload.append('introduction', formData.value.introduction)
  formDataUpload.append('file', formData.value.file)
  formDataUpload.append('field', formData.value.field)

  console.log(formDataUpload)

  const res = await axios.patch(
    '/api/enterprise/info?enterprise_id=' + enterpriseInfo.value.enterprise_id,
    formDataUpload
  )
  await refresh()
}
</script>
