<template>
  <div>
    <div class="bg-white">
      <!-- Mobile filter dialog -->
      <TransitionRoot as="template" :show="open">
        <Dialog class="relative z-40 sm:hidden" @close="open = false">
          <TransitionChild
            as="template"
            enter="transition-opacity ease-linear duration-300"
            enter-from="opacity-0"
            enter-to="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leave-from="opacity-100"
            leave-to="opacity-0"
          >
            <div class="fixed inset-0 bg-black bg-opacity-25" />
          </TransitionChild>

          <div class="fixed inset-0 z-40 flex">
            <TransitionChild
              as="template"
              enter="transition ease-in-out duration-300 transform"
              enter-from="translate-x-full"
              enter-to="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leave-from="translate-x-0"
              leave-to="translate-x-full"
            >
              <DialogPanel
                class="relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-white py-4 pb-12 shadow-xl"
              >
                <div class="flex items-center justify-between px-4">
                  <h2 class="text-lg font-medium text-gray-900">Filters</h2>
                  <button
                    type="button"
                    class="-mr-2 flex h-10 w-10 items-center justify-center rounded-md bg-white p-2 text-gray-400"
                    @click="open = false"
                  >
                    <span class="sr-only">Close menu</span>
                    <XMarkIcon class="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>

                <!-- Filters -->
                <form class="mt-4">
                  <Disclosure
                    as="div"
                    v-for="section in filters"
                    :key="section.name"
                    class="border-t border-gray-200 px-4 py-6"
                    v-slot="{ open }"
                  >
                    <h3 class="-mx-2 -my-3 flow-root">
                      <DisclosureButton
                        class="flex w-full items-center justify-between bg-white px-2 py-3 text-sm text-gray-400"
                      >
                        <span class="font-medium text-gray-900">{{ section.name }}</span>
                        <span class="ml-6 flex items-center">
                          <ChevronDownIcon
                            :class="[open ? '-rotate-180' : 'rotate-0', 'h-5 w-5 transform']"
                            aria-hidden="true"
                          />
                        </span>
                      </DisclosureButton>
                    </h3>
                  </Disclosure>
                </form>
              </DialogPanel>
            </TransitionChild>
          </div>
        </Dialog>
      </TransitionRoot>

      <div class="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <h1 class="text-3xl font-bold tracking-tight text-gray-900">企业招聘</h1>
        <p class="mt-4 max-w-xl text-sm text-gray-700">
          勾八招聘为求职者提供最新的北京企业招聘信息，北京招聘信息，海量公司在线招聘，直接开聊，在线约面试，找工作就上拉勾北京人才招聘网。
        </p>
      </div>

      <!-- Filters -->
      <section aria-labelledby="filter-heading">
        <h2 id="filter-heading" class="sr-only">Filters</h2>

        <div class="border-b border-gray-200 bg-white pb-4">
          <div class="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
            <Menu as="div" class="relative inline-block text-left">
              <div>
                <MenuButton
                  class="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900"
                >
                  Sort
                  <ChevronDownIcon
                    class="-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                    aria-hidden="true"
                  />
                </MenuButton>
              </div>

              <transition
                enter-active-class="transition ease-out duration-100"
                enter-from-class="transform opacity-0 scale-95"
                enter-to-class="transform opacity-100 scale-100"
                leave-active-class="transition ease-in duration-75"
                leave-from-class="transform opacity-100 scale-100"
                leave-to-class="transform opacity-0 scale-95"
              >
                <MenuItems
                  class="absolute left-0 z-10 mt-2 w-40 origin-top-left rounded-md bg-white shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none"
                >
                  <div class="py-1">
                    <MenuItem v-for="option in sortOptions" :key="option.name" v-slot="{ active }">
                      <a
                        :href="option.href"
                        :class="[
                          option.current ? 'font-medium text-gray-900' : 'text-gray-500',
                          active ? 'bg-gray-100' : '',
                          'block px-4 py-2 text-sm'
                        ]"
                        @click="
                          () => {
                            for (let i = 0; i < sortOptions.length; i++) {
                              sortOptions[i].current = false
                            }
                            option.current = true
                            activeSort = option.name
                            renew()
                          }
                        "
                        >{{ option.name }}</a
                      >
                    </MenuItem>
                  </div>
                </MenuItems>
              </transition>
            </Menu>

            <button
              type="button"
              class="inline-block text-sm font-medium text-gray-700 hover:text-gray-900 sm:hidden"
              @click="open = true"
            >
              Filters
            </button>

            <div class="hidden sm:block">
              <div class="flow-root">
                <PopoverGroup class="-mx-4 flex items-center divide-x divide-gray-200">
                  <Popover
                    v-for="(section, sectionIdx) in filters"
                    :key="section.name"
                    class="relative inline-block px-4 text-left"
                  >
                    <PopoverButton
                      class="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900"
                    >
                      <span>{{ section.name }}</span>
                      <span
                        v-if="activeLists[sectionIdx].length != 0"
                        class="ml-1.5 rounded bg-gray-200 px-1.5 py-0.5 text-xs font-semibold tabular-nums text-gray-700"
                        >{{ activeLists[sectionIdx].length }}</span
                      >
                      <ChevronDownIcon
                        class="-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                        aria-hidden="true"
                      />
                    </PopoverButton>

                    <transition
                      enter-active-class="transition ease-out duration-100"
                      enter-from-class="transform opacity-0 scale-95"
                      enter-to-class="transform opacity-100 scale-100"
                      leave-active-class="transition ease-in duration-75"
                      leave-from-class="transform opacity-100 scale-100"
                      leave-to-class="transform opacity-0 scale-95"
                    >
                      <PopoverPanel
                        class="absolute right-0 z-10 mt-2 origin-top-right rounded-md bg-white p-4 shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none"
                      >
                        <form class="space-y-4">
                          <div
                            v-for="(option, optionIdx) in section.options"
                            :key="option.value"
                            class="flex items-center"
                          >
                            <input
                              :id="`filter-${section.id}-${optionIdx}`"
                              :name="`${section.id}[]`"
                              :value="option.value"
                              type="checkbox"
                              :checked="option.checked"
                              @click="
                                () => {
                                  option.checked = !option.checked
                                  if (
                                    activeFilters.findIndex(
                                      (filter) => filter.value === option.value
                                    ) === -1
                                  ) {
                                    activeFilters.push(option)
                                  } else {
                                    activeFilters.splice(
                                      activeFilters.findIndex(
                                        (filter) => filter.value === option.value
                                      ),
                                      1
                                    )
                                  }
                                  renew()
                                }
                              "
                              class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                            />
                            <label
                              :for="`filter-${section.id}-${optionIdx}`"
                              class="ml-3 whitespace-nowrap pr-6 text-sm font-medium text-gray-900"
                              >{{ option.label }}</label
                            >
                          </div>
                        </form>
                      </PopoverPanel>
                    </transition>
                  </Popover>
                </PopoverGroup>
              </div>
            </div>
          </div>
        </div>

        <!-- Active filters -->
        <div class="bg-gray-100">
          <div class="mx-auto max-w-7xl px-4 py-3 sm:flex sm:items-center sm:px-6 lg:px-8">
            <h3 class="text-sm font-medium text-gray-500">
              Filters
              <span class="sr-only">, active</span>
            </h3>

            <div aria-hidden="true" class="hidden h-5 w-px bg-gray-300 sm:ml-4 sm:block" />

            <div class="mt-2 sm:ml-4 sm:mt-0">
              <div class="-m-1 flex flex-wrap items-center">
                <span
                  v-for="activeFilter in activeFilters"
                  :key="activeFilter.value"
                  class="m-1 inline-flex items-center rounded-full border border-gray-200 bg-white py-1.5 pl-3 pr-2 text-sm font-medium text-gray-900"
                >
                  <span>{{ activeFilter.label }}</span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
    <div>
      <div class="border-b border-gray-200 bg-white px-4 py-5 sm:px-6 max-w-[95%] mx-auto">
        <div class="-ml-4 -mt-2 flex flex-wrap items-center justify-between sm:flex-nowrap">
          <div class="ml-4 mt-2">
            <h3 class="text-base font-semibold leading-6 text-gray-900">目前正在招聘的岗位👇🏻</h3>
          </div>
          <div class="ml-4 mt-2 flex-shrink-0">
            <button
              type="button"
              class="relative inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              创建新的职位
            </button>
          </div>
        </div>
      </div>
      <ul role="list" class="divide-y divide-gray-200 max-w-[90%] mx-auto">
        <li
          v-for="recruit in page_data"
          :key="recruit.recruit_id"
          class="shadow-2xl rounded-lg m-1"
          @click="() => router.push(`/jobinfo/${recruit.recruit_id}`)"
        >
          <a href="#" class="block hover:bg-gray-50">
            <div class="px-4 py-4 sm:px-6">
              <div class="flex items-center justify-between">
                <div class="truncate text-xl font-medium text-indigo-500">
                  {{ recruit.job_name }}
                </div>
                <div class="ml-2 flex flex-shrink-0">
                  <span
                    class="inline-flex items-center rounded-full bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20"
                    >Full-time</span
                  >
                </div>
              </div>
              <dl
                class="mx-auto grid grid-cols-1 gap-px bg-gray-900/5 sm:grid-cols-2 lg:grid-cols-4"
              >
                <div
                  class="flex flex-wrap items-baseline justify-between gap-x-2 gap-y-1 bg-white px-2 py-2 sm:px-4 xl:px-6"
                >
                  <dt class="text-sm font-medium leading-6 text-gray-500">工作天数</dt>
                  <dd class="text-xs font-medium">day / week</dd>
                  <dd
                    class="w-full flex-none text-xl font-medium leading-10 tracking-tight text-gray-900"
                  >
                    {{ recruit.job_day }}
                  </dd>
                </div>
                <div
                  class="flex flex-wrap items-baseline justify-between gap-x-2 gap-y-1 bg-white px-2 py-2 sm:px-4 xl:px-6"
                >
                  <dt class="text-sm font-medium leading-6 text-gray-500">工作月数</dt>
                  <dd class="text-xs font-medium">month / year</dd>
                  <dd
                    class="w-full flex-none text-xl font-medium leading-10 tracking-tight text-gray-900"
                  >
                    {{ recruit.job_month }}
                  </dd>
                </div>
                <div
                  class="flex flex-wrap items-baseline justify-between gap-x-2 gap-y-1 bg-white px-2 py-2 sm:px-4 xl:px-6"
                >
                  <dt class="text-sm font-medium leading-6 text-gray-500">薪资</dt>
                  <dd class="text-xs font-medium">K / month</dd>
                  <dd
                    class="w-full flex-none text-xl font-medium leading-10 tracking-tight text-gray-900"
                  >
                    {{ recruit.job_salary }}
                  </dd>
                </div>
                <div
                  class="flex flex-wrap items-baseline justify-between gap-x-2 gap-y-1 bg-white px-2 py-2 sm:px-4 xl:px-6"
                >
                  <dt class="text-sm font-medium leading-6 text-gray-500">工作优势</dt>
                  <dd class="text-xs font-medium">
                    {{ Object.keys(recruit.job_advantage).length }}
                  </dd>

                  <ul class="w-full px-4 list-decimal">
                    <li
                      v-for="(advantage, index) in recruit.job_advantage"
                      :key="index"
                      class="flex-none text-sm font-medium leading-7 tracking-tight text-gray-900"
                    >
                      {{ advantage }}
                    </li>
                  </ul>
                </div>
              </dl>
              <div class="mt-2 flex justify-between">
                <div class="sm:flex">
                  <div class="flex items-center text-sm text-gray-500">
                    <UsersIcon class="h-5 w-5 mr-1" />
                    {{ recruit.job_needed_people }}
                  </div>
                </div>
                <div class="ml-2 flex items-center text-sm text-gray-500">
                  <MapPinIcon class="w-5 h-5 mr-1" />
                  {{ recruit.job_location }}
                </div>
              </div>
              <p class="mt-1 text-sm italic text-gray-500">
                {{ recruit.job_content['内容1'] }}........
              </p>
            </div>
          </a>
        </li>
      </ul>
    </div>
    <div
      class="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6"
    >
      <div class="flex flex-1 justify-between sm:hidden">
        <a
          @click="
            () => {
              index = index - 10 < 0 ? 0 : index - 10
              renew()
            }
          "
          href="#"
          class="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >Previous</a
        >
        <a
          @click="
            () => {
              index = index + 10 > data.length ? index : index + 10
              renew()
            }
          "
          href="#"
          class="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >Next</a
        >
      </div>
      <div class="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
        <div>
          <p class="text-sm text-gray-700">
            Showing
            {{ ' ' }}
            <span class="font-medium">{{ index + 1 }}</span>
            {{ ' ' }}
            to
            {{ ' ' }}
            <span class="font-medium">{{
              index + 10 > data.length ? data.length : index + 10
            }}</span>
            {{ ' ' }}
            of
            {{ ' ' }}
            <span class="font-medium">{{ data.length }}</span>
            {{ ' ' }}
            results
          </p>
        </div>
        <div>
          <nav class="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
            <a
              @click="
                () => {
                  index = index - 10 < 0 ? 0 : index - 10
                  renew()
                }
              "
              href="#"
              class="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
            >
              <span class="sr-only">Previous</span>
              <ChevronLeftIcon class="h-5 w-5" aria-hidden="true" />
            </a>
            <!-- Current: "z-10 bg-indigo-600 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600", Default: "text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:outline-offset-0" -->
            <a
              v-for="i in Math.ceil(data.length / 10)"
              :key="i"
              @click="
                () => {
                  index = (i - 1) * 10
                  renew()
                }
              "
              href="#"
              aria-current="page"
              :class="[
                Math.ceil(index / 10) + 1 == i ? 'bg-indigo-400' : '',
                'relative z-10 inline-flex items-center px-4 py-2 text-sm font-semibold text-black focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 active:bg-indigo-600'
              ]"
              >{{ i }}</a
            >
            <a
              @click="
                () => {
                  index = index + 10 > data.length ? index : index + 10
                  renew()
                }
              "
              href="#"
              class="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
            >
              <span class="sr-only">Next</span>
              <ChevronRightIcon class="h-5 w-5" aria-hidden="true" />
            </a>
          </nav>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ChevronLeftIcon, ChevronRightIcon, ChevronDownIcon } from '@heroicons/vue/20/solid'
