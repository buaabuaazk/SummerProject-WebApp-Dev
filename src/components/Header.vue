<!--
 * @Date: 2024-06-23 11:57:41
 * @Author: Q9K
 * @Description: 网页横栏
-->
<template>
  <Disclosure as="nav" class="bg-white shadow fixed w-full top-0 z-10" v-slot="{ open }">
    <div class="mx-auto max-w-7xl px-2 sm:px-4 lg:px-8">
      <div class="flex h-16 justify-between">
        <div class="flex px-2 lg:px-0">
          <div class="flex flex-shrink-0 items-center">
            <a href="./">
              <img class="h-20 w-auto" src="@/assets/logo.png" alt="Your Company" />
            </a>
          </div>
          <div class="hidden lg:ml-6 lg:flex lg:space-x-8">
            <!-- Current: "border-indigo-500 text-gray-900", Default: "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700" -->
            <a id="link1" href="/" class="mouse-not-on">招聘信息</a>
            <a id="link2" href="/CreatePost" class="mouse-not-on">发布动态</a>
            <a id="link3" href="/PersonalInfo" class="mouse-not-on">我的关注</a>
            <a id="link4" href="/CorporationInfo" class="mouse-not-on">我的企业</a>
          </div>
        </div>

        <div class="flex flex-1 items-center justify-center px-2 lg:ml-6 lg:justify-end">
          <div class="w-full max-w-lg lg:max-w-xs">
            <label for="search" class="sr-only">Search</label>
            <div class="relative">
              <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <MagnifyingGlassIcon class="h-5 w-5 text-gray-400" aria-hidden="true" />
              </div>
              <input
                id="search"
                name="search"
                class="block w-full rounded-md border-0 bg-white py-1.5 pl-10 pr-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                placeholder="Search"
                type="search"
                @keyup.enter="gotoSearch"
                v-model="searchContent"
              />
            </div>
          </div>
        </div>

        <div class="block lg:hidden mt-3">
          <!-- Mobile menu button -->
          <DisclosureButton
            class="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
          >
            <span class="absolute -inset-0.5" />
            <span class="sr-only">Open main menu</span>
            <Bars3Icon v-if="!open" class="block h-6 w-6" aria-hidden="true" />
            <XMarkIcon v-else class="block h-6 w-6" aria-hidden="true" />
          </DisclosureButton>
        </div>
        <div class="hidden lg:ml-4 lg:flex lg:items-center">
          <button
            type="button"
            class="relative flex-shrink-0 rounded-full bg-white p-1 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            <span class="absolute -inset-1.5" />
            <span class="sr-only">View notifications</span>
            <BellIcon class="h-6 w-6" aria-hidden="true" />
          </button>

          <!-- Profile dropdown -->
          <Menu as="div" class="relative ml-4 flex-shrink-0">
            <div>
              <MenuButton
                class="relative flex rounded-full bg-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                <span class="absolute -inset-1.5" />
                <span class="sr-only">Open user menu</span>
                <img
                  class="h-10 w-10 rounded-full"
                  :src="getAvatar()"
                  alt="未登录"
                  @click="ifLogin()"
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
                class="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
              >
                <template v-if="isLogined()">
                  <MenuItem v-slot="{ active }">
                    <a
                      href="/PersonalInfo"
                      :class="[
                        active ? 'bg-gray-100' : '',
                        'block px-4 py-2 text-sm text-gray-700'
                      ]"
                      >个人中心</a
                    >
                  </MenuItem>

                  <MenuItem v-slot="{ active }">
                    <a
                      href="/sos/login"
                      @click="logout"
                      :class="[
                        active ? 'bg-gray-100' : '',
                        'block px-4 py-2 text-sm text-gray-700'
                      ]"
                      >退出登录</a
                    >
                  </MenuItem>

                  <MenuItem v-slot="{ active }">
                    <a
                      href="#"
                      @click="cancelAccount"
                      :class="[
                        active ? 'bg-gray-100' : '',
                        'block px-4 py-2 text-sm text-gray-700'
                      ]"
                      >注销账号</a
                    >
                  </MenuItem>
                </template>
                <template v-else>
                  <MenuItem v-slot="{ active }">
                    <a
                      href="/sos/login"
                      :class="[
                        active ? 'bg-gray-100' : '',
                        'block px-4 py-2 text-sm text-gray-700'
                      ]"
                      >登录</a
                    >
                  </MenuItem>
                  <MenuItem v-slot="{ active }">
                    <a
                      href="/sos/register"
                      :class="[
                        active ? 'bg-gray-100' : '',
                        'block px-4 py-2 text-sm text-gray-700'
                      ]"
                      >注册</a
                    >
                  </MenuItem>
                </template>
              </MenuItems>
            </transition>
          </Menu>
        </div>
      </div>
    </div>

    <DisclosurePanel class="lg:hidden">
      <div class="space-y-1 pb-3 pt-2">
        <!-- Current: "bg-indigo-50 border-indigo-500 text-indigo-700", Default: "border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800" -->
        <DisclosureButton
          as="a"
          href="/"
          class="block border-l-4 border-indigo-500 bg-indigo-50 py-2 pl-3 pr-4 text-base font-medium text-indigo-700"
          >招聘信息</DisclosureButton
        >
        <DisclosureButton
          as="a"
          href="/CreatePost"
          class="block border-l-4 border-transparent py-2 pl-3 pr-4 text-base font-medium text-gray-600 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-800"
          >发布动态</DisclosureButton
        >
        <DisclosureButton
          as="a"
          href="/personalInfo"
          class="block border-l-4 border-transparent py-2 pl-3 pr-4 text-base font-medium text-gray-600 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-800"
          >我的关注</DisclosureButton
        >
        <DisclosureButton
          as="a"
          href="/CorporationInfo"
          class="block border-l-4 border-transparent py-2 pl-3 pr-4 text-base font-medium text-gray-600 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-800"
          >我的企业</DisclosureButton
        >
      </div>
      <div class="border-t border-gray-200 pb-3 pt-4">
        <div class="flex items-center px-4">
          <div class="flex-shrink-0">
            <img
              class="h-10 w-10 rounded-full"
              :src="getAvatar()"
              alt="未登录"
              @click="ifLogin()"
            />
          </div>
          <div class="ml-3">
            <div class="text-base font-medium text-gray-800">{{ username }}</div>
            <div class="text-sm font-medium text-gray-500">{{ email }}</div>
          </div>
          <button
            type="button"
            class="relative ml-auto flex-shrink-0 rounded-full bg-white p-1 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            <span class="absolute -inset-1.5" />
            <span class="sr-only">View notifications</span>
            <BellIcon class="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
        <div class="mt-3 space-y-1">
          <DisclosureButton
            as="a"
            href="/PersonalInfo"
            class="block px-4 py-2 text-base font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-800"
            >个人中心</DisclosureButton
          >

          <DisclosureButton
            as="a"
            href="/sos/login"
            @click="logout"
            class="block px-4 py-2 text-base font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-800"
            >退出登录</DisclosureButton
          >

          <DisclosureButton
            as="a"
            href="#"
            @click="cancelAccount"
            class="block px-4 py-2 text-base font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-800"
            >注销账号</DisclosureButton
          >
        </div>
      </div>
    </DisclosurePanel>
  </Disclosure>
