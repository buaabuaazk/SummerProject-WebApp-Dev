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
          <Button type="submit" class="w-full" @click="myRegister()"> Create an account </Button>
        </div>
        <div class="mt-4 text-center text-sm">
          Already have an account?
          <a @click="gotoLogin()" class="underline"> Sign in </a>
        </div>
      </CardContent>
    </Card>
    <Dialog>
      <DialogTrigger as-child>
        <Button variant="outline"> Edit Profile </Button>
      </DialogTrigger>
      <DialogContent class="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <div class="grid gap-4 py-4">
          <div class="grid grid-cols-4 items-center gap-4">
            <Label for="name" class="text-right"> Name </Label>
            <Input id="name" value="Pedro Duarte" class="col-span-3" />
          </div>
          <div class="grid grid-cols-4 items-center gap-4">
            <Label for="username" class="text-right"> Username </Label>
            <Input id="username" value="@peduarte" class="col-span-3" />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit"> Save changes </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  </div>
</template>

<script setup>
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import register from '@/utils/register'
import getVerificationCode from '@/utils/getVerificationCode'
import { useRouter } from 'vue-router'
import login from '@/utils/login'
import axios from '@/utils/request'
import {
  TagsInput,
  TagsInputInput,
  TagsInputItem,
  TagsInputItemDelete,
  TagsInputItemText
} from '@/components/ui/tags-input'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'

import { ref } from 'vue'
const router = useRouter()
const data = ref({
  name: 'q9kkk',
  email: '20374319@buaa.edu.cn',
  password: 'testfor1',
  password2: 'testfor1',
  vcode: '123456'
})

const vcodeStatus = ref(false)
const remainingTime = ref(60)

const checkPassword = (password, password2) => {
  if (password !== password2) {
    console.log('🚀 ~ file: Register.vue:57 ~ checkPassword ~ password: password != password2')
  }
}
const getVcode = (email) => {
  console.log('🚀 ~ file: Register.vue:87 ~ getVcode ~ email:', email)

  getVerificationCode(email)
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

const modal = ref(null)
const modelValue = ref(['Apple', 'Banana'])
const myRegister = () => {
  const res = register(data.value)
  if (res === true) {
    const res = login(data.value.email, data.value.password)
    if (res === true) {
      openModal()
    }
  }
}

const gotoLogin = () => {
  router.push('/sos/login')
}

const interests = ref([])
const submitInterest = async () => {
  // let res = await axios.post('/api/interest', {
  //   interests: interests.value
  // })
  modal.value.showModal()
  router.push('/')
}
const openModal = () => {
  console.log(modal.value)
  modal.value.showModal()
}
</script>
