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
      height: `${height}px`,
    }"
    @mousedown="mouseDownHandler"
    ref="draggableContainer"
  >
  <NaiveChat
    ref="naiveChatRef"
    style="background-color:antiquewhite"
    :user-info="userInfo"
    @change-contact="changeContact"
    @pull-message="pullMessage"
    @send="sendMessage"
  >
    <template #message-tools-right>
        <button>Settings</button>
    </template>
    <template #default-page>
        <p style="background-color: rgb(0, 255, 81);">备忘录: WorkNow团队加班开发中~敬请期待~</p>
    </template>
    <template #sidebar-contact-header>
        <button style="margin-left: 5rem;">我的朋友</button>
    </template>

    <template #sidebar-header>
      <a-button @click="messageStore.closeMessageBox"> 稍后再聊~</a-button>
    </template>

    <template #message-tools>      
    </template>
  </NaiveChat>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, watch } from 'vue'
import axios from '@/utils/request'
import { NaiveChat } from 'naive-chat'
import { onBeforeUnmount } from 'vue';
import useTokenStore from '@/stores/useTokenStore';
import { useMessageStore } from '@/stores/useMessageStore';
import useCurrentUserStore  from '@/stores/useCurrentUserStore'
import { message } from 'ant-design-vue';

const tokenStore = useTokenStore()
const token = tokenStore.getToken
const messageStore = useMessageStore()
const currentUserStore = useCurrentUserStore()
const currentUser = currentUserStore.getCurrentUser

const naiveChatRef = ref()

const selectedFile = ref(null);
const sendMessageTriggered = ref(false)

const position = ref({ top: 70, left: 200 });
const width = ref(800);
const height = ref(650);
const offsetX = ref(0);
const offsetY = ref(0);
const clickStartTime = ref(0);
const dragThreshold = 500;
const clipRight = ref(0)

const draggableContainer = ref(null);

const mouseDownHandler = (event) => {
  if (event.target.closest('.dragarea') === draggableContainer.value) {
    clickStartTime.value = new Date().getTime();
    document.addEventListener('mouseup', mouseUpHandler);
  }
};

const mouseUpHandler = (event) => {
  document.removeEventListener('mouseup', mouseUpHandler);
  const clickEndTime = new Date().getTime();
  const clickDuration = clickEndTime - clickStartTime.value;
  if (clickDuration >= dragThreshold) {
    document.body.style.cursor = 'move';
    offsetX.value = event.clientX - draggableContainer.value.offsetLeft;
    offsetY.value = event.clientY - draggableContainer.value.offsetTop;
    document.addEventListener('mousemove', drag);
    document.addEventListener('mouseup', stopDrag);
  }
};

const drag = (event) => {
  let newTop = event.clientY - offsetY.value;
  let newLeft = event.clientX - offsetX.value;

  const windowWidth = window.innerWidth;
  const windowHeight = window.innerHeight;

  if (newTop < -500) newTop = -500;
  if (newLeft < -700) newLeft = -700;
  if (newTop + height.value > windowHeight+500) newTop = windowHeight - height.value+500;
  if (newLeft + width.value > windowWidth+700) {
    newLeft = windowWidth - width.value+700;
    clipRight.value = newLeft- windowWidth;
  }
  position.value.top = newTop;
  position.value.left = newLeft;

}

const stopDrag = () => {
  document.removeEventListener('mousemove', drag);
  document.removeEventListener('mouseup', stopDrag);
  document.body.style.cursor = 'default';
}

console.log(currentUser)
const userInfo = {
  id: currentUser.user_id,
  nickname: currentUser.username,
  avatar: currentUser.icon,
}
console.log(userInfo)
const contacts = ref([]) //联系人信息{id, avatar, nickname, lastmessage}

const messages = ref([])
// const testMessage = ref(
//   {
//     content: 'testfile',
//     type: 'file',
//     toContactId: 2,
//     status: 'success',
//     sendTime: 1691056800000,
//     fileName: '艳萍简历.doc',
//     fileSize: 18238,
//     fromUser: {
//       id: 1,
//       avatar: '',
//     },
//   }
// )

const unreadCount = ref(0)
const hasRead = ref([])

const pullMessage = ({ next, contactId }) => {
  if (!hasRead.value[contactId]) {
    fetchOneMessageHistory(contactId)
    asyncFn(() => {
        next(messages.value, true)
    })
    hasRead.value[contactId] = true
  }
}

const asyncFn = (fn) => {
  setTimeout(() => {
    fn()
  }, 1000)
}

