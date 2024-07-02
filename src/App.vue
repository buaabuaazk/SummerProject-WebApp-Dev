<template>
  <!-- <Header class="sticky top-0 z-50"></Header> -->
  <n-config-provider preflight-style-disabled>
    <n-notification-provider :max="3" placement="bottom-right">
      <div class="min-h-screen flex flex-col">
        <Header class="sticky top-0 z-50"></Header>
        <!-- <Header class="sticky top-0 z-50"></Header> -->
        <div class="flex-1">
          <router-view v-slot="{ Component }">
            <transition name="slide" mode="out-in">
              <component :is="Component" />
            </transition>
          </router-view>
        </div>
        <!-- <Footer></Footer> -->
        <!-- <Toast /> -->
        <div style="z-index: 100; width: 100%; height: 100%; overflow: hidden">
          <div v-if="messageStore.contactNow">
            <MessageBar />
          </div>
        </div>
        <div class="h-screen fixed left-4 flex flex-col-reverse">
          <button @click="messageStore.openMessageBox" class="mb-2">
            <div class="sidebar-icon group h-14 w-14 hover:rounded-xl hover:bg-green-500">
              <ChatBubbleLeftRightIcon class="h-10 w-10 text-green-700" />

              <span class="sidebar-tooltip group-hover:scale-100 origin-left left-14">Chat</span>
            </div>
          </button>
        </div>
      </div>
    </n-notification-provider>
  </n-config-provider>
</template>

<script setup>
import Header from '@/components/Header.vue'
import Header2 from '@/components/Header2.vue'
// import Footer from '@/components/Footer.vue'
// import { Toaster } from '@/components/ui/toast'
import MessageBar from '@/components/MessageBar.vue'
import { useMessageStore } from '@/stores/useMessageStore'
import { ChatBubbleLeftRightIcon } from '@heroicons/vue/24/outline'

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
