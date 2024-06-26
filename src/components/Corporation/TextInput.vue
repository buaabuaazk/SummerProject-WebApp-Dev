<template>
  <div className="flex flex-col mt-2">
    <p className="text-gray-600 text-sm mb-1 ">{{ props.label }}</p>

    <input
      :type="props.type"
      :name="props.name"
      :placeholder="props.placeholder"
      :class="`rounded border border-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-base px-4 py-2 ${props.styles}`"
    />
    <span className="text-xs text-red-500 mt-0.5" v-show="props.error">{{ props.error }}</span>
  </div>
</template>

<script setup>
const props = defineProps({
  name: String,
  label: String,
  placeholder: String,
  type: String,
  register: Object,
  error: String,
  styles: String
})
</script>
