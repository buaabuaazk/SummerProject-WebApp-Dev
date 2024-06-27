<template>
  <button :class="`inline-flex items-center ${props.containerStyles}`">
    {{ props.title }}
    <div class="ml-2">
      <PencilSquareIcon class="h-6 w-6 text-gray-500" />
    </div>
  </button>
</template>

<script setup>
import { defineProps } from 'vue'
import { PencilSquareIcon } from '@heroicons/vue/24/outline'

const props = defineProps({
  title: String,
  containerStyles: String
})
</script>
