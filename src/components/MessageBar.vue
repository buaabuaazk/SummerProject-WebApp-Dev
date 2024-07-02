<!--
 * @Date: 2024-06-23 13:28:31
 * @Author: Q9K
 * @Description: 页面右下角的消息box
-->

<template>
  <div
    class="dragarea"
    :style="{
      top: `${position.top}px`,
      left: `${position.left}px`,
      width: `${width}px`,
      height: `${height}px`
    }"
    @mousedown="mouseDownHandler"
    ref="draggableContainer"
  >
    <button @click="handleAppendMessage">添加消息</button>
    <NaiveChat
      ref="naiveChatRef"
      style="background-color: antiquewhite"
      :user-info="userInfo"
      @change-contact="changeContact"
      @pull-message="pullMessage"
      @send="sendMessage"
    >
      <template #message-tools-right>
        <button>Settings</button>
      </template>
      <template #default-page>
        <p style="background-color: rgb(0, 255, 81)">备忘录: WorkNow团队加班开发中~敬请期待~</p>
      </template>
      <template #sidebar-contact-header>
        <button style="margin-left: 5rem">我的朋友</button>
      </template>

      <template #sidebar-header>
        <a-button @click="messageStore.closeMessageBox"> 稍后再聊~</a-button>
      </template>

      <template #message-tools> </template>
    </NaiveChat>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, watch, } from 'vue'
import axios from '@/utils/request'
import { NaiveChat } from 'naive-chat'
import { onBeforeUnmount } from 'vue'
import useTokenStore from '@/stores/useTokenStore'
import { useMessageStore } from '@/stores/useMessageStore'
import useCurrentUserStore from '@/stores/useCurrentUserStore'

const naiveChatRef = ref()

const tokenStore = useTokenStore()
const token = tokenStore.getToken
const messageStore = useMessageStore()
const currentUserStore = useCurrentUserStore()
const currentUser = currentUserStore.getCurrentUser

const isNewMessage = ref(1)

const position = ref({ top: 70, left: 200 })
const width = ref(800)
const height = ref(650)
const offsetX = ref(0)
const offsetY = ref(0)
const clickStartTime = ref(0)
const dragThreshold = 500
const clipRight = ref(0)

const draggableContainer = ref(null)

const mouseDownHandler = (event) => {
  if (event.target.closest('.dragarea') === draggableContainer.value) {
    clickStartTime.value = new Date().getTime()
    document.addEventListener('mouseup', mouseUpHandler)
  }
}

const mouseUpHandler = (event) => {
  document.removeEventListener('mouseup', mouseUpHandler)
  const clickEndTime = new Date().getTime()
  const clickDuration = clickEndTime - clickStartTime.value
  if (clickDuration >= dragThreshold) {
    document.body.style.cursor = 'move'
    offsetX.value = event.clientX - draggableContainer.value.offsetLeft
    offsetY.value = event.clientY - draggableContainer.value.offsetTop
    document.addEventListener('mousemove', drag)
    document.addEventListener('mouseup', stopDrag)
  }
}

const drag = (event) => {
  let newTop = event.clientY - offsetY.value
  let newLeft = event.clientX - offsetX.value

  const windowWidth = window.innerWidth
  const windowHeight = window.innerHeight

  if (newTop < -500) newTop = -500
  if (newLeft < -700) newLeft = -700
  if (newTop + height.value > windowHeight + 500) newTop = windowHeight - height.value + 500
  if (newLeft + width.value > windowWidth + 700) {
    newLeft = windowWidth - width.value + 700
    clipRight.value = newLeft - windowWidth
  }
  position.value.top = newTop
  position.value.left = newLeft
}

const stopDrag = () => {
  document.removeEventListener('mousemove', drag)
  document.removeEventListener('mouseup', stopDrag)
  document.body.style.cursor = 'default'
}

const userInfo = ref({
  id: currentUser.user_id,
  nickname: currentUser.username,
  avatar: currentUser.icon
})

const contacts = ref([]) //联系人信息{id, avatar, nickname, lastmessage}

const messages = ref([])

const testMessages = {
  id: 'id7',
  content: '测试消息',
  type: 'text',
  toContactId: 5,
  status: 'success',
  sendTime: Date.now(),
  fileName: undefined,
  fromUser: {
    id: 1,
    nickname: 'Forgiving soldier',
    avatar: 'http://rz1wa9fyb.hb-bkt.clouddn.com/liang.jpeg'
  }
}

const hasRead = ref([])

const pullMessage = async ({ next, contactId }) => {
  if(contactId){
    if (!hasRead.value[contactId]) {
      await fetchOneMessageHistory(contactId)
      asyncFn(() => {
        next(messages.value, true)
      })
      hasRead.value[contactId] = true
    }
  }
}

const asyncFn = (fn) => {
  setTimeout(() => {
    fn()
  }, 1000)
}

