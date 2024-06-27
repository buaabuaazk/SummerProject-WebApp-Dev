<template>
  <div class="flex flex-col min-h-screen">
    <Header class="sticky top-0 z-50"></Header>
    <RouterView class="flex-1 flex flex-col justify-center"></RouterView>
    <!-- <Footer></Footer> -->
    <Toaster>
      <AlertTitle>Heads up!</AlertTitle>
      <AlertDescription> You can add components to your app using the cli. </AlertDescription>
    </Toaster>
  </div>
</template>

<script setup>
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'
import { Toaster } from '@/components/ui/toast'
</script>
