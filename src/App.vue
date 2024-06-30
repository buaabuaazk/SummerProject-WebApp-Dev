<template>
  <n-config-provider preflight-style-disabled>
    <n-notification-provider :max="3" placement="bottom-right">
      <div class="min-h-screen">
        <Header class="sticky top-0 z-50"></Header>
        <router-view v-slot="{ Component }">
          <transition name="slide" mode="out-in">
            <component :is="Component" />
          </transition>
        </router-view>
        <!-- <Footer></Footer> -->
        <!-- <Toast /> -->
        <div style="z-index: 100; width: 100%; height: 100%; overflow: hidden">
          <div v-show="messageStore.contactNow">
            <MessageBar />
          </div>
        </div>
        <button
          @click="messageStore.changeChatState"
          style="position: absolute; margin-top: 90vh; margin-left: 90vw; background-color: blue"
        >
          CHAT
        </button>
      </div>
    </n-notification-provider>
  </n-config-provider>
</template>

<script setup>
import Header from '@/components/Header.vue'
// import Footer from '@/components/Footer.vue'
// import { Toaster } from '@/components/ui/toast'
import MessageBar from '@/components/MessageBar.vue'
import { useMessageStore } from '@/stores/useMessageStore'
const messageStore = useMessageStore()
</script>

<style scoped>
.slide-enter-active,
.slide-leave-active {
  transition: all 0.75s ease-out;
}

.slide-enter-to {
  position: absolute;
  right: 0;
}

.slide-enter-from {
  position: absolute;
  right: -100%;
}

.slide-leave-to {
  position: absolute;
  left: -100%;
}

.slide-leave-from {
  position: absolute;
  left: 0;
}
</style>
