<template>
  <div class="bg-white py-24 sm:py-32">
    <div class="mx-auto max-w-7xl px-6 lg:px-8">
      <div class="mx-auto max-w-2xl lg:mx-0">
        <h2 class="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">GG team</h2>
        <p class="mt-6 text-lg leading-8 text-gray-600">
          猪猪侠，中国3D动画《猪猪侠》系列中的男主角，不同的版本有不同设定的猪猪侠。不变的是猪猪侠性格个性调皮、乐观，富有好奇心，爱打抱不平。最喜欢吃棒棒糖。
        </p>
      </div>
      <ul
        role="list"
        class="mx-auto mt-20 grid max-w-2xl grid-cols-2 gap-x-8 gap-y-16 text-center sm:grid-cols-3 md:grid-cols-4 lg:mx-0 lg:max-w-none lg:grid-cols-5 xl:grid-cols-6"
      >
        <li v-for="person in people" :key="person.name">
          <img class="mx-auto h-24 w-24 rounded-full" :src="person.imageUrl" alt="" />
          <h3 class="mt-6 text-base font-semibold leading-7 tracking-tight text-gray-900">
            {{ person.name }}
          </h3>
          <p class="text-sm leading-6 text-gray-600">{{ person.role }}</p>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
const people = [
  {
    name: 'GGbond',
    role: '董事长 / CEO',
    imageUrl: 'https://pic.imgdb.cn/item/66811af1d9c307b7e9e8a87e.jpg'
  }
  // More people...
]
</script>
