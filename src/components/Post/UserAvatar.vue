<!--
 * @Date: 2024-06-29 10:48:53
 * @Author: Q9K
 * @Description: 用户头像组件，根据用户是否是当前用户决定是否弹出关注，私信操作
 * @props: userId
-->
<template>
  <div class="flex items-center">
    <n-popover trigger="hover" :show-arrow="false">
      <template #trigger>
        <n-avatar round :src="props.avatar" size="large" lazy />
      </template>
      <div class="flex flex-col justify-center">
        <n-button>关注</n-button>
        <n-button>私信</n-button>
      </div>
    </n-popover>
  </div>
</template>

<script setup>
import {
  PersonCircleOutline as UserIcon,
  Pencil as EditIcon,
  LogOutOutline as LogoutIcon
} from '@vicons/ionicons5'
import { NIcon } from 'naive-ui'
import useCurrentUserStore from '@/stores/useCurrentUserStore'

import { ref, computed, h } from 'vue'
import axios from '@/utils/request'
const currentUserStore = useCurrentUserStore()
const currentUser = currentUserStore.currentUser
const props = defineProps({
  user_id: {
    type: String,
    required: true
  },
  avatar: {
    type: String,
    default: 'https://primefaces.org/cdn/primevue/images/avatar/amyelsner.png'
  }
})
const isCurrentUser = computed(() => {
  return currentUserStore.currentUser.id === props.user_id
})

const renderIcon = (icon) => {
  return () => {
    return h(NIcon, null, {
      default: () => h(icon)
    })
  }
}
const options = ref([
  {
    label: '用户资料',
    key: 'profile',
    icon: renderIcon(UserIcon)
  },
  {
    label: '编辑用户资料',
    key: 'editProfile',
    icon: renderIcon(EditIcon)
  },
  {
    label: '退出登录',
    key: 'logout',
    icon: renderIcon(LogoutIcon)
  }
])

const handleChat = async () => {
  const receiver = props.user_id
  const sender = currentUser.id
  //TODO:触发私信聊天框
}
const handleSubscribe = async () => {
  const receiver = props.user_id
  const sender = currentUser.id
  let res = axios.put('/api/user/subscribe', {
    user_id: receiver
  })
  if (200 <= res.requset.status && res.requset.status < 300) {
    // NotifyPlugin.success('关注成功')
  }
}
</script>
