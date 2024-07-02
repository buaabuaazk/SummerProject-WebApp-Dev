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
import { ref, onMounted, onUnmounted } from 'vue'
import axios from '@/utils/request'
import { NaiveChat } from 'naive-chat'
import { onBeforeUnmount, nextTick, watch } from 'vue'
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

const hasRead = ref([])
let mynext = null
const pullMessage = async ({ next, contactId }) => {
  // if (!hasRead.value[contactId]) {
  try {
    const response = await axios.get(`/api/message/with/${contactId}`)
    messages.value = []
    messages.value = messages.value.concat(response.data)
    console.log('next1', next)
    if (!mynext) {
      next(messages.value, true)
    } else {
      mynext(messages.value, true)
    }
  } catch (err) {
    console.log(err)
  }
  mynext = next
  // asyncFn(() => {

  // })
  // hasRead.value[contactId] = true
  // }
}

//发送消息
let mynext2 = null
const sendMessage = async ({ message, next }) => {
  const response = await axios.post('/api/message/create', {
    front_id: message.id,
    sender: currentUser.user_id,
    toContactId: message.toContactId,
    content: message.content,
    type: message.type,
    status: message.status,
    fileName: undefined
  })
  console.log('next2', next)
  if (!mynext2) {
    // asyncFn(() => {
    next({
      id: message.id,
      toContactId: message.toContactId,
      status: 'success'
    })
    mynext2 = next
  } else {
    mynext2({
      id: message.id,
      toContactId: message.toContactId,
      status: 'success'
    })
  }
  // })
}

//获取联系人
const fetchContacts = async () => {
  try {
    const response = await axios.get('/api/message/latest-message')
    contacts.value = []
    await nextTick()
    console.log('181', contacts.value)
    const temp = []
    for (let i = 0; i < response.data.latest_messages.length; ++i) {
      if (Number(response.data.latest_messages[i].id) !== Number(currentUser.user_id)) {
        // console.log('184', response.data.latest_messages[i].id, currentUser.user_id)
        temp.push(response.data.latest_messages[i])
      }
    }
    contacts.value = temp
    // contacts.value.push(...response.data.latest_messages)
    naiveChatRef.value?.initContacts(contacts.value)
    // await pullMessage({ mynext, contactId: contacts.value[0].id })
    // await sendMessage({
    //   message: {
    //     id: Math.random().toString(36).slice(-6),
    //     sender: currentUser.user_id,
    //     toContactId: currentUser.user_id,
    //     content: '123',
    //     type: 'text',
    //     status: 'success',
    //     fileName: undefined
    //   },
    //   next: mynext2
    // })
    // mynext([response.data.latest_message], true)
  } catch (err) {
    err.value = err.message
  }
}

//获取最新消息
const fetchNewMessage = async () => {
  try {
    const response = await axios.get('/api/message/latest/' + `${userInfo.value.id}`)
    if (isNewMessage.value !== response.data.id) {
      if (Number(response.data.fromUser.id) !== Number(currentUser.user_id)) {
        //是否是新联系人
        let flag = false
        for (const item of contacts.value) {
          console.log('233', contacts.value, item.sender, messageStore.toContactId)
          if (Number(item.id) === Number(messageStore.toContactId)) {
            flag = true
            break
          }
        }
        if (flag) {
          console.log('已经是联系人')
          isNewMessage.value = response.data.id
          console.log(response.data)
          const message = {
            id: response.data.front_id,
            content: response.data.content,
            type: response.data.type,
            toContactId: response.data.toContactId,
            fromUser: response.data.fromUser,
            sendTime: response.data.sendTime,
            status: 'success'
          }
          naiveChatRef.value?.appendMessage(message)
          console.log('111', mynext)
          // mynext2(message, true)
          naiveChatRef.value?.initContacts(contacts.value)
          await pullMessage({ mynext, contactId: response.data.fromUser.id })
          await fetchContacts()
        } else {
          //新联系人
          const response2 = await axios.get('/api/user/info', {
            params: {
              user_id: response.data.fromUser.id
            }
          })
          console.log('263', 'test')
          if (Number(response2.data.user_id) !== Number(currentUser.user_id)) {
            const newContact = {
              id: response2.data.user_id,
              nickname: response2.data.username,
              avatar: response2.data.icon,
              lastMessage: '',
              lastTime: Date.now()
            }
            contacts.value.unshift(newContact)
            naiveChatRef.value?.initContacts(contacts.value)

            isNewMessage.value = response.data.id
            const message = {
              id: response.data.front_id,
              content: response.data.content,
              type: response.data.type,
              toContactId: response.data.toContactId,
              fromUser: response.data.fromUser,
              sendTime: response.data.sendTime,
              status: 'success'
            }
            await fetchContacts()
            // naiveChatRef.value?.appendMessage(message)
            // await pullMessage({ mynext, contactId: response.data.fromUser.id })
          }
        }
      }
    }
  } catch (err) {
    console.log(err)
  }
}

const openContact = async () => {
  let flag = false
  console.log(contacts.value)
  const length = contacts.value.length
  for (let i = 0; i < length; ++i) {
    console.log(i, length)
    if (Number(contacts.value[i].id) === Number(messageStore.toContactId)) {
      flag = true
      // break
    }
    if (flag) {
      console.log('已经是联系人')
      const contactId = messageStore.toContactId
      pullMessage({ mynext, contactId })
    } else {
      const response = await axios.get('/api/user/info', {
        params: {
          user_id: messageStore.toContactId
        }
      })
      console.log(287, response.data)
      const newContact = {
        id: response.data.user_id,
        nickname: response.data.username,
        avatar: response.data.icon,
        lastMessage: '打个招呼吧',
        lastTime: Date.now()
      }
      contacts.value.unshift(newContact)
      // naiveChatRef.value?.initContacts(contacts.value)
    }
  }
}

let interval
onMounted(async () => {
  document.addEventListener('mouseup', stopDrag)
  contacts.value = []
  await fetchContacts()
  interval = setInterval(() => {
    fetchNewMessage()
    // naiveChatRef.value?.initContacts(contacts.value)
  }, 2000)
  // naiveChatRef.value?.initContacts(contacts.value)
  // await openContact()
})

onUnmounted(() => {
  clearInterval(interval)
})

onBeforeUnmount(() => {
  document.removeEventListener('mouseup', stopDrag)
})
watch(contacts, (oldval, newval) => {
  console.log('contacts', oldval, newval)
})
</script>

<style scoped>
.dragarea {
  position: absolute;
  overflow: hidden;
}
</style>
