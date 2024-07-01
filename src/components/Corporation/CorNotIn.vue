<template>
  <div>
    <main class="grid h-dvh place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8">
      <div class="text-center">
        <p class="text-base font-semibold text-indigo-600">404</p>
        <h1 class="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">页面不存在</h1>
        <p class="mt-6 text-base leading-7 text-gray-600">
          对不起，您并没有加入任何企业，或许你可以尝试创建企业成为企业管理员👇🏻或者加入其他推荐的企业
        </p>
        <div class="mt-10 flex items-center justify-center gap-x-6">
          <a
            href="#"
            class="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            @click="openModal"
            >创建企业</a
          >
          <a href="#" class="text-sm font-semibold text-gray-900"
            >联系帮助 <span aria-hidden="true">&rarr;</span></a
          >
        </div>
      </div>

      <div class="bg-white">
        <div class="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
          <h2 class="text-xl font-bold text-gray-900">热门企业列表</h2>

          <div
            class="mt-8 grid grid-cols-1 gap-y-12 sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-4 xl:gap-x-8"
          >
            <div v-for="company in companies" :key="company.id" class="group">
              <div class="relative">
                <div class="relative h-72 w-full overflow-hidden rounded-lg">
                  <img
                    :src="company.imageSrc"
                    :alt="company.imageAlt"
                    class="h-full w-full object-cover object-center group-hover:opacity-75"
                  />
                </div>
                <div class="relative mt-4">
                  <h3 class="text-sm font-medium text-gray-900">{{ company.name }}</h3>
                  <p class="mt-1 text-sm text-gray-500">{{ company.color }}</p>
                </div>
                <div
                  class="absolute inset-x-0 top-0 flex h-72 items-end justify-end overflow-hidden rounded-lg p-4"
                >
                  <div
                    aria-hidden="true"
                    class="absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-black opacity-50"
                  />
                  <p class="relative text-lg font-semibold text-white">{{ company.price }}</p>
                </div>
              </div>
              <div class="mt-6">
                <a
                  @click="router.push('/CorporationInfo/10')"
                  class="relative flex items-center justify-center rounded-md border border-transparent bg-gray-100 px-8 py-2 text-sm font-medium text-gray-900 hover:bg-gray-200"
                  >查看详情<span class="sr-only">, {{ company.name }}</span></a
                >
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
    <div>
      <TransitionRoot :show="isOpen" as="template">
        <Dialog as="div" class="relative z-50" @close="closeModal">
          <TransitionChild
            as="template"
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div class="fixed inset-0 bg-black bg-opacity-25" />
          </TransitionChild>

          <div class="fixed inset-0 overflow-y-auto">
            <div class="flex min-h-full items-center justify-center p-4 text-center">
              <TransitionChild
                as="template"
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <DialogPanel
                  class="min-w-[60%] transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all"
                >
                  <DialogTitle as="h3" class="text-lg font-semibold leading-6 text-gray-900">
                    创建企业
                  </DialogTitle>

                  <form @submit.prevent>
                    <div class="space-y-12">
                      <div class="border-b border-gray-900/10 pb-12">
                        <div class="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                          <div class="sm:col-span-4">
                            <label
                              for="username"
                              class="block text-sm font-medium leading-6 text-gray-900"
                              >企业名称</label
                            >
                            <div class="mt-2">
                              <div
                                class="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md"
                              >
                                <span
                                  class="flex select-none items-center pl-3 text-gray-500 sm:text-sm"
                                  >Company Name/</span
                                >
                                <input
                                  type="text"
                                  name="username"
                                  id="username"
                                  autocomplete="username"
                                  class="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                  placeholder="janesmith"
                                  v-model="formData.name"
                                  required
                                />
                              </div>
                            </div>
                          </div>

                          <div class="col-span-full">
                            <label
                              for="about"
                              class="block text-sm font-medium leading-6 text-gray-900"
                              >企业简介</label
                            >
                            <div class="mt-2">
                              <textarea
                                id="about"
                                name="about"
                                rows="3"
                                class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 p-2"
                                v-model="formData.introduction"
                                required
                              />
                            </div>
                            <p class="mt-3 text-sm leading-6 text-gray-600">
                              介绍一下你的公司，比如公司的业务范围、公司的使命、愿景等等
                            </p>
                          </div>

                          <div class="col-span-full">
                            <label
                              for="cover-photo"
                              class="block text-sm font-medium leading-6 text-gray-900"
                              >企业头像</label
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
                                    <span>上传一个文件</span>
                                    <input
                                      id="file-upload"
                                      name="file-upload"
                                      type="file"
                                      class="sr-only"
                                      @change="handleFileUpload"
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

                    <div class="mt-6 flex items-center justify-end gap-x-6">
                      <button
                        type="button"
                        class="text-sm font-semibold leading-6 text-gray-900"
                        @click="closeModal"
                      >
                        取消
                      </button>
                      <button
                        type="submit"
                        class="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        @click="submit"
                      >
                        创建
                      </button>
                    </div>
                  </form>
                </DialogPanel>
              </TransitionChild>
            </div>
          </div>
        </Dialog>
      </TransitionRoot>
    </div>
  </div>
