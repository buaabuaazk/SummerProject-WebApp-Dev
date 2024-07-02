<!--
 * @Date: 2024-06-24 19:22:54
 * @Author: Q9K
 * @Description: 注册表单组件
-->
<template>
  <div>
    <Card class="mx-auto max-w-md">
      <CardHeader>
        <CardTitle class="text-xl"> Sign Up </CardTitle>
        <CardDescription> Enter your information to create an account </CardDescription>
      </CardHeader>
      <CardContent>
        <div class="grid gap-4">
          <div class="grid gap-2">
            <Label for="name">User name</Label>
            <Input id="name" placeholder="Max" required v-model="data.name" />
          </div>
          <div class="grid gap-1">
            <label for="email" class="block text-sm font-medium leading-6 text-gray-900"
              >Email</label
            >
            <div class="relative mt-2 rounded-md shadow-sm">
              <input
                type="email"
                name="email"
                id="email"
                :class="[
                  checkEmail(data.email)[1]
                    ? 'text-green-900 ring-green-300 placeholder:text-green-300 focus:ring-green-500'
                    : 'text-red-900 ring-red-300 placeholder:text-red-300 focus:ring-red-500',
                  'px-2 block w-full rounded-md border-0 py-1.5 pr-10  ring-1 ring-inset  focus:ring-2 focus:ring-inset  sm:text-sm sm:leading-6'
                ]"
                placeholder="you@example.com"
                aria-invalid="true"
                aria-describedby="email-error"
                required
                @blur="checkEmail(data.email)"
                v-model="data.email"
              />
              <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                <ExclamationCircleIcon
                  class="h-5 w-5 text-red-500"
                  aria-hidden="true"
                  v-if="!checkEmail(data.email)[1]"
                />
                <CheckCircleIcon v-else class="h-5 w-5 text-green-500" />
              </div>
            </div>
            <p
              :class="[checkEmail(data.email)[1] ? 'text-green-600' : 'text-red-600', 'text-xs']"
              id="email-error"
            >
              {{ checkEmail(data.email)[0] }}
            </p>
          </div>

          <div class="grid gap-1">
            <label for="email" class="block text-sm font-medium leading-6 text-gray-900"
              >Email</label
            >
            <div class="relative mt-2 rounded-md shadow-sm">
              <input
                type="password"
                name="password"
                id="password"
                :class="[
                  checkPassword(data.password)[1]
                    ? 'text-green-900 ring-green-300 placeholder:text-green-300 focus:ring-green-500'
                    : 'text-red-900 ring-red-300 placeholder:text-red-300 focus:ring-red-500',
                  'px-2 block w-full rounded-md border-0 py-1.5 pr-10  ring-1 ring-inset  focus:ring-2 focus:ring-inset  sm:text-sm sm:leading-6'
                ]"
                placeholder="12345678"
                aria-invalid="true"
                aria-describedby="email-error"
                required
                @blur="checkPassword(data.password)"
                v-model="data.password"
              />
              <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                <ExclamationCircleIcon
                  class="h-5 w-5 text-red-500"
                  aria-hidden="true"
                  v-if="!checkPassword(data.password)[1]"
                />
                <CheckCircleIcon v-else class="h-5 w-5 text-green-500" />
              </div>
            </div>
            <p
              :class="[
                checkPassword(data.password)[1] ? 'text-green-600' : 'text-red-600',
                'text-xs'
              ]"
              id="email-error"
            >
              {{ checkPassword(data.password)[0] }}
            </p>
          </div>
          <div class="grid gap-1">
            <Label for="password2">Confirm Password</Label>
            <Input
              id="password2"
              type="password"
              v-model="data.password2"
              @blur="checkPassword2(data.password, data.password2)"
            />
            <p
              :class="[
                checkPassword2(data.password, data.password2)[1]
                  ? 'text-green-600'
                  : 'text-red-600',
                'text-xs'
              ]"
              id="email-error"
            >
              {{ checkPassword2(data.password, data.password2)[0] }}
            </p>
          </div>
          <div class="grid grid-cols-3 gap-4">
            <div class="col-span-2 grid gap-2">
              <Label for="vcode">Verification code</Label>
              <Input id="vcode" type="text" v-model="data.vcode" />
            </div>
            <div class="col-span-1 grid gap-2">
              <Label class="h-4"></Label>
              <Button :disabled="vcodeStatus" @click="getVcode(data.email)">
                {{ !vcodeStatus ? 'Get Code' : remainingTime + ' S' }}
              </Button>
            </div>
          </div>
          <Button class="w-full" @click="myRegister()" @keyup.enter="myRegister()">
            Create an account
          </Button>
        </div>
        <div class="mt-4 text-center text-sm">
          Already have an account?
          <a @click="gotoLogin()" class="underline"> Sign in </a>
        </div>
      </CardContent>
    </Card>
    <AlertDialog>
      <AlertDialogTrigger><div class="hidden" ref="openButton"></div></AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Hello!</AlertDialogTitle>
          <AlertDialogDescription> 请填写你的兴趣方向： </AlertDialogDescription>
        </AlertDialogHeader>
        <TagsInput v-model="interests" class="min-h-8">
          <TagsInputItem v-for="(interest, index) in interests" :key="index" :value="interest">
            <TagsInputItemText />
            <TagsInputItemDelete />
          </TagsInputItem>
        </TagsInput>
        <Popover v-model:open="open">
          <PopoverTrigger as-child>
            <Button
              variant="outline"
              role="combobox"
              :aria-expanded="open"
              class="w-[200px] justify-between"
            >
              {{ 'Select interesting...' }}
              <CaretSortIcon class="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent class="w-[200px] p-0">
            <Command>
              <CommandInput class="h-9" placeholder="Search interesting..." />
              <CommandEmpty>没有其他选项.</CommandEmpty>
              <CommandList>
                <CommandGroup>
                  <CommandItem
                    v-for="{ tag_id, name } in filteredInterestList"
                    :key="tag_id"
                    :value="name"
                    @select="
                      (ev) => {
                        if (typeof ev.detail.value === 'string') {
                          console.log(value, ev.detail.value)
                          interests.push(ev.detail.value)
                          interest_ids.push(tag_id)
                        }
                      }
                    "
                  >
                    {{ name }}
                    <CheckIcon
                      :class="cn('ml-auto h-4 w-4', value === name ? 'opacity-100' : 'opacity-0')"
                    />
                  </CommandItem>
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
        <AlertDialogFooter>
          <Button @click="submitInterests()">Submit</Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  </div>