//发送消息
const sendMessage = async ({ message, next }) => {
  console.log({
    front_id: message.id,
    sender: userInfo.value.id,
    toContactId: message.toContactId,
    content: message.content,
    type: message.type,
    status: message.status,
    fileName: undefined
  })
  const response = await axios.post('/api/message/create', {
    front_id: message.id,
    sender: message.fromUser.id,
    toContactId: message.toContactId,
    content: message.content,
    type: message.type,
    status: message.status,
    fileName: undefined
  })
   asyncFn(() => {
  next({
    id: message.id,
    toContactId: message.toContactId,
    status: 'success'
  })
   })
}

//获取最新消息
const fetchLatestMessage = async () => {
  try {
    const response = await axios.get('/api/message/latest-message', {
      headers: {
        Authorization: token
      }
    })
    contacts.value.push(response.data.latest_messages)
    naiveChatRef.value?.appendMessage(response.data.latest_messages)
  } catch (err) {
    err.value = err.message
  }
}

//获取与某人的聊天记录
const fetchOneMessageHistory = async (toContactId) => {
  try {
    const response = await axios.get(`/api/message/with/${toContactId}`)
    messages.value = []
    messages.value = messages.value.concat(response.data)
  } catch (err) {
    console.log(err)
  }
}

//获取最新消息
const fetchNewMessage = async (toContactId) => {
  try {
    if (toContactId !== undefined) {
      const number = String(toContactId)
      console.log(userInfo.value.id)
      const response = await axios.get('/api/message/latest/1')
      console.log(response)
      if (isNewMessage.value !== response.data.id && userInfo.value.id !== response.data.sender) {
        isNewMessage.value = response.data.id
        naiveChatRef.value?.appendMessage(response.data)
      }
    } else {
      console.log('toContactId is undefined')
    }
  } catch (err) {
    console.log(err)
  }
}

const fetchNewMessageTrigger = async () => {
  if (naiveChatRef.value?.getCurrentContact()?.id !== undefined) {
    await fetchNewMessage(naiveChatRef.value?.getCurrentContact()?.id)
  }
}

const openContact = async () => {
  let flag = false
  console.log(contacts.value)
  for (const item of contacts.value) {
    console.log(item.id, Number(messageStore.toContactId))
    if (Number(item.id) === Number(messageStore.toContactId)) {
      flag = true
      break
    }
  }
  if (flag) {
    console.log('cant do this')
  } else {
    console.log(flag)
    const response = await axios.get('/api/user/info', {
      params: {
        user_id: messageStore.toContactId
      }
    })
    const newContact = {
      id: response.data.user_id,
      nickname: response.data.username,
      avatar: response.data.icon,
      lastMessage: '打个招呼吧',
      lastTime: Date.now()
    }
    contacts.value.unshift(newContact)
    naiveChatRef.value?.initContacts(contacts.value)
    //naiveChatRef.value?.appendMessage(testMessages)
  }
}

const handleAppendMessage = () => {
  const msg = {
    id: 500,
    content: '最近忙什么呢?',
    type: 'text',
    toContactId: 5,
    fromUser: {
      id: 1,
      nickname: 'Forgiving soldier',
      avatar: 'http://rz1wa9fyb.hb-bkt.clouddn.com/liang.jpeg'
    },
    sendTime: Date.now(),
    status: 'success',
    fileName: undefined
  }
  naiveChatRef.value?.appendMessage(msg)
}
let interval
onMounted(async () => {
  document.addEventListener('mouseup', stopDrag)
  await fetchLatestMessage()
  console.log(userInfo.value)
  naiveChatRef.value?.initContacts(contacts.value)
  openContact()
  interval = setInterval(fetchNewMessageTrigger, 2000)  
})

onUnmounted(() => {
    clearInterval(interval)
})

onBeforeUnmount(() => {
  document.removeEventListener('mouseup', stopDrag)
})

// watch(
//   () => messageStore.sendMessageTriggered,
//   async () => {
//     const flag = ref(false)
//     console.log('problem')
//     for (const item of contacts.value) {
//       console.log(item.id)
//       console.log(messageStore.toContactId)
//       console.log(typeof item.id, item.id) // 输出类型和值
//       console.log(typeof messageStore.toContactId, messageStore.toContactId)
//       if (Number(item.id) === Number(messageStore.toContactId)) {
//         flag.value = true
//         console.log('equal')
//         break
//       }
//     }
//     if (flag.value === false) {
//       console.log(flag.value)
//       const response = await axios.get('/api/user/info', {
//         params: {
//           user_id: messageStore.toContactId
//         }
//       })
//       const newContact = {
//         id: response.data.user_id,
//         nickname: response.data.username,
//         avatar: response.data.icon,
//         lastMessage: '打个招呼吧',
//         lastTime: Date.now()
//       }
//       console.log(response.data.username)
//       contacts.value.unshift(newContact)
//       console.log(contacts.value)
//       naiveChatRef.value?.initContacts(contacts.value)
//     }
//   }
// )
</script>

<style scoped>
.dragarea {
  position: absolute;
  overflow: hidden;
}
</style>
