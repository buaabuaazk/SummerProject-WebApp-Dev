<template>
  <div>
    <CoSideBar :enterprise_id="route.params.id" />
    <div class="mr-16">
      <router-view v-slot="{ Component }">
        <transition name="fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </div>
  </div>
</template>

<script setup>
import CoSideBar from '@/components/Corporation/CoSideBar.vue'
import { onMounted } from 'vue'

import { useRoute } from 'vue-router'

const route = useRoute()

onMounted(() => {
  console.log('route', route.params.id)
})
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