</template>

<script setup>
import { ref, computed } from 'vue'
import router from '@/router'
import axios from '@/utils/request'
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems
} from '@headlessui/vue'
import { MagnifyingGlassIcon } from '@heroicons/vue/20/solid'
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/vue/24/outline'
import avatar1 from '@/assets/avatar1.png'
import avatar_default from '@/assets/userDefaultAvatar.png'
// 在这里使用 onMounted 钩子函数代替 mounted()
import { onMounted } from 'vue'
import useTokenStore from '@/stores/useTokenStore'
const tokenStore = useTokenStore()
const avatar = ref()
const email = ref()
const username = ref()
const isLogined = () => {
  if (tokenStore.getToken) {
    return true
  } else {
    return false
  }
}
onMounted(() => {
  // 获取当前URL的查询字符串
  const path = window.location.pathname
  const link = document.getElementById('link2')
  console.log('start')
  console.log(path)

  const links = document.querySelectorAll('a') // 选择所有的 <a> 标签
  const specificLinks = Array.from(links).filter((link) => {
    return link.classList.contains('mouse-not-on') // 只选择原先类名为 mouse-not-on 的 <a> 标签
  })

  specificLinks.forEach((link) => {
    if (link.getAttribute('href') === path) {
      link.classList.remove('mouse-not-on') // 移除原先的类名
      link.classList.add('mouse-on') // 添加新的类名
    }
  })
})
function ifLogin() {
  console.log('call iflogin')
  console.log(tokenStore.getToken)
  if (tokenStore.getToken == null || tokenStore.getToken == '') {
    router.push('./sos/login')
    console.log('a1aa')
    logout()
    router.push('./sos/login')
  }
}
function logout() {
  router.push('/sos/login')
  //待实现，清空当前登录的token和userid等
  // console.log(tokenStore.getToken)
  //localStorage.setItem('token', null)
  tokenStore.setToken(null)
  // localStorage.removeItem('token')
  router.push('/sos/login')
}
function getAvatar() {
  // console.log('11111ew' + tokenStore.getToken)
  if (!tokenStore.getToken) {
    //console.log('a1aa')
    return avatar_default
  } else {
    console.log(tokenStore.getToken)
    axios
      .get('/api/user/detail', {
        headers: {
          Authorization: tokenStore.getToken
        }
      })
      .then((response) => {
        console.log('获取用户信息成功')
        console.log(response)
        console.log(response.data)
        avatar.value = response.data.icon
        email.value = response.data.email
        username.value = response.data.username
        console.log(avatar.value)
        //console.log(profile.value.detailedInformation.user_id)
      })
      .catch((error) => {
        console.error('获取用户信息失败', error)
      })
    return avatar.value
  }
}
function cancelAccount() {
  //待实现，请求后端删除账号数据，清空当前登录的token和userid等
  router.push('/sos/login')
}
const searchContent = ref('')
const gotoSearch = () => {
  router.push({
    path: 'search',
    query: {
      searchContent: searchContent.value
    }
  })
}
</script>