</template>

<script setup>
import { debug } from '@/config'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import register from '@/utils/register'
import getVerificationCode from '@/utils/getVerificationCode'
import { useRouter } from 'vue-router'
import login from '@/utils/login'
import axios from '@/utils/request'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { CaretSortIcon, CheckIcon } from '@radix-icons/vue'
import { ExclamationCircleIcon } from '@heroicons/vue/20/solid'
import { CheckCircleIcon } from '@heroicons/vue/24/outline'

import { cn } from '@/lib/utils'
import {
  TagsInput,
  TagsInputItem,
  TagsInputItemDelete,
  TagsInputItemText
} from '@/components/ui/tags-input'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from '@/components/ui/alert-dialog'
import { CommandEmpty, CommandGroup, CommandItem, CommandList } from '@/components/ui/command'
import { ref, computed, onMounted } from 'vue'
import { useNotification } from 'naive-ui'

const notification = useNotification()
const router = useRouter()
const data = ref({
  name: '',
  email: '',
  password: '',
  password2: '',
  vcode: ''
})

function checkEmail(email) {
  const emailPattern = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/
  let right = false
  let errorMessage = ''

  if (!emailPattern.test(email)) {
    errorMessage = '邮箱格式不正确。'
  } else {
    if (!email.endsWith('@buaa.edu.cn')) {
      errorMessage = '邮箱格式正确，但是本系统只支持北航邮箱注册(以@buaa.edu.cn结尾)'
    } else {
      errorMessage = '邮箱有效。'
      right = true
    }
  }

  return [errorMessage, right]
}

function checkPassword(password) {
  const minLength = 8
  const maxLength = 50
  let right = false
  const specialCharPattern = /[^a-zA-Z0-9]/

  let errorMessage = ''

  if (password.length < minLength) {
    errorMessage = `密码太短，至少需要 ${minLength} 个字符。`
  } else if (password.length > maxLength) {
    errorMessage = `密码太长，最多只能有 ${maxLength} 个字符。`
  } else if (specialCharPattern.test(password)) {
    errorMessage = '密码不能包含特殊字符。'
  } else {
    errorMessage = '密码有效。'
    right = true
  }

  return [errorMessage, right]
}

onMounted(async () => {
  let res = await axios.get('/api/tag')
  const data = res.data
  debug.log('🚀 ~ file: Register.vue:173 ~ onMounted ~ data:', data)
  interestList = data
})
const vcodeStatus = ref(false)
const remainingTime = ref(60)
const value = ref('')
const open = ref(false)

const interests = ref([])
const interest_ids = []
let interestList = []
const filteredInterestList = computed(() =>
  interestList.filter((i) => !interests.value.includes(i.name))
)

const checkPassword2 = (password, password2) => {
  if (!password2) {
    return ['请再次输入密码', false]
  } else if (password !== password2) {
    debug.log('🚀 ~ file: Register.vue:57 ~ checkPassword ~ password: password != password2')
    return ['两次密码不一致', false]
  } else {
    return ['两次密码一致', true]
  }
}
const getVcode = async (email) => {
  debug.log('🚀 ~ file: Register.vue:87 ~ getVcode ~ email:', email)

  await getVerificationCode(email)
  vcodeStatus.value = true
  let timer = setInterval(() => {
    if (remainingTime.value) {
      remainingTime.value--
    } else {
      clearInterval(timer)
    }
  }, 1000)
  setTimeout(() => {
    remainingTime.value = 60
    vcodeStatus.value = false
  }, 60000)
}

const openButton = ref(null)
const myRegister = async () => {
  const res = await register(data.value)
  if (res === true) {
    const res = await login(data.value.email, data.value.password)
    if (res === true) {
      openButton.value.click()
      notification.success({
        title: 'Success',
        content: '注册成功'
      })
    }
  }
  // openButton.value.click()
}

const submitInterests = async () => {
  debug.log('🚀 ~ file: Register.vue:246 ~ submitInterests ~ interest:', interest_ids)
  let res = await axios.patch('/api/user/detail', {
    tag_id: interest_ids
  })

  debug.log('🚀 ~ file: Register.vue:246 ~ submitInterests ~ res:', res.data)
  notification.success({
    title: 'Success',
    content: '兴趣方向提交成功'
  })
  router.push('/')
}
const gotoLogin = () => {
  router.push('/sos/login')
}
</script>
