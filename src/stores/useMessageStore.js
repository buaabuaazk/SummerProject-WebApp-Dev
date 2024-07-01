/*
 * @Author: aliyun0459792885-nakAm 1308199540@qq.com
 * @Date: 2024-06-30 17:08:03
 * @LastEditors: aliyun0459792885-nakAm 1308199540@qq.com
 * @LastEditTime: 2024-07-01 14:44:56
 * @FilePath: /frontend2/src/stores/useMessageStore.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
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
  }

  //关闭聊天框
  function closeMessageBox() {
    contactNow.value = false
  }


  //
  const sendMessageTriggered = ref(false);

  // 向用户id聊天
  function sendMessage(id) {
    toContactId.value = id
    contactNow.value = true
    sendMessageTriggered.value = !sendMessageTriggered.value
    console.log('sendMessageTriggered.value:'+sendMessageTriggered.value)
  }

  return { contactNow, toContactId, openMessageBox, closeMessageBox, sendMessageTriggered, sendMessage };
});
