<!--
 * @Date: 2024-06-24 19:23:51
 * @Author: Q9K
 * @Description: 登录表单组件
-->

<template>
  <div>
    <Card class="mx-auto max-w-sm">
      <CardHeader>
        <CardTitle class="text-2xl"> Login </CardTitle>
        <CardDescription> Enter your email below to login to your account </CardDescription>
      </CardHeader>
      <CardContent>
        <div class="grid gap-4">
          <div class="grid gap-2">
            <Label for="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="xxx@example.com"
              required
              v-model="user_email"
            />
          </div>
          <div class="grid gap-2">
            <div class="flex items-center">
              <Label for="password">Password</Label>
              <!-- <a href="#" class="ml-auto inline-block text-sm underline"> Forgot your password? </a> -->
            </div>
            <Input id="password" type="password" required v-model="password" />
          </div>
          <Button type="submit" class="w-full" @click="myLogin()"> Login </Button>
        </div>
        <div class="mt-4 text-center text-sm">
          Don't have an account?
          <a @click="goToRegister()" class="underline">Sign up</a>
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
import { useRouter } from 'vue-router'
import login from '@/utils/login'
import { ref } from 'vue'
const router = useRouter()

const user_email = ref('')
const password = ref('')
const goToRegister = () => {
  router.push('/sos/register')
}
const myLogin = () => {
  const res = login(user_email.value, password.value)
  if (res === true) {
    router.push('/')
  }
}
</script>
