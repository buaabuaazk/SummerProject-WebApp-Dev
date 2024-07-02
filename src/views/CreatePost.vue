<!--
 * @Date: 2024-06-23 19:31:17
 * @Author: Q9K
 * @Description: 用户发布动态
-->
<template>
  <div class="m-10 flex flex-col justify-center items-center">
    <div class="w-9/12">
      <n-input v-model:value="title" placeholder="请输入标题" />
      <MdEditor
        v-model="text"
        @onUploadImg="onUploadImg"
        showToolbarName
        placeholder="Write something..."
        autoDetectCode
      ></MdEditor>
    </div>
    <n-button @click="createPost()" class="my-2">发布动态</n-button>
  </div>
</template>
<script setup>
import 'md-editor-v3/lib/style.css'
import { onMounted, ref } from 'vue'
import axios from '@/utils/request'
import useCurrentUserStore from '@/stores/useCurrentUserStore'
import { useRouter, useRoute } from 'vue-router'
import { baseURL, debug } from '@/config'
import { MdEditor } from 'md-editor-v3'
import { NotifyPlugin } from 'tdesign-vue-next'
import 'md-editor-v3/lib/style.css'
const router = useRouter()
const route = useRoute()
//状态存储信息
const currentUserStore = useCurrentUserStore()
const currentUser = currentUserStore.currentUser

//编辑器内容和标题
const text = ref('')
const title = ref('')

onMounted(async () => {
  debug.log(route.query)
})

const createPost = async () => {
  let content = text.value
  if (route.query.transfer_id) {
    const res = await axios.get('/api/tweet/get_tweet_by_id', {
      params: {
        post_id: route.query.transfer_id
      }
    })
    const data = res.data
    const title = data.title
    let atAuthor = null
    if (import.meta.env.MODE === 'development') {
      atAuthor = `[@${data.username}](${baseURL}/otherInfo/${data.user_id})`
    } else {
      atAuthor = `[@${data.username}](http://10.251.255.229/otherInfo/${data.user_id})`
    }
    let arr = data.content.split('\n')
    if (arr.length > 3) {
      arr = arr.slice(0, 3)
      arr.push('......')
    }
    arr.unshift('###### ' + title)
    arr.unshift(atAuthor)
    for (let i = 0; i < arr.length; i++) {
      arr[i] = '> ' + arr[i]
    }
    content += '\n'
    content += arr.join('\n')
  }

  const res = await axios.post('/api/tweet/publish', {
    title: title.value,
    content,
    user_id: currentUser.user_id
  })

  debug.log(res.data)
  NotifyPlugin.success({
    title: '发布成功',
    duration: 3000
  })
  router.push('/')
}

const onUploadImg = async (files, callback) => {
  const res = await Promise.all(
    files.map((file) => {
      return new Promise((rev, rej) => {
        const form = new FormData()
        form.append('file', file)

        axios
          .post('/api/tweet/upload_pic', form)
          .then((res) => rev(res))
          .catch((error) => rej(error))
      })
    })
  )

  callback(res.map((item) => item.data.url))
}
</script>

<style scoped>
div :deep(ul) {
  list-style-type: disc; /* 圆点 */
  padding-left: 20px; /* 添加左侧内边距 */
}

div :deep(ol) {
  list-style-type: decimal; /* 数字 */
  padding-left: 20px; /* 添加左侧内边距 */
}
</style>