import { computed, onMounted, ref } from 'vue'

import { MapPinIcon, UsersIcon, XMarkIcon } from '@heroicons/vue/24/outline'

import { useRouter } from 'vue-router'

const router = useRouter()

import {
  Dialog,
  DialogPanel,
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  Popover,
  PopoverButton,
  PopoverGroup,
  PopoverPanel,
  TransitionChild,
  TransitionRoot
} from '@headlessui/vue'

import {
  getUserProfile,
  getEnterpriseInfo,
  getEnterpriseRecruit
} from '@/stores/useCorporationStore'

let index = ref(0)

let userProfile = ref(null)
let enterpriseInfo = ref(null)
let enterpriseRecruit = ref(null)

async function fetchData() {
  userProfile.value = await getUserProfile()
  enterpriseInfo.value = await getEnterpriseInfo(userProfile.value.enterprise)
  enterpriseRecruit.value = await getEnterpriseRecruit(userProfile.value.enterprise)
}

function createFilter(form) {
  for (let i = 0; i < form.length; i++) {
    if (form[i].tag) {
      for (let j = 0; j < form[i].tag.length; j++) {
        filters.value[0].options.push({
          value: form[i].tag[j],
          label: form[i].tag[j],
          checked: false
        })
      }
    }
    if (form[i].job_advantage) {
      for (let j = 0; j < form[i].job_advantage.length; j++) {
        filters.value[1].options.push({
          value: form[i].job_advantage[j],
          label: form[i].job_advantage[j],
          checked: false
        })
      }
    }
    if (form[i].enterprise_field) {
      filters.value[2].options.push({
        value: form[i].enterprise_field,
        label: form[i].enterprise_field,
        checked: false
      })
    }
    for (let i = 0; i < filters.value.length; i++) {
      filters.value[i].options = filters.value[i].options.reduce((acc, current) => {
        let labels = acc.map((item) => item.label)
        if (!labels.includes(current.label) && current.label) {
          acc.push(current)
        }
        return acc
      }, [])
    }
  }
}

