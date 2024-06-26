<!--
 * @Date: 2024-06-23 13:28:31
 * @Author: Q9K
 * @Description: 页面右下角的消息box
-->

<template>
    <vue-advanced-chat   
        :current-user-id="currentUserId"
        :rooms="JSON.stringify(rooms)"
        :messages="JSON.stringify(messages)"
        :room-actions="JSON.stringify(roomActions)"
        :messages-loaded="messagesLoaded"
		@send-message="sendMessage($event.detail[0])"
		@fetch-messages="fetchMessages($event.detail[0])"
    />
</template>

<script setup>
import { ref } from 'vue';
import { register } from 'vue-advanced-chat';
register();

const currentUserId = ref("1234");
const rooms = ref([
    {
        roomId: '1',
        roomName: 'Room 1',
        avatar: 'https://66.media.tumblr.com/avatar_c6a8eae4303e_512.pnj',
        users: [
            { _id: '1234', username: 'John Doe' },
            { _id: '4321', username: 'John Snow' }
        ]
    }
]);
const messages = ref([]);
const roomActions = ref([
    { name: 'inviteUser', title: 'Invite User' },
    { name: 'removeUser', title: 'Remove User' },
    { name: 'deleteRoom', title: 'Delete Room' }
]);

const messagesLoaded = ref(false)


</script>

<style scoped>

</style>