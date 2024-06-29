<!--
 * @Date: 2024-06-23 19:27:22
 * @Author: Q9K
 * @Description: 创建企业的表单页
-->
<template>
  <div>
    <TransitionRoot as="template" :show="props.isOpen">
      <Dialog class="relative z-10" @close="props.closeModal">
        <TransitionChild
          as="template"
          enter="ease-out duration-300"
          enter-from="opacity-0"
          enter-to="opacity-100"
          leave="ease-in duration-200"
          leave-from="opacity-100"
          leave-to="opacity-0"
        >
          <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </TransitionChild>

        <div class="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div
            class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0"
          >
            <TransitionChild
              as="template"
              enter="ease-out duration-300"
              enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enter-to="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leave-from="opacity-100 translate-y-0 sm:scale-100"
              leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <DialogPanel
                class="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all mt-[4rem] sm:w-full sm:max-w-lg sm:p-6"
              >
                <form>
                  <div class="space-y-12">
                    <div class="border-b border-gray-900/10 pb-12">
                      <div class="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                        <div class="sm:col-span-4">
                          <label
                            for="username"
                            class="block text-sm font-medium leading-6 text-gray-900"
                            >公司名</label
                          >
                          <div class="mt-2">
                            <div
                              class="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md"
                            >
                              <span
                                class="flex select-none items-center pl-3 text-gray-500 sm:text-sm"
                                >name/</span
                              >
                              <input
                                type="text"
                                name="username"
                                id="username"
                                autocomplete="username"
                                class="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                :placeholder="formData.name"
                                v-model="formData.name"
                              />
                            </div>
                          </div>
                        </div>

                        <div class="col-span-full">
                          <label
                            for="about"
                            class="block text-sm font-medium leading-6 text-gray-900"
                            >公司简介</label
                          >
                          <div class="mt-2">
                            <textarea
                              id="about"
                              name="about"
                              rows="3"
                              class="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                              v-model="formData.introduction"
                            />
                          </div>
                          <p class="mt-3 text-sm leading-6 text-gray-600">
                            Write a few sentences about your company.
                          </p>
                        </div>

                        <div class="col-span-full">
                          <label
                            for="cover-photo"
                            class="block text-sm font-medium leading-6 text-gray-900"
                            >公司头像</label
                          >
                          <div
                            class="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10"
                          >
                            <div class="text-center">
                              <PhotoIcon
                                class="mx-auto h-12 w-12 text-gray-300"
                                aria-hidden="true"
                              />
                              <div class="mt-4 flex text-sm leading-6 text-gray-600">
                                <label
                                  for="file-upload"
                                  class="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                                >
                                  <span>Upload a file</span>
                                  <input
                                    id="file-upload"
                                    name="file-upload"
                                    type="file"
                                    class="sr-only"
                                  />
                                </label>
                                <p class="pl-1">or drag and drop</p>
                              </div>
                              <p class="text-xs leading-5 text-gray-600">
                                PNG, JPG, GIF up to 10MB
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </form>
                <div class="mt-5 sm:mt-6 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3">
                  <button
                    type="button"
                    class="inline-flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 sm:col-start-2"
                    @click="handleSubmit"
                  >
                    提交
                  </button>
                  <button
                    type="button"
                    class="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:col-start-1 sm:mt-0"
                    @click="props.closeModal"
                    ref="cancelButtonRef"
                  >
                    取消
                  </button>
                </div>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </TransitionRoot>
  </div>
</template>

<script setup>
import { Dialog, DialogPanel, DialogTitle, TransitionRoot, TransitionChild } from '@headlessui/vue'
import { onMounted, ref } from 'vue'

import { CheckIcon } from '@heroicons/vue/24/outline'

import axios from '@/utils/request'

const props = defineProps({
  isOpen: Boolean,
  openModal: Function,
  closeModal: Function,
  updateData: Function,
  enterpriseInfo: Object
})

let formData = ref({
  name: '',
  introduction: '',
  icon_url: ''
})

onMounted(() => {
  formData.value.name = props.enterpriseInfo.name
  formData.value.introduction = props.enterpriseInfo.introduction
  formData.value.icon_url = props.enterpriseInfo.icon_url
  console.log(props.enterpriseInfo)
})

let handleSubmit = async () => {
  props.closeModal()
  console.log(formData.value)
  const res = await axios.patch(
    '/api/enterprise/info?enterprise_id=' + props.enterpriseInfo.enterprise_id,
    formData.value
  )
  await props.updateData()
  console.log(res)
}
</script>
