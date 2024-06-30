import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useMessageStore = defineStore('message', () => {
  // 是否打开聊天框
  const contactNow = ref(true);

  // 联系人Id
  const toContactId = ref();

  // 打开或关闭聊天框
  function changeChatState() {
    contactNow.value = !contactNow.value;
    console.log(contactNow.value)
  }

  // 设置联系人Id
  function setContactId(id) {
    toContactId.value = id;
  }

  return { contactNow, toContactId, changeChatState, setContactId };
});