const sendMessage = async (obj) => {
  const {message, next} = obj
  console.log(message)
  if(message.type === 'file') {
    // const uploadResponse = await axios.post('http://100.92.185.35:8000/api/message/upload_chat_file/', formData,
    //   {
    //     headers: {
    //       'Authorization': token
    //     }
    //   }
    // )
    // const response = await axios.post('http://100.92.185.35:8000/api/message/create', 
    //     {
    //       id: message.id,
    //       sender: message.fromUser.id,
    //       toContactId: message.toContactId,
    //       content: 'test',
    //       type: message.type,
    //       status: 'going',
    //       fileName: '123',
    //       fileSize: '123',
    //       read: false
    //     },
    //     {
    //       headers: {
    //         'Authorization': token
    //       }
    //     }
    //   )
  } else {
      const response = await axios.post('/api/message/create', 
        {
          id: message.id,
          sender: message.fromUser.id,
          toContactId: message.toContactId,
          content: 'test',
          type: message.type,
          status: 'going',
          fileName: '123',
          fileSize: '123',
          read: false
        },
        {
          headers: {
            'Authorization': token
          }
        }
      )
      console.log(response.data)
      if(response.status === 201) {
        console.log('success')
        asyncFn(() => {
          next({
            id: message.id,
            toContactId: message.toContactId,
            status: 'success',
          })
        })
    }
  }
}

const changeContact = (contactId) => {
  //console.log(contactId)
}

//获取最新消息
const fetchLatestMessage = async () => {
  try {
    const response = await axios.get('/api/message/latest-message', {
      headers: {
        'Authorization': token
      }
    })
    contacts.value.push(...response.data.latest_messages)
  } catch (err) {
    err.value = err.message
  }
}

const fetchUnreadMessage = async () => {
  try {
    const response = await axios.get('/api/message/contact-unread-count', {
      headers: {
        'Authorization': token
      }
    })
  } catch (err){
    err.value = err.message
  }
}

//获取与某人的聊天记录
const fetchOneMessageHistory = async (toContactId) => {
  try {
    const response = await axios.get(`/api/message/with/${toContactId}`, {
      headers: {
        'Authorization': token
      }
    })
    // messages.value = []
    // console.log(...response.data)
    message.value = message.value.concat(response.data)
  } catch (err){
    console.log(err)
  }
}

const fetchTotalUnreadMessageNumber = async () => {
  try {
    const response = await axios.get('/api/message/unread-count', {
      headers: {
        'Authorization': token
      }
    })
    if (response.data.unread_count > unreadCount.value ) {
      unreadCount.value = response.data.unread_count
      fetchLatestMessage()
    }
  } catch (err){
    console.log(err)
  }
}

const fetchAllMessage = async () => {
  try {
    const response = await axios.get('/api/message/list', {
      headers: {
        'Authorization': token
      }
    })
  }catch (err){
    console.log(err)
  }
}

onMounted(() => {
  // socket.onopen = openSocket
  // socket.onmessage = getSocketMessage
  // socket.onclose = closeSocket
  // socket.onerror = getSocketError;

  //contacts.value = getContacts()
  document.addEventListener('mouseup', stopDrag)
  sendMessageTriggered.value = messageStore.sendMessageTriggered
  fetchLatestMessage()
  naiveChatRef.value?.initContacts(contacts.value)
  //sendMessage()
  // fetchUnreadMessage()
  //fetchOneMessageHistory(2)
  // fetchTotalUnreadMessageNumber()
  // fetchAllMessage()
  //const interval = setInterval(fetchTotalUnreadMessageNumber, 5000);

  // 清除定时器以避免内存泄漏
  // onUnmounted(() => {
  //   clearInterval(interval);
  // });
})

onBeforeUnmount(() => {
  document.removeEventListener('mouseup', stopDrag);
})

watch(() => messageStore.sendMessageTriggered, async (newMessage) => {
    const flag = ref(false)
    for(const item of contacts.value) {
      console.log(item.id)
      console.log(messageStore.toContactId)
      console.log(typeof item.id, item.id) // 输出类型和值
      console.log(typeof messageStore.toContactId, messageStore.toContactId)
      if(Number(item.id) === Number(messageStore.toContactId)) {
        flag.value = true
        console.log('equal')
        break
      }
    }
    if (flag.value === false) {
      console.log(flag.value)
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
      console.log(response.data.username)
      contacts.value.unshift(newContact)
      console.log(contacts.value)
      naiveChatRef.value?.initContacts(contacts.value)
    }
});
</script>

<style scoped>
.dragarea {
  position: absolute;
  overflow: hidden;
}

</style>
