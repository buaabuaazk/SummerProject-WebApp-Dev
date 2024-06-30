<!--
 * @Date: 2024-06-23 13:28:31
 * @Author: Q9K
 * @Description: 页面右下角的消息box
-->

<template>
  <div
    class="draggable"
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
        <button style="background-color: rgb(6, 1, 1); margin-left: 5rem;">我的朋友</button>
    </template>
    <template #sidebar-header>
        <button style="background-color: rgb(14, 12, 12); margin-top: 0rem;">友好交流~</button>
    </template>
  </NaiveChat>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import axios from '@/utils/request'
import { NaiveChat } from 'naive-chat'
import { onBeforeUnmount } from 'vue';
import useTokenStore from '@/stores/useTokenStore';

const tokenStore = useTokenStore()
const token = tokenStore.getToken
const naiveChatRef = ref()

// const changeFreeSiderBarStyle = () => {
//     if(freeIM.value) {
//         const sidebarElement = freeIM.value.$el.querySelector('.free-sidebar');
//         if(sidebarElement) {
//             sidebarElement.style.backgroundColor = 'lightblue';
//             sidebarElement.style.width = '10rem';
//         }
//         const messageElement = freeIM.value.$el.querySelector('.free-sider-message');
//         if(messageElement) {
//             // messageElement.style.backgroundColor = 'blue';
//             // messageElement.style.width = '10rem';
//         }
//     }
// }

// const position=ref({ top: 0, left: 0 })
// const offsetX=ref(0)
// const offsetY=ref(0)
// const width=ref(900)
// const height=ref(720)
// const clickStartTime = ref(0)
// const dragThreshold = 1
// const draggableContainer = ref(null)
// const startDrag = (event) => {
//   offsetX.value = event.clientX - event.target.offsetLeft;
//   offsetY.value = event.clientY - event.target.offsetTop;
//   document.addEventListener('mousemove', drag);
//   document.addEventListener('mouseup', stopDrag);
// }

const position = ref({ top: 0, left: 0 });
const width = ref(800);
const height = ref(650);
const offsetX = ref(0);
const offsetY = ref(0);
const clickStartTime = ref(0);
const dragThreshold = 500;
const clipRight = ref(0)

const draggableContainer = ref(null);

const mouseDownHandler = (event) => {
  if (event.target.closest('.draggable') === draggableContainer.value) {
    clickStartTime.value = new Date().getTime();
    document.addEventListener('mouseup', mouseUpHandler);
  }
};