</template>

<script setup>
import { Dialog, DialogPanel, DialogTitle, TransitionRoot, TransitionChild } from '@headlessui/vue'
import { ref } from 'vue'

import axios from '@/utils/request'
import { useRouter } from 'vue-router'

const router = useRouter()

let isOpen = ref(false)

function closeModal() {
  isOpen.value = false
}
function openModal() {
  isOpen.value = true
}

let formData = ref({
  name: '',
  introduction: '',
  file: null,
  field: ''
})

const companies = [
  {
    id: 1,
    name: '百度',
    color: '百度是中国最大的搜索引擎',
    href: '#',
    imageSrc: 'https://pic.imgdb.cn/item/667e168cd9c307b7e9ca4086.jpg',
    imageAlt:
      'Front of zip tote bag with white canvas, black canvas straps and handle, and black zipper pulls.',
    price: '140岗位'
  },
  {
    id: 2,
    name: '网易',
    color: '网易是中国最大的游戏公司',
    href: '#',
    imageSrc: 'https://pic.imgdb.cn/item/667e17e8d9c307b7e9cc10fa.png',
    imageAlt:
      'Front of zip tote bag with white canvas, black canvas straps and handle, and black zipper pulls.',
    price: '97岗位'
  },
  {
    id: 3,
    name: '京东',
    color: '京东是中国最大的电商公司',
    href: '#',
    imageSrc: 'https://pic.imgdb.cn/item/667e17c1d9c307b7e9cbdd4a.jpg',
    imageAlt:
      'Front of zip tote bag with white canvas, black canvas straps and handle, and black zipper pulls.',
    price: '34岗位'
  },
  {
    id: 4,
    name: '腾讯',
    color: '腾讯是中国最大的社交公司',
    href: '#',
    imageSrc: 'https://pic.imgdb.cn/item/667e1802d9c307b7e9cc33ea.png',
    imageAlt:
      'Front of zip tote bag with white canvas, black canvas straps and handle, and black zipper pulls.',
    price: '123岗位'
  }
]

const submit = async () => {
  closeModal()

  console.log(formData.value)

  const formDataUpload = new FormData()

  formDataUpload.append('name', formData.value.name)
  formDataUpload.append('introduction', formData.value.introduction)
  formDataUpload.append('file', formData.value.file)
  formDataUpload.append('field', formData.value.field)

  axios.post('/api/enterprise/register', formDataUpload)

  setTimeout(() => {
    router.push('/CorporationInfo/')
  }, 2000)
}

function handleFileUpload(e) {
  const file = e.target.files[0]
  console.log(file)
  formData.value.file = file
}
</script>
