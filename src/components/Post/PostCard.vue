<!--
 * @Date: 2024-06-29 11:29:34
 * @Author: Q9K
 * @Description: 显示用户动态的卡片组件
 * @props: post_id, highlight, searchContent
-->
<template>
  <div>
    <template v-if="isLoaded">
      <n-card
        class="max-w-full cursor-pointer truncate"
        size="small"
        header-style="padding: 0.5rem; margin-bottom: 0;"
        @click="showModal()"
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
        <div class="text-xl font-bold my-1" v-html="data.title"></div>
        <MdPreview v-model="text" />
        <template #action>
          <div class="flex justify-around">
            <n-button @click="showModal()">
              <template #icon>
                <n-icon>
                  <MessageOutlined />
                </n-icon>
              </template>
              评论
            </n-button>
            <n-button @click="changleLiked">
              <template #icon>
                <n-icon>
                  <ThumbUpFilled v-if="hasLiked" />
                  <ThumbUpOffAltFilled v-else />
                </n-icon>
              </template>
              <span>{{ data.likes }}</span>
            </n-button>
            <n-button @click="transferPost()">
              <template #icon>
                <n-icon>
                  <ArrowForward16Regular />
                </n-icon>
              </template>
              转发
            </n-button>
          </div>
        </template>
      </n-card>
    </template>
    <n-modal
      v-model:show="visible"
      class="w-[50rem] min-w-[50%]"
      :bordered="true"
      size="large"
      preset="card"
      title="动态详情"
    >
      <div>
        <div class="flex items-center">
          <UserAvatar
            :user_id="data.user_id"
            :avatar="data.avatar"
            @close-modal="visible = false"
          ></UserAvatar>
          <div class="flex flex-col justify-center items-center">
            <div class="px-2">{{ data.username }}</div>
            <div class="text-xs">发布于 {{ data.updated_at }}</div>
          </div>
        </div>
        <MdPreview v-model="data.content"></MdPreview>
        <div class="flex justify-between my-4">
          <n-button @click="changleLiked">
            <template #icon>
              <n-icon>
                <ThumbUpFilled v-if="hasLiked" />
                <ThumbUpOffAltFilled v-else />
              </n-icon>
            </template>
            <span>{{ data.likes }}</span>
          </n-button>

          <n-button @click="transferPost()">
            <template #icon>
              <n-icon>
                <ArrowForward16Regular />
              </n-icon>
            </template>
            转发
          </n-button>
        </div>
        <t-comment :avatar="currentUser.icon">
          <template #content>
            <div class="flex flex-col items-end">
              <t-textarea v-model="replyData" placeholder="请输入内容" />
              <n-button class="mt-2" @click="submitReply">回复</n-button>
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
import useTokenStore from '@/stores/useTokenStore'
import useCurrentUserStore from '@/stores/useCurrentUserStore'
import { NotifyPlugin } from 'tdesign-vue-next'
import { useRouter } from 'vue-router'
import { MdPreview } from 'md-editor-v3'
import { useNotification } from 'naive-ui'
import { MessageOutlined } from '@vicons/antd'
import { ThumbUpFilled, ThumbUpOffAltFilled } from '@vicons/material'
import { ArrowForward16Regular } from '@vicons/fluent'

import { ref, onMounted, onBeforeMount } from 'vue'

const router = useRouter()
const props = defineProps({
  post_id: {
    type: [Number, String],
    required: true
  },
  highlight: {
    type: Boolean,
    default: false
  },
  searchContent: {
    type: String,
    default: ''
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

function extractImageUrl(markdownText) {
  // 定义正则表达式模式以匹配 Markdown 图片格式
  const pattern = /!\[.*?\]\((.*?)\)/

  // 使用 match 方法找到匹配的路径
  const match = markdownText.match(pattern)

  // 提取并返回图片路径
  return match ? match[1] : null
}
const renderContent = (content) => {
  let arr = content.split('\n')
  if (props.highlight && props.searchContent) {
    let pos = 0
    for (; pos < arr.length; pos++) {
      if (arr[pos].indexOf(props.searchContent) !== -1) {
        break
      }
    }
    arr[pos] = arr[pos].replace(
      props.searchContent,
      `<font color=red>${props.searchContent}</font>`
    )
    // debug.log('pos:', pos, arr[pos])
    if (arr.length > 3) {
      let arr_copy = []
      for (let i = 0; i < arr.length && i < pos; ++i) {
        if (arr[i]) {
          arr_copy.push(arr[i])
          break
        }
      }
      arr_copy.push('......')
      arr_copy.push(arr[pos])
      arr_copy.push('......')
      arr = arr_copy
    }
  } else {
    if (arr.length > 3) {
      arr = arr.slice(0, 3)
      arr.push('......')
    }
  }
  arr = arr.map((item) => {
    if (item.startsWith('![img]') || item.startsWith('![]')) {
      const imgUrl = extractImageUrl(item)
      item = `<img src="${imgUrl}" width="200" />`
    }
    return item
  })
  return arr.join('\n')
}

const renderTitle = (content) => {
  if (props.highlight && props.searchContent) {
    return content.replace(
      props.searchContent,
      `<span style="color: red;">${props.searchContent}</span>`
    )
  } else {
    return content
  }
}

onBeforeMount(async () => {
  const res = await axios.get('/api/tweet/get_tweet_by_id', {
    params: {
      post_id: props.post_id
    }
  })
  debug.log(res)
  data.value = res.data
  data.value.title = renderTitle(data.value.title)
  data.value.updated_at = data.value.updated_at.substring(0, 10)
  text.value = renderContent(data.value.content)
})

const hasLogined = ref(false)
onMounted(async () => {
  const tokenStore = useTokenStore()
  const token = tokenStore.getToken
  if (token) {
    hasLogined.value = true
    const res = await axios.get('/api/tweet/check_liked', {
      params: {
        post_id: props.post_id
      }
    })
    hasLiked.value = res.data.liked
    debug.log(res.data)
  }
  isLoaded.value = true
})

const submitReply = async () => {
  if (hasLogined.value) {
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
  } else {
    notification.error({
      title: '回复失败',
      content: '请先登录',
      duration: 3000
    })
    router.go('/sos/login')
  }
}

const changleLiked = async () => {
  if (hasLogined.value) {
    let res = await axios.post('/api/tweet/together_like', {
      post_id: props.post_id
    })
    console.log(res.data)
    hasLiked.value = !hasLiked.value
    if (hasLiked.value) {
      data.value.likes += 1
    } else {
      data.value.likes -= 1
    }
  } else {
    notification.error({
      title: '点赞失败',
      content: '请先登录',
      duration: 3000
    })
    router.go('/sos/login')
  }
}

const likeComment = async (index) => {
  if (hasLogined.value) {
    const comment = commentsData.value[index]
    const comment_id = comment.id
    let res = await axios.post('/api/tweet/like_comment', {
      comment_id
    })
    const data = res.data
    commentsData.value[index].likes = data.likes
  } else {
    notification.error({
      title: '点赞失败',
      content: '请先登录',
      duration: 3000
    })
    router.go('/sos/login')
  }
}

const transferPost = () => {
  if (hasLogined.value) {
    router.push({
      path: '/createPost',
      query: {
        transfer_id: props.post_id
      }
    })
  } else {
    notification.error({
      title: '转发失败',
      content: '请先登录',
      duration: 3000
    })
    router.go('/sos/login')
  }
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
