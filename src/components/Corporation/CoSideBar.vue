<template>
  <div class="fixed h-screen flex flex-col shadow-xl right-0 top-16 w-16 bg-white">
    <router-link :to="{ name: childName('CoInfo') }">
      <div class="sidebar-icon group">
        <EyeIcon class="h-7 w-7" />
        <span class="sidebar-tooltip group-hover:scale-100">企业基本信息</span>
      </div>
    </router-link>
    <hr class="sidebar-hr" />
    <router-link :to="{ name: childName('CoTest') }" v-if="is_admin">
      <div class="sidebar-icon group">
        <FireIcon class="h-7 w-7 text-red-400" />
        <span class="sidebar-tooltip group-hover:scale-100">测试页面</span>
      </div>
    </router-link>
    <hr class="sidebar-hr" />
    <router-link :to="{ name: childName('CoRecruit') }" v-if="is_admin">
      <div class="sidebar-icon group">
        <BriefcaseIcon class="h-7 w-7" />
        <span class="sidebar-tooltip group-hover:scale-100">招聘管理</span>
      </div>
    </router-link>
    <router-link :to="{ name: childName('CoTrend') }">
      <div class="sidebar-icon group">
        <BookOpenIcon class="h-7 w-7" />
        <span class="sidebar-tooltip group-hover:scale-100">企业动态</span>
      </div>
    </router-link>
    <router-link :to="{ name: childName('CoUser') }" v-if="is_admin">
      <div class="sidebar-icon group">
        <UserIcon class="h-7 w-7" />
        <span class="sidebar-tooltip group-hover:scale-100">企业员工管理</span>
      </div>
    </router-link>
    <hr class="sidebar-hr" />
    <router-link :to="{ name: childName('CoSettings') }" v-if="is_admin">
      <div class="sidebar-icon group">
        <Cog8ToothIcon class="h-7 w-7" />
        <span class="sidebar-tooltip group-hover:scale-100">设置</span>
      </div>
    </router-link>
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router'
import { ref } from 'vue'
import {
  FireIcon,
  EyeIcon,
  BriefcaseIcon,
  BookOpenIcon,
  UserIcon,
  Cog8ToothIcon
} from '@heroicons/vue/24/outline'
import { onMounted } from 'vue'
import { getUserProfile } from '@/stores/useCorporationStore'

const props = defineProps({
  enterprise_id: String || Number
})

const route = useRoute()

function childName(path) {
  const currentPath = route.path
  const pattern = /CorporationInfo\/\d+/
  if (pattern.test(currentPath)) {
    return 'Id' + path
  } else {
    return path
  }
}

const currentUser = ref(null)

let is_admin = ref(false)

async function fetchData() {
  currentUser.value = await getUserProfile()
  console.log(currentUser.value)
}

onMounted(async () => {
  await fetchData()
  is_admin.value = currentUser.value.is_admin
  if (props.enterprise_id && props.enterprise_id != currentUser.value.enterprise) {
    console.log('企业ID不匹配')
    is_admin.value = false
  }
})
</script>
