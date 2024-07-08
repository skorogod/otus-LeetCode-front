<script lang="ts" setup >
import CommentBadge from '@/shared/CommentBadge.vue'
import type {Comment} from '@/shared/types/Comment'
import {onBeforeUnmount, onMounted, ref} from 'vue';
import { CommentService } from '@/entities/Comment';
import { useUserStore } from '@/shared/store/userStore';

const props = defineProps<{
    taskId: number
}>()

const commentText = ref<string>('')

const userStore = useUserStore()
const abortController = new AbortController()
const user = userStore.user

const comments = ref<Comment[]>([])

const fetchComments = async (taskId: number) => {
    try {
        const data = await CommentService.getComments({
            taskId,
            token: userStore.token,
            signal: abortController.signal
        })

        comments.value = data
    }
    catch (err) {
        alert(err)
    }
}

const sendComment = async (taskId: number, userId: number, text: string) => {
    try {
        const comment = await CommentService.addComment({
            taskId,
            userId,
            text,
            token: userStore.token,
        })

        comments.value.push(comment)
    }

    catch (err) {
        alert ("Ошибка")
    }
}

onMounted(() => {
    fetchComments(props.taskId)   
})

onBeforeUnmount(() => {
    abortController.abort()
})

</script>

<template>
<div class="flex flex-col gap-3 p-4 border-solid border-2 border-base-600 rounded">
    <ul class="h-full min-h-16 max-h-32">
        <li v-for="(comment, index) in comments" :key="index">
            <CommentBadge 
                :avatar-src="comment.user.image"
                :username="comment.user.username"
                :text="comment.text"
                :date="comment.date"
            />
        </li>
    </ul>
    <div class="flex flex-row gap-2">
        <input v-model="commentText" type="text" placeholder="Type here" class="input input-bordered w-full max-w-xs" />
        <button v-if="user && user.id"
            :onclick="(e:Event) => sendComment(props.taskId, user?.id as number, commentText)"
            class="btn btn-active"
        >Отправить</button>
    </div>
</div>
</template>

<style>

</style>