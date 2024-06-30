<template>
  <div class="fixed h-screen flex flex-col shadow-xl right-0 top-16 w-16 bg-white">
    <div class="sidebar-icon group">
      <EyeIcon class="h-7 w-7" />
      <span class="sidebar-tooltip group-hover:scale-100">企业基本信息</span>
    </div>
    <hr class="sidebar-hr" />
    <div class="sidebar-icon group">
      <BriefcaseIcon class="h-7 w-7" />
      <span class="sidebar-tooltip group-hover:scale-100">招聘管理</span>
    </div>
    <div class="sidebar-icon group">
      <BookOpenIcon class="h-7 w-7" />
      <span class="sidebar-tooltip group-hover:scale-100">企业动态</span>
    </div>
    <div class="sidebar-icon group">
      <UserIcon class="h-7 w-7" />
      <span class="sidebar-tooltip group-hover:scale-100">企业员工管理</span>
    </div>
    <hr class="sidebar-hr" />
    <div class="sidebar-icon group">
      <Cog8ToothIcon class="h-7 w-7" />
      <span class="sidebar-tooltip group-hover:scale-100">设置</span>
    </div>
  </div>
</template>

<script setup>
import {
  EyeIcon,
  BriefcaseIcon,
  BookOpenIcon,
  UserIcon,
  Cog8ToothIcon
} from '@heroicons/vue/24/outline'
</script>
