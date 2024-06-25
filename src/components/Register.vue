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
          <Button type="submit" class="w-full" @click="register(data)"> Create an account </Button>
        </div>
        <div class="mt-4 text-center text-sm">
          Already have an account?
          <a @click="this.$router.push('/sos/login')" class="underline"> Sign in </a>
        </div>
      </CardContent>
    </Card>
  </div>
</template>

<script setup>
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import register from '@/utils/register'
import getVerificationCode from '@/utils/getVerificationCode'

import { ref, reactive } from 'vue'
const data = reactive({
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
</script>
