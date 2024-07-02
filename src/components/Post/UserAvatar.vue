<!--
 * @Date: 2024-06-29 10:48:53
 * @Author: Q9K
 * @Description: 用户头像组件，根据用户是否是当前用户决定是否弹出关注，私信操作
 * @props: userId
-->
<template>
  <div class="flex items-center">
    <template v-if="isCurrentUser">
      <n-avatar round :src="props.avatar" size="large" lazy @click.stop="goToUserInfo()" />
    </template>
    <template v-else>
      <n-popover trigger="hover" :show-arrow="false">
        <template #trigger>
          <n-avatar round :src="props.avatar" size="large" lazy @click.stop="goToUserInfo()" />
        </template>
        <template v-if="!isCurrentUser">
          <div class="flex flex-col justify-center">
            <n-button @click="handleSubscribe()" v-if="!hasSubscribed">关注</n-button>
            <n-button @click="handleSubscribe()" v-else>取关</n-button>
            <n-button @click="handleChat()">私信</n-button>
          </div>
        </template>
      </n-popover>
    </template>
  </div>
</template>

<script setup>
import { useMessageStore } from '@/stores/useMessageStore'
import useCurrentUserStore from '@/stores/useCurrentUserStore'
import useTokenStore from '@/stores/useTokenStore'
import { debug } from '@/config'
import { ref, computed, onMounted, watch } from 'vue'
import axios from '@/utils/request'
import { useRouter } from 'vue-router'
import { useNotification } from 'naive-ui'

const notification = useNotification()
const messageStore = useMessageStore()
const currentUserStore = useCurrentUserStore()
const currentUser = currentUserStore.currentUser
const router = useRouter()
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
const emit = defineEmits(['closeModal'])
const isCurrentUser = computed(() => {
  if (currentUser) {
    return parseInt(currentUser.user_id) === parseInt(props.user_id)
  } else {
    return false
  }
})

const hasSubscribed = ref(false)
const user_id = ref(props.user_id)
const hasLogined = ref(false)
onMounted(async () => {
  if (user_id.value) {
    const tokenStore = useTokenStore()
    if (tokenStore.token) {
      hasLogined.value = true
      const res = await axios.get('/api/user/subscribe', {
        params: {
          user_id: user_id.value
        }
      })
      const data = res.data
      hasSubscribed.value = data.isSubscribed
    }
  }
})
//有props在onMounted中访问不到的bug，通过watch来解决
watch(user_id, async (oldVal, newVal) => {
  if (hasLogined.value) {
    const res = await axios.get('/api/user/subscribe', {
      params: {
        user_id: newVal
      }
    })

    const data = res.data
    hasSubscribed.value = data.isSubscribed
  }
})

const handleChat = async () => {
  if (hasLogined.value) {
    const receiver = props.user_id
    const sender = currentUser.id
    //TODO:触发私信聊天框
    emit('closeModal')
    messageStore.sendMessage(receiver)
  } else {
    notification.error({
      title: '未登录',
      content: '请先登录'
    })
    router.push('/sos/login')
  }
}
const handleSubscribe = async () => {
  if (hasLogined.value) {
    const receiver = props.user_id
    const res = await axios.put('/api/user/subscribe', {
      user_id: receiver
    })
    if (hasSubscribed.value === false) {
      notification.success({
        title: '关注成功',
        content: '您已成功关注该用户'
      })
      hasSubscribed.value = true
    } else {
      notification.success({
        title: '取消关注',
        content: '您已取消关注该用户'
      })
      hasSubscribed.value = false
    }
  } else {
    notification.error({
      title: '未登录',
      content: '请先登录'
    })
    router.push('/sos/login')
  }
}
const goToUserInfo = () => {
  router.push({
    path: '/personalInfo'
  })
}
</script>
