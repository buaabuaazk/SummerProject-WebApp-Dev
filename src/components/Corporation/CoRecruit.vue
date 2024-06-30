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
                    <DisclosurePanel class="pt-6">
                      <div class="space-y-6">
                        <div
                          v-for="(option, optionIdx) in section.options"
                          :key="option.value"
                          class="flex items-center"
                        >
                          <input
                            :id="`filter-mobile-${section.id}-${optionIdx}`"
                            :name="`${section.id}[]`"
                            :value="option.value"
                            type="checkbox"
                            :checked="option.checked"
                            class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                          />
                          <label
                            :for="`filter-mobile-${section.id}-${optionIdx}`"
                            class="ml-3 text-sm text-gray-500"
                            >{{ option.label }}</label
                          >
                        </div>
                      </div>
                    </DisclosurePanel>
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
          拉勾招聘为求职者提供最新的北京企业招聘信息，北京招聘信息，海量公司在线招聘，直接开聊，在线约面试，找工作就上拉勾北京人才招聘网。
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
                        v-if="sectionIdx === 0"
                        class="ml-1.5 rounded bg-gray-200 px-1.5 py-0.5 text-xs font-semibold tabular-nums text-gray-700"
                        >1</span
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
                  <button
                    type="button"
                    class="ml-1 inline-flex h-4 w-4 flex-shrink-0 rounded-full p-1 text-gray-400 hover:bg-gray-200 hover:text-gray-500"
                  >
                    <span class="sr-only">Remove filter for {{ activeFilter.label }}</span>
                    <svg class="h-2 w-2" stroke="currentColor" fill="none" viewBox="0 0 8 8">
                      <path stroke-linecap="round" stroke-width="1.5" d="M1 1l6 6m0-6L1 7" />
                    </svg>
                  </button>
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
    <div>
      <div class="border-b border-gray-200 bg-white px-4 py-5 sm:px-6">
        <div class="-ml-4 -mt-2 flex flex-wrap items-center justify-between sm:flex-nowrap">
          <div class="ml-4 mt-2">
            <h3 class="text-base font-semibold leading-6 text-gray-900">Job Postings</h3>
          </div>
          <div class="ml-4 mt-2 flex-shrink-0">
            <button
              type="button"
              class="relative inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Create new job
            </button>
          </div>
        </div>
      </div>
      <ul role="list" class="divide-y divide-gray-200">
        <li v-for="i in 5" :key="i">
          <a href="#" class="block hover:bg-gray-50">
            <div class="px-4 py-4 sm:px-6">
              <div class="flex items-center justify-between">
                <div class="truncate text-sm font-medium text-indigo-600">
                  User Interface Designer
                </div>
                <div class="ml-2 flex flex-shrink-0">
                  <span
                    class="inline-flex items-center rounded-full bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20"
                    >Full-time</span
                  >
                </div>
              </div>
              <div class="mt-2 flex justify-between">
                <div class="sm:flex">
                  <div class="flex items-center text-sm text-gray-500">
                    <UsersIcon class="h-5 w-5 mr-1" />
                    Design
                  </div>
                </div>
                <div class="ml-2 flex items-center text-sm text-gray-500">
                  <MapPinIcon class="w-5 h-5 mr-1" />
                  Remote
                </div>
              </div>
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
          href="#"
          class="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >Previous</a
        >
        <a
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
            <span class="font-medium">1</span>
            {{ ' ' }}
            to
            {{ ' ' }}
            <span class="font-medium">10</span>
            {{ ' ' }}
            of
            {{ ' ' }}
            <span class="font-medium">97</span>
            {{ ' ' }}
            results
          </p>
        </div>
        <div>
          <nav class="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
            <a
              href="#"
              class="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
            >
              <span class="sr-only">Previous</span>
              <ChevronLeftIcon class="h-5 w-5" aria-hidden="true" />
            </a>
            <!-- Current: "z-10 bg-indigo-600 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600", Default: "text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:outline-offset-0" -->
            <a
              href="#"
              aria-current="page"
              class="relative z-10 inline-flex items-center bg-indigo-600 px-4 py-2 text-sm font-semibold text-white focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >1</a
            >
            <a
              href="#"
              class="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
              >2</a
            >
            <a
              href="#"
              class="relative hidden items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 md:inline-flex"
              >3</a
            >
            <span
              class="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-700 ring-1 ring-inset ring-gray-300 focus:outline-offset-0"
              >...</span
            >
            <a
              href="#"
              class="relative hidden items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 md:inline-flex"
              >8</a
            >
            <a
              href="#"
              class="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
              >9</a
            >
            <a
              href="#"
              class="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
              >10</a
            >
            <a
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
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/vue/20/solid'
import { ref } from 'vue'

import { MapPinIcon } from '@heroicons/vue/24/outline'
import { UsersIcon } from '@heroicons/vue/24/outline'

import { staticJobs } from '@/stores/useCorporationStore'

const jobs = ref(staticJobs)
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
import { XMarkIcon } from '@heroicons/vue/24/outline'
import { ChevronDownIcon } from '@heroicons/vue/20/solid'

const sortOptions = [
  { name: 'Most Popular', href: '#', current: true },
  { name: 'Best Rating', href: '#', current: false },
  { name: 'Newest', href: '#', current: false }
]
const filters = [
  {
    id: 'category',
    name: 'Category',
    options: [
      { value: 'new-arrivals', label: 'All New Arrivals', checked: false },
      { value: 'tees', label: 'Tees', checked: false },
      { value: 'objects', label: 'Objects', checked: true }
    ]
  },
  {
    id: 'color',
    name: 'Color',
    options: [
      { value: 'white', label: 'White', checked: false },
      { value: 'beige', label: 'Beige', checked: false },
      { value: 'blue', label: 'Blue', checked: false }
    ]
  },
  {
    id: 'sizes',
    name: 'Sizes',
    options: [
      { value: 's', label: 'S', checked: false },
      { value: 'm', label: 'M', checked: false },
      { value: 'l', label: 'L', checked: false }
    ]
  }
]
const activeFilters = [{ value: 'objects', label: 'Objects' }]

const open = ref(false)
</script>
