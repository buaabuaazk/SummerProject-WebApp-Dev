<template>
  <div class="flex flex-col min-h-screen" >
    <Header class="sticky top-0 z-50"></Header>
    <!-- 聊天消息 -->
    <RouterView></RouterView>
    <!-- <Footer></Footer> -->
    <Toaster> </Toaster>
    <div style="z-index: 100; width: 100%; height: 100%; overflow: hidden; ">
      <div v-show="messageStore.contactNow" >
        <MessageBar />
      </div>
    </div>
    <button @click="messageStore.changeChatState" style="position: absolute; margin-top: 90vh; margin-left: 90vw; background-color: blue;"> CHAT </button>
  </div>
</template>

<script setup>
import Header from '@/components/Header.vue'
// import Footer from '@/components/Footer.vue'
import { Toaster } from '@/components/ui/toast'
import MessageBar from '@/components/MessageBar.vue'
import { useMessageStore } from '@/stores/useMessageStore'
const messageStore = useMessageStore()

</script>