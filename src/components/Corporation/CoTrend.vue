<template>
  <div>
    <div class="bg-gray-50">
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
                class="relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-white py-4 pb-6 shadow-xl"
              >
                <div class="flex items-center justify-between px-4">
                  <h2 class="text-lg font-medium text-gray-900">Filters</h2>
                  <button
                    type="button"
                    class="-mr-2 flex h-10 w-10 items-center justify-center rounded-md bg-white p-2 text-gray-400 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500"
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

      <div class="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:max-w-7xl lg:px-8">
        <div class="py-24">
          <h1 class="text-4xl font-bold tracking-tight text-gray-900">企业动态</h1>
          <p class="mx-auto mt-4 max-w-3xl text-base text-gray-500">
            “企业动态”主要是指发布企业及周边企业的最新动态，它是企业中或企业间利用重大产销资讯、营运信息、广告宣传等活动形式打造企业品牌、宣传企业形象的基本动态。
          </p>
        </div>

        <section aria-labelledby="filter-heading" class="border-t border-gray-200 py-6">
          <h2 id="filter-heading" class="sr-only">Product filters</h2>

          <div class="flex items-center justify-between">
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
                    <MenuItem v-for="option in sortOptions" :key="option" v-slot="{ active }">
                      <a
                        :href="option.href"
                        :class="[
                          active ? 'bg-gray-100' : '',
                          'block px-4 py-2 text-sm font-medium text-gray-900'
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

            <PopoverGroup class="hidden sm:flex sm:items-baseline sm:space-x-8">
              <Popover
                as="div"
                v-for="(section, sectionIdx) in filters"
                :key="section.name"
                :id="`desktop-menu-${sectionIdx}`"
                class="relative inline-block text-left"
              >
                <div>
                  <PopoverButton
                    class="group inline-flex items-center justify-center text-sm font-medium text-gray-700 hover:text-gray-900"
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
                </div>

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
        </section>
      </div>
    </div>
    <ul role="list" class="divide-y divide-gray-100 mx-8">
      <li
        v-for="discussion in discussions"
        :key="discussion.id"
        class="flex flex-wrap items-center justify-between gap-x-6 gap-y-4 py-5 sm:flex-nowrap"
      >
        <div>
          <p class="text-sm font-semibold leading-6 text-gray-900">
            <a :href="discussion.href" class="hover:underline">{{ discussion.title }}</a>
          </p>
          <div class="mt-1 flex items-center gap-x-2 text-xs leading-5 text-gray-500">
            <p>
              <a :href="discussion.author.href" class="hover:underline">{{
                discussion.author.name
              }}</a>
            </p>
            <svg viewBox="0 0 2 2" class="h-0.5 w-0.5 fill-current">
              <circle cx="1" cy="1" r="1" />
            </svg>
            <p>
              <time :datetime="discussion.dateTime">{{ discussion.date }}</time>
            </p>
          </div>
        </div>
        <dl class="flex w-full flex-none justify-between gap-x-8 sm:w-auto">
          <div class="flex -space-x-0.5">
            <dt class="sr-only">Commenters</dt>
            <dd v-for="commenter in discussion.commenters" :key="commenter.id">
              <img
                class="h-6 w-6 rounded-full bg-gray-50 ring-2 ring-white"
                :src="commenter.imageUrl"
                :alt="commenter.name"
              />
            </dd>
          </div>
          <div class="flex w-16 gap-x-2.5">
            <dt>
              <span class="sr-only">Total comments</span>
              <CheckCircleIcon
                v-if="discussion.status === 'resolved'"
                class="h-6 w-6 text-gray-400"
                aria-hidden="true"
              />
              <ChatBubbleLeftIcon v-else class="h-6 w-6 text-gray-400" aria-hidden="true" />
            </dt>
            <dd class="text-sm leading-6 text-gray-900">{{ discussion.totalComments }}</dd>
          </div>
        </dl>
      </li>
    </ul>
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
  { name: 'Most Popular', href: '#' },
  { name: 'Best Rating', href: '#' },
  { name: 'Newest', href: '#' }
]
const filters = [
  {
    id: 'category',
    name: 'Category',
    options: [
      { value: 'tees', label: 'Tees' },
      { value: 'crewnecks', label: 'Crewnecks' },
      { value: 'hats', label: 'Hats' }
    ]
  },
  {
    id: 'brand',
    name: 'Brand',
    options: [
      { value: 'clothing-company', label: 'Clothing Company' },
      { value: 'fashion-inc', label: 'Fashion Inc.' },
      { value: 'shoes-n-more', label: "Shoes 'n More" }
    ]
  },
  {
    id: 'color',
    name: 'Color',
    options: [
      { value: 'white', label: 'White' },
      { value: 'black', label: 'Black' },
      { value: 'grey', label: 'Grey' }
    ]
  },
  {
    id: 'sizes',
    name: 'Sizes',
    options: [
      { value: 's', label: 'S' },
      { value: 'm', label: 'M' },
      { value: 'l', label: 'L' }
    ]
  }
]

