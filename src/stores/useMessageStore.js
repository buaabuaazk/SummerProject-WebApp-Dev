import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useMessageStore = defineStore('message', () => {
  // 是否打开聊天框
  const contactNow = ref(false);

  // 联系人Id
  const toContactId = ref();

  // 打开聊天框
  function openMessageBox() {
    contactNow.value = true;
    console.log(contactNow.value)
  }

  //关闭聊天框
  function closeMessageBox() {
    contactNow.value = false
  }

  // 向用户id聊天
  function sendMessage(id) {
    toContactId.value = id
    contactNow.value = true
  }

  return { contactNow, toContactId, openMessageBox, closeMessageBox, sendMessage };
});
