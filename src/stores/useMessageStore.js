/*
 * @Author: aliyun0459792885-nakAm 1308199540@qq.com
 * @Date: 2024-06-30 17:08:03
 * @LastEditors: aliyun0459792885-nakAm 1308199540@qq.com
 * @LastEditTime: 2024-06-30 21:42:09
 * @FilePath: /frontend2/src/stores/useMessageStore.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
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
