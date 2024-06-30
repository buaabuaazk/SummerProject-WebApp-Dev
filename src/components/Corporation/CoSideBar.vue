<template>
  <div class="fixed h-screen flex flex-col shadow-xl right-0 top-16 w-16 bg-white">
    <router-link :to="{ name: childName('CoInfo') }">
      <div class="sidebar-icon group">
        <EyeIcon class="h-7 w-7" />
        <span class="sidebar-tooltip group-hover:scale-100">企业基本信息</span>
      </div>
    </router-link>
    <hr class="sidebar-hr" />
    <router-link :to="{ name: childName('CoTest') }">
      <div class="sidebar-icon group">
        <FireIcon class="h-7 w-7 text-red-400" />
        <span class="sidebar-tooltip group-hover:scale-100">测试页面</span>
      </div>
    </router-link>
    <hr class="sidebar-hr" />
    <router-link :to="{ name: childName('CoRecruit') }">
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
    <router-link :to="{ name: childName('CoUser') }">
      <div class="sidebar-icon group">
        <UserIcon class="h-7 w-7" />
        <span class="sidebar-tooltip group-hover:scale-100">企业员工管理</span>
      </div>
    </router-link>
    <hr class="sidebar-hr" />
    <router-link :to="{ name: childName('CoSettings') }">
      <div class="sidebar-icon group">
        <Cog8ToothIcon class="h-7 w-7" />
        <span class="sidebar-tooltip group-hover:scale-100">设置</span>
      </div>
    </router-link>
  </div>
</template>

<script setup>
import { useRouter, useRoute } from 'vue-router'
import {
  FireIcon,
  EyeIcon,
  BriefcaseIcon,
  BookOpenIcon,
  UserIcon,
  Cog8ToothIcon
} from '@heroicons/vue/24/outline'

const router = useRouter()
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
</script>