onMounted(async () => {
  await fetchData()
  createFilter(enterpriseRecruit.value)
  renew()
})

const sortOptions = [
  { name: '薪资最高', href: '#', current: false },
  { name: '需求最多', href: '#', current: false },
  { name: '最轻松', href: '#', current: false }
]
const filters = ref([
  {
    id: 'category',
    name: '标签',
    options: []
  },
  {
    id: 'adv',
    name: '工作优势',
    options: []
  },
  {
    id: 'field',
    name: '领域',
    options: []
  }
])
const activeFilters = ref([])

const activeSort = ref(null)

const activeLists = computed(() => {
  return [
    filters.value[0].options.filter((option) => option.checked),
    filters.value[1].options.filter((option) => option.checked),
    filters.value[2].options.filter((option) => option.checked)
  ]
})

let data = ref([])
let page_data = ref([])

// 根据现有的sort和filter来筛选数据
function renew() {
  data.value = enterpriseRecruit.value.filter((item) => {
    let flag = true
    for (let i = 0; i < activeLists.value[0].length; i++) {
      if (item.tag.includes(activeLists.value[0][i].label)) {
        break
      }
      if (i === activeLists.value[0].length - 1) {
        return false
      }
    }
    for (let i = 0; i < activeLists.value[1].length; i++) {
      if (item.job_advantage.includes(activeLists.value[1][i].label)) {
        break
      }
      if (i === activeLists.value[1].length - 1) {
        return false
      }
    }
    for (let i = 0; i < activeLists.value[2].length; i++) {
      if (item.enterprise_field == activeLists.value[2][i].label) {
        break
      }
      if (i === activeLists.value[2].length - 1) {
        return false
      }
    }
    return flag
  })
  //   依据sort来排序
  if (activeSort.value == '薪资最高') {
    data.value.sort((a, b) => {
      return getFirstNumberFromString(b.job_salary) - getFirstNumberFromString(a.job_salary)
    })
  } else if (activeSort.value == '需求最多') {
    data.value.sort((a, b) => {
      return b.job_needed_people - a.job_needed_people
    })
  } else if (activeSort.value == '最轻松') {
    data.value.sort((a, b) => {
      return a.job_day - b.job_day
    })
  }
  page_data.value = data.value.slice(index.value, index.value + 10)
}

function getFirstNumberFromString(str) {
  const match = str.match(/^\d+/)
  return match ? match[0] : null
}

const open = ref(false)
</script>