import { ChatBubbleLeftIcon, CheckCircleIcon } from '@heroicons/vue/24/outline'

const discussions = [
  {
    id: 1,
    title: '大家好啊，我是答辩超人💪🏻',
    href: '#',
    author: { name: 'Leslie Alexander', href: '#' },
    date: '2d ago',
    dateTime: '2023-01-23T22:34Z',
    status: 'active',
    totalComments: 24,
    commenters: [
      {
        id: 12,
        name: 'Emma Dorsey',
        imageUrl:
          'https://images.unsplash.com/photo-1505840717430-882ce147ef2d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
      },
      {
        id: 6,
        name: 'Tom Cook',
        imageUrl:
          'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
      },
      {
        id: 4,
        name: 'Lindsay Walton',
        imageUrl:
          'https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
      },
      {
        id: 16,
        name: 'Benjamin Russel',
        imageUrl:
          'https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
      },
      {
        id: 23,
        name: 'Hector Gibbons',
        imageUrl:
          'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
      }
    ]
  },
  {
    id: 2,
    title: '软工小学期我一得阁拉米🤗',
    href: '#',
    author: { name: 'Michael Foster', href: '#' },
    date: '2d ago',
    dateTime: '2023-01-23T19:20Z',
    status: 'active',
    totalComments: 6,
    commenters: [
      {
        id: 13,
        name: 'Alicia Bell',
        imageUrl:
          'https://images.unsplash.com/photo-1509783236416-c9ad59bae472?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
      },
      {
        id: 16,
        name: 'Benjamin Russel',
        imageUrl:
          'https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
      },
      {
        id: 3,
        name: 'Dries Vincent',
        imageUrl:
          'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
      }
    ]
  },
  {
    id: 3,
    title: '我的高娃刚刚爆炸了🤣',
    href: '#',
    author: { name: 'Dries Vincent', href: '#' },
    date: '3d ago',
    dateTime: '2023-01-22T12:59Z',
    status: 'resolved',
    totalComments: 22,
    commenters: [
      {
        id: 19,
        name: 'Lawrence Hunter',
        imageUrl:
          'https://images.unsplash.com/photo-1513910367299-bce8d8a0ebf6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
      },
      {
        id: 21,
        name: 'Angela Fisher',
        imageUrl:
          'https://images.unsplash.com/photo-1501031170107-cfd33f0cbdcc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
      },
      {
        id: 14,
        name: 'Jenny Wilson',
        imageUrl:
          'https://images.unsplash.com/photo-1507101105822-7472b28e22ac?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
      },
      {
        id: 16,
        name: 'Benjamin Russel',
        imageUrl:
          'https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
      }
    ]
  },
  {
    id: 4,
    title: '不玩原神的请划走😡👉',
    href: '#',
    author: { name: 'Lindsay Walton', href: '#' },
    date: '5d ago',
    dateTime: '2023-01-20T10:04Z',
    status: 'resolved',
    totalComments: 8,
    commenters: [
      {
        id: 10,
        name: 'Emily Selman',
        imageUrl:
          'https://images.unsplash.com/photo-1502685104226-ee32379fefbe?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
      },
      {
        id: 11,
        name: 'Kristin Watson',
        imageUrl:
          'https://images.unsplash.com/photo-1500917293891-ef795e70e1f6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
      }
    ]
  },
  {
    id: 5,
    title: '小时候看到这集爽滑满天了🤟',
    href: '#',
    author: { name: 'Courtney Henry', href: '#' },
    date: '5d ago',
    dateTime: '2023-01-20T20:12Z',
    status: 'active',
    totalComments: 15,
    commenters: [
      {
        id: 11,
        name: 'Kristin Watson',
        imageUrl:
          'https://images.unsplash.com/photo-1500917293891-ef795e70e1f6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
      },
      {
        id: 6,
        name: 'Tom Cook',
        imageUrl:
          'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
      },
      {
        id: 10,
        name: 'Emily Selman',
        imageUrl:
          'https://images.unsplash.com/photo-1502685104226-ee32379fefbe?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
      },
      {
        id: 16,
        name: 'Benjamin Russel',
        imageUrl:
          'https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
      }
    ]
  }
]

const open = ref(false)
</script>
