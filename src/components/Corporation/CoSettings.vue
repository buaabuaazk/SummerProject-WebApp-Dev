<template>
  <div>
    <ConfirmAlert
      :show="showConfirm"
      :closeModal="
        () => {
          showConfirm = false
          confirm = false
        }
      "
      :confirmModal="
        () => {
          showConfirm = false
          confirm = true
          showSuccess = true
        }
      "
      class="z-50"
    >
      <template v-slot:title>‼️‼️‼️管理员权限转移‼️‼️‼️</template>
      <template v-slot:content
        >您正在选择员工
        <i class="underline font-bold decoration-sky-500 decoration-4">{{ selectedUser.name }}</i>
        转移管理员权限， 转移管理员权限，
        <i class="underline font-bold decoration-sky-500 decoration-4">{{ selectedUser.name }}</i>
        接受后成为新的管理员。而您将转为普通员工，可退出企业、投递简历、加入其他企业等</template
      >
    </ConfirmAlert>
    <SuccessAlert
      :show="showSuccess"
      :closeModal="
        () => {
          showSuccess = false
        }
      "
      class="z-50"
    >
      <template v-slot:title>Successfully saved!</template>
      <template v-slot:content
        >请等待员工<i class="underline font-bold decoration-sky-500 decoration-4">{{
          selectedUser.name
        }}</i
        >接受您的权限转移申请</template
      >
    </SuccessAlert>
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

            <form class="flex items-start flex-col md:col-span-2 gap-2" @submit.prevent>
              <label for="timezone" class="block text-sm font-medium leading-6 text-black"
                >非管理员</label
              >
              <div class="my-2">
                <select
                  v-model="selectedUser"
                  id="timezone"
                  name="timezone"
                  class="block w-full rounded-md border-0 bg-white/5 py-1.5 text-black shadow-lg ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6 [&_*]:text-black"
                >
                  <option
                    v-for="user in normalUserInfoProfile()"
                    :key="user.user"
                    :value="{ id: user.user, name: user.content.username }"
                  >
                    {{ user.content.username }}
                  </option>
                </select>
              </div>
              <button
                class="rounded-md bg-red-500 px-3 py-2 text-sm font-semibold text-black shadow-sm hover:bg-red-400"
                @click="transferPri"
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
import { onMounted, ref, watch } from 'vue'
import {
  getEnterpriseInfo,
  getUserInfo,
  getUserProfile,
  getEnterpriseUserInfoProfile
} from '@/stores/useCorporationStore'

import ConfirmAlert from '@/components/Corporation/notifications/ConfirmAlert.vue'
import SuccessAlert from '@/components/Corporation/notifications/SuccessAlert.vue'

import axios from '@/utils/request'

let userInfo = ref(null)
let userProfile = ref(null)
let enterpriseInfo = ref(null)
let enterpriseUserInfoProfile = ref(null)

let selectedUser = ref(null)
let showConfirm = ref(false)
let showSuccess = ref(false)
let confirm = ref(false)

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

let transferPri = () => {
  console.log(selectedUser.value)
  showConfirm.value = true
}
// 监听是否确认，如果确认则发送log
watch(confirm, async (value) => {
  if (value) {
    const res = await axios.post('/api/profile/log', {
      user_id: selectedUser.value.id
    })
    console.log(res)
  }
})
</script>
