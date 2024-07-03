<template>
  <div class="px-4 sm:px-6 lg:px-8 mt-8">
    <div class="sm:flex sm:items-center">
      <div class="sm:flex-auto">
        <h1 class="text-base font-semibold leading-6 text-gray-900">企业员工</h1>
        <p class="mt-2 text-sm text-gray-700">
          企业用户管理页面，可以查看企业用户的信息，添加新用户，修改用户信息等。
        </p>
      </div>
      <div class="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
        <button
          type="button"
          class="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          添加员工
        </button>
      </div>
    </div>
    <div class="mt-8 flow-root">
      <div class="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div class="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
          <table class="min-w-full divide-y divide-gray-300">
            <thead>
              <tr>
                <th
                  scope="col"
                  class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0"
                >
                  姓名
                </th>
                <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                  学历
                </th>
                <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                  工时
                </th>
                <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                  职权
                </th>
                <th scope="col" class="relative py-3.5 pl-3 pr-4 sm:pr-0">
                  <span class="text-black">管理</span>
                </th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-200 bg-white">
              <tr v-for="person in people" :key="person.user_id">
                <td class="whitespace-nowrap py-5 pl-4 pr-3 text-sm sm:pl-0">
                  <div class="flex items-center">
                    <div class="h-11 w-11 flex-shrink-0">
                      <img class="h-11 w-11 rounded-full" :src="person.content.icon" alt="" />
                    </div>
                    <div class="ml-4">
                      <div class="font-medium text-gray-900">
                        {{ person.content.username }}
                      </div>
                      <div class="mt-1 text-gray-500">{{ person.user }}</div>
                    </div>
                  </div>
                </td>
                <td class="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                  <div class="text-gray-900">{{ person.content.degree }}</div>
                  <div class="mt-1 text-gray-500">{{ person.content.repo }}</div>
                </td>
                <td class="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                  {{ person.work_age + '年' }}
                </td>
                <td class="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                  <UserPlusIcon v-if="person.is_admin" class="h-6 w-6 text-red-500" />
                  <UserMinusIcon v-else class="h-6 w-6 text-gray-500" />
                </td>
                <td class="relative whitespace-nowrap py-5 text-sm font-medium sm:pr-0 mx-auto">
                  <a href="#" class="text-red-600 hover:text-red-900" v-if="!person.is_admin"
                    >Delete</a
                  >
                  <a href="#" class="text-red-600 hover:text-red-900 cursor-not-allowed" v-else
                    ><NoSymbolIcon class="h-7 w-7 text-gray-500"
                  /></a>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { UserPlusIcon, UserMinusIcon } from '@heroicons/vue/24/outline'
import { NoSymbolIcon } from '@heroicons/vue/24/outline'

import { getEnterpriseUserInfoProfile } from '@/stores/useCorporationStore'
import { onMounted, ref } from 'vue'

let people = ref([])

async function fetchData() {
  people.value = await getEnterpriseUserInfoProfile()
}

onMounted(async () => {
  await fetchData()
})
</script>