<style scoped>
.mouse-not-on {
  display: inline-flex;
  align-items: center;
  border-bottom: 2px solid transparent;
  padding: 1px;
  font-size: 0.875rem; /* text-sm 的字体大小 */
  font-weight: 500; /* font-medium 的字体粗细 */
  color: #888888; /* text-gray-500 的文本颜色 */
}

.mouse-not-on:hover {
  border-color: #b2b2b2; /* hover:border-gray-300 的边框颜色 */
  color: #333333; /* hover:text-gray-700 的文本颜色 */
}

.mouse-on {
  display: inline-flex; /* 设置元素为内联弹性布局 */
  align-items: center; /* 设置元素中的内容垂直居中 */
  border-bottom-width: 0.1rem; /* 设置下边框宽度为2px（border-b-2） */
  border-bottom-style: solid; /* 设置下边框样式为实线（border-b-2） */
  border-bottom-color: rgb(27, 62, 236); /* 设置下边框颜色为靛蓝色500（border-indigo-500） */
  padding-left: 1px; /* 设置左内边距为1px（px-1） */
  padding-top: 1px; /* 设置顶部内边距为1px（pt-1） */
  font-size: 0.875rem; /* 设置字体大小为0.875rem（text-sm） */
  font-weight: 500; /* 设置字体粗细为500（font-medium） */
  color: #222222; /* 设置文本颜色为深灰色（text-gray-900） */
}

.mouse-on:hover {
  border-bottom-color: #cbd5e0; /* 设置鼠标悬停时下边框颜色为浅灰色（hover:border-gray-300） */
  color: #2d3748; /* 设置鼠标悬停时文本颜色为深蓝灰色（hover:text-gray-700） */
}
</style>
