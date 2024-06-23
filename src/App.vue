<template>
  <div>
    <Header></Header>
    <RouterView></RouterView>
  </div>
</template>

<script>
import Header from '@/components/Header.vue'
export default {
  components: {
    Header
  },
  mounted() {
    console.log('🚀 ~ file: App.vue:18 ~ mounted ~ stores:', this.$stores)
  }
}
</script>
