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
          <div class="grid gap-2">
            <Label for="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="m@example.com"
              required
              v-model="data.email"
            />
          </div>
          <div class="grid gap-2">
            <Label for="password">Password</Label>
            <Input id="password" type="password" v-model="data.password" />
          </div>
          <div class="grid gap-2">
            <Label for="password2">Confirm Password</Label>
            <Input
              id="password2"
              type="password"
              v-model="data.password2"
              @keyup="checkPassword(data.password, data.password2)"
            />
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

const checkPassword = (password, password2) => {
  if (password !== password2) {
    debug.log('🚀 ~ file: Register.vue:57 ~ checkPassword ~ password: password != password2')
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
