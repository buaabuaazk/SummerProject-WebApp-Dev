<!--
 * @Date: 2024-06-29 11:29:34
 * @Author: Q9K
 * @Description: 显示用户动态的卡片组件
 * @props: tweet_id
-->
<template>
  <div>
    <template v-if="isLoaded">
      <n-card
        embedded
        class="w-fit min-w-[70%] max-h-96 cursor-pointer"
        @click="showModal()"
        size="small"
        header-style="padding: 0.5rem 1rem; margin-bottom: 0;"
      >
        <template #header>
          <div class="flex items-center justify-start my-0">
            <UserAvatar :user_id="data.user_id" :avatar="data.avatar"></UserAvatar>
            <div class="flex flex-col justify-center items-center">
              <div class="px-2">{{ data.username }}</div>
              <div class="text-xs">发布于 {{ data.updated_at }}</div>
            </div>
          </div>
        </template>
        <div class="text-2xl my-1">{{ data.title }}</div>
        <MdPreview v-model="text" />
        <template #action>
          <n-button @click="changleLiked()">点赞</n-button>
          <n-button @click="showModal()">评论</n-button>
          <n-button @click="transferPost()">转发</n-button>
        </template>
      </n-card>
    </template>
    <n-modal
      v-model:show="visible"
      class="w-[600px] min-w-[50%]"
      :bordered="false"
      size="huge"
      role="dialog"
      aria-modal="true"
      preset="card"
    >
      <div>
        <div class="flex items-center">
          <UserAvatar :user_id="data.user_id" :avatar="data.avatar"></UserAvatar>
          <div class="flex flex-col justify-center items-center">
            <div class="px-2">{{ data.username }}</div>
            <div class="text-xs">发布于 {{ data.updated_at }}</div>
          </div>
        </div>
        <MdPreview v-model="data.content"></MdPreview>
        <n-button @click="changleLiked()">点赞</n-button>
        <n-button @click="showModal()">评论</n-button>
        <n-button @click="transferPost()">转发</n-button>
        <t-comment :avatar="currentUser.icon">
          <template #content>
            <div class="form-container">
              <t-textarea v-model="replyData" placeholder="请输入内容" />
              <n-button class="form-submit" @click="submitReply">回复</n-button>
            </div>
          </template>
        </t-comment>
        <t-list :split="true">
          <t-list-item v-for="(item, index) in commentsData" :key="index">
            <template #content>
              <t-comment
                :avatar="item.avatar"
                :author="item.username"
                :datetime="item.created_at.substring(0, 10)"
                :content="item.content"
              >
                <template #actions>
                  <t-space key="thumbUp" :size="6" @click="likeComment(index)">
                    <t-icon name="thumb-up" />
                    <span>{{ item.likes }}</span>
                  </t-space>
                </template>
              </t-comment>
            </template>
          </t-list-item>
        </t-list>
      </div>
    </n-modal>
  </div>
</template>

<script setup>
import axios from '@/utils/request'
import { debug } from '@/config'
import UserAvatar from './UserAvatar.vue'
import useCurrentUserStore from '@/stores/useCurrentUserStore'
import { NotifyPlugin } from 'tdesign-vue-next'
import { useRouter } from 'vue-router'
import { MdPreview } from 'md-editor-v3'
import { useNotification } from 'naive-ui'

import { ref, onMounted, onBeforeMount } from 'vue'

const router = useRouter()
const props = defineProps({
  post_id: {
    type: [Number, String],
    required: true
  }
})

const currentUserStore = useCurrentUserStore()
const currentUser = currentUserStore.currentUser
const notification = useNotification()

const isLoaded = ref(false)
const commentsData = ref([])
const visible = ref(false)
const data = ref({})
const text = ref('')
const replyData = ref('')
const hasLiked = ref(false)

onBeforeMount(async () => {
  const res = await axios.get('/api/tweet/get_tweet_by_id', {
    params: {
      post_id: props.post_id
    }
  })
  debug.log(res)
  data.value = res.data
  data.value.updated_at = data.value.updated_at.substring(0, 10)
  let arr = data.value.content.split('\n')
  if (arr.length > 3) {
    arr = arr.slice(0, 3)
    arr.push('......')
  }
  text.value = arr.join('\n')
})
onMounted(async () => {
  const res = await axios.get('/api/tweet/check_liked', {
    params: {
      post_id: props.post_id
    }
  })
  hasLiked.value = res.data.liked
  debug.log(res.data)
  isLoaded.value = true
})

const submitReply = async () => {
  if (!replyData.value) {
    NotifyPlugin.error({
      title: '回复内容',
      content: '回复内容不能为空',
      duration: 3000
    })
  } else {
    let res = await axios.post('/api/tweet/comment', {
      post_id: props.post_id,
      user_id: currentUser.id,
      content: replyData.value
    })
    const data = res.data
    debug.log(data)
    commentsData.value.unshift(data.comment)
    replyData.value = ''
    notification.success({
      title: '回复成功',
      duration: 3000
    })
  }
}

const changleLiked = async () => {
  let res = await axios.post('/api/tweet/together_like', {
    post_id: props.post_id
  })
  console.log(res.data)
  hasLiked.value = !hasLiked.value
}

const likeComment = async (index) => {
  const comment = commentsData.value[index]
  const comment_id = comment.id
  let res = await axios.post('/api/tweet/like_comment', {
    comment_id
  })
  const data = res.data
  commentsData.value[index].likes = data.likes
}

const transferPost = () => {
  router.push({
    path: '/createPost',
    query: {
      transfer_id: props.post_id
    }
  })
}

const showModal = async () => {
  const res = await axios.get('/api/tweet/get_comments', {
    params: {
      post_id: props.post_id
    }
  })
  commentsData.value = res.data
  visible.value = true
}
</script>

<style lang="scss" scoped>
.form-container {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  .form-submit {
    margin-top: 0.5rem;
  }
}
</style>
