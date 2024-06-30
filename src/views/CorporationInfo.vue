<template>
  <div>
    <CoSideBar />
    <div class="mr-16">
      <router-view v-slot="{ Component, route }">
        <transition name="fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </div>
  </div>
</template>

<script setup>
import CoSideBar from '@/components/Corporation/CoSideBar.vue'
</script>

<style scoped>
/* 过渡进入的起点 */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}

/* 过渡进入时的起点 */
.fade-enter, .fade-leave-to /* .fade-leave-active in <2.1.8 */ {
  opacity: 0;
}
</style>