const mouseUpHandler = (event) => {
  document.removeEventListener('mouseup', mouseUpHandler);
  const clickEndTime = new Date().getTime();
  const clickDuration = clickEndTime - clickStartTime.value;
  if (clickDuration >= dragThreshold) {
    offsetX.value = event.clientX - draggableContainer.value.offsetLeft;
    offsetY.value = event.clientY - draggableContainer.value.offsetTop;
    document.addEventListener('mousemove', drag);
    document.addEventListener('mouseup', stopDrag);
  } else {
    console.log('Normal click action');
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
}

const userInfo = {
  id: '100',
  nickname: 'King',
  avatar: 'https://thirdwx.qlogo.cn/mmopen/vi_32/RMksZlPP4myx9pbGzt3PmV2FNIpia8hVHpUXbHM0RfbJtsSMEWCLicbvGuJRMpoAam3sZclNo0YtOnvJ0a8eMtyQ/132',
}

const tempContact = ref({
  id: '',
  nickname: '',
  avatar: '',
  lastMessage: '',
  lastTime: '',
  index: '',
  unread: '',
})

const contacts = ref([
{
    id: 1,
    nickname: 'xiao',
    avatar: '',
    lastMessage: '',
    lastTime: Date.now(),
    index: 'A',
  }
])

const tempMessage = ref({
  id: '',
  content: '',
  type: '',
  toContactId: '',
  status: '',
  sendTime: '',
  fromUser: {
    id: '',
    avatar: '',
  },
})
const messageHistory = ref([])

const newMessage = ref('')

const messages = ref([])

const unreadCount = ref(0)

const pullMessage = ({ next, contactId }) => {
  if (contactId === 15) {
    asyncFn(() => {
      next(messages, true)
    })
  }
  else {
    asyncFn(() => {
      next([], true)
    })
  }
}

const asyncFn = (fn) => {
  setTimeout(() => {
    fn()
  }, 1000)
}

const sendMessage = (obj) => {
  const {message, next} = obj
  console.log(message)
  // socket.send(JSON.stringify(message))
  const response = axios.post('http://100.111.110.112:8000/api/message/create', {
    params: {
      sender: '1',
      receiver: '',
      content: '',
      type: '',
      timestamp: '',
      status: '',
      fileName: '',
      fileSize: '',
    },
    headers: {
      'Authorization': token
    }
  })

  if(response.data === 'ok') {
    asyncFn(() => {
      next({
        id: message.id,
        toContactId: message.toContactId,
        status: 'success',
      })
    })
  } else {
    console.log('Don\'t send the message successfully')
  }
}

const changeContact = () => {}

//获取最新消息
const fetchLatestMessage = async () => {
  try {
    const response = await axios.get('http://100.111.110.112:8000/api/message/latest-message', {
      headers: {
        'Authorization': token
      }
    })
    for(let item of response.data.latest_messages) {
      tempContact.value = {
        id: item.contact_id,
        nickname: item.contact,
        avatar: item.contact_icon,
        lastMessage: item.message.content,
        lastTime: item.message.timestamp,
        index: 'X', //名字首字母
        unread: 3
      };
      contacts.value.push(tempContact.value)
    }
  } catch (err) {
    err.value = err.message
  }
}

// const fetchUnreadMessage = async () => {
//   try {
//     const response = await axios.get('http://100.111.110.112:8000/api/message/contact-unread-count', {
//       headers: {
//         'Authorization': token
//       }
//     })
//   } catch (err){
//     err.value = err.message
//   }
// }

//获取与某人的聊天记录
const fetchOneMessageHistory = async (toContactId) => {
  try {
    const response = await axios.get(`http://100.111.110.112:8000/api/message/with/${toContactId}`, {
      headers: {
        'Authorization': token
      }
    })
    console.log(response.data)
    for (const item of response.data) {
      tempMessage.value = {
        id: item.id,
        content: item.content,
        type: item.type,
        toContactId: item.receiver,
        status: item.status,
        sendTime: item.timestamp,
        fromUser: {
          id: item.sender,
          avatar: 'https://2024summer-se-1316618142.cos.ap-beijing.myqcloud.com/icon/enterprise/default.png',
        },
      }
      messages.values.push(tempMessage.value)
    }
  } catch (err){
    console.log(err)
  }
}

const fetchTotalUnreadMessageNumber = async () => {
  try {
    const response = await axios.get('http://100.111.110.112:8000/api/message/unread-count', {
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
    const response = await axios.get('http://100.111.110.112:8000/api/message/list', {
      headers: {
        'Authorization': token
      }
    })
  }catch (err){
    console.log(err)
  }
}

//获取当前聊天窗口联系人信息
const getCurrentContactInfo = () => {
  return naiveChatRef.value?.getCurrentContact()
}

onMounted(() => {
  // socket.onopen = openSocket
  // socket.onmessage = getSocketMessage
  // socket.onclose = closeSocket
  // socket.onerror = getSocketError;

  //contacts.value = getContacts()
  document.addEventListener('mouseup', stopDrag)
  naiveChatRef.value?.initContacts(contacts.value)
  //fetchLatestMessage()
  // fetchUnreadMessage()
  fetchOneMessageHistory(2)
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
</script>

<style scoped>
.draggable {
  position: absolute;
  cursor: move;
  overflow: hidden;
}
</style>
