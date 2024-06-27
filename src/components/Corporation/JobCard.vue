<template>
  <div
    class="w-full md:w-[16rem] 2xl:w-[18rem] h-[16rem] md:h-[18rem] bg-white flex flex-col justify-between shadow-lg rounded-md px-3 py-5"
  >
    <div class="flex gap-3">
      <img :src="job.company.profileUrl" :alt="job?.company?.name" class="w-14 h-14" />

      <div class="">
        <p class="text-lg font-semibold truncate">{{ job?.jobTitle }}</p>
        <span class="flex gap-2 items-center">
          <GoLocation class="text-slate-900 text-sm" />
          {{ job?.location }}
        </span>
      </div>
    </div>

    <div class="py-3">
      <p class="text-sm">
        {{ job?.detail[0]?.desc?.slice(0, 150) + '...' }}
      </p>
    </div>

    <div class="flex items-center justify-between">
      <p class="bg-[#1d4fd826] text-[#1d4fd8] py-0.5 px-1.5 rounded font-semibold text-sm">
        {{ job?.jobType }}
      </p>
      <span class="text-gray-500 text-sm">
        {{ timeSince(job?.createdAt) }}
      </span>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const props = defineProps({
  job: Object
})

let job = ref(props.job)

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
