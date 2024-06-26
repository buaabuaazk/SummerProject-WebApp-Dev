<template>
  <div class="h-[12rem] bg-[#37566B] pb-4 pt-8 shadow">
    <div class="mx-auto grid h-full max-w-7xl grid-rows-3 gap-1 px-2 sm:px-4 lg:px-8">
      <div
        class="row-span-2 grid grid-cols-[6rem_repeat(11,minmax(0,1fr))] rounded-lg bg-blue-500 shadow"
      >
        <div
          class="mr-1 flex items-center justify-center overflow-hidden rounded-md bg-orange-300 shadow"
        >
          <img :src="img_url" alt="123" class="w-full object-cover" />
        </div>
        <div class="col-span-8 mr-1 grid grid-rows-3 rounded-md bg-orange-300 shadow">
          <div class="row-span-2 grid grid-cols-[auto_repeat(11,minmax(0,1fr))] bg-pink-200">
            <div class="flex items-center rounded-lg p-2 text-2xl font-semibold shadow">
              众防保安招聘
            </div>
            <div class="col-span-5 shadow"></div>
          </div>
          <div class="bg-pink-400"></div>
        </div>
        <div class="col-span-3 rounded-md bg-orange-300 shadow"></div>
      </div>
      <div class="rounded-lg bg-red-500 shadow"></div>
    </div>
  </div>
  <div
    class="m-2 grid h-10 grid-cols-[repeat(3,auto)_repeat(9,minmax(0,1fr))] gap-1 rounded-lg bg-slate-50 shadow-lg"
  >
    <div class="min-w-20 rounded-lg border-y-2 bg-blue-100"></div>
    <div class="min-w-20 rounded-lg border-y-2 bg-blue-100"></div>
    <div class="min-w-20 rounded-lg border-y-2 bg-blue-100"></div>
  </div>
  <div class="m-2 grid h-[40rem] grid-cols-12 gap-2 rounded-xl bg-white p-2 shadow-xl">
    <div class="col-span-8 grid h-[30rem] rounded-lg shadow-lg"></div>
    <div class="col-span-4 grid h-[10rem] rounded-lg shadow-lg"></div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import axios from 'axios'

const data = ref(null)
let img_url = ref(null)

const fetchData = async () => {
  try {
    const res = await axios.get('http://8.130.25.189:8000/api/enterprise/info?enterprise_id=1')
    data.value = res.data
    img_url.value = data.value.icon_url

    console.log('获取成功', data.value.icon_url)
  } catch (error) {
    console.error('获取失败', error)
  }
}

onMounted(() => {
  fetchData()
})
</script>
