<script lang="ts" setup>
import { TaskService } from '@/entities/Task';
import CodeEditor from '@/features/CodeEditor/ui/CodeEditor.vue'
import { useUserStore } from '@/shared/store/userStore';
import type { Task } from '@/shared/types/Task';
import { computed, onBeforeUnmount, onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import CommentsList from '@/features/CommentsList/ui/CommentsList.vue';

const route = useRoute()
const taskId = computed(() => parseInt(route.params.id as string, 10))
const userStore = useUserStore()

const task = ref<Task | null>(null)

const abortController = new AbortController()

const fetchTask = async () => {
    try {
        const data = await TaskService.getTask({
            taskId: taskId.value,
            token: userStore.token,
            signal: abortController.signal
        })

        task.value = data
    } catch (err) {
        alert('Ошибка')
    }
}

onMounted(() => {
    fetchTask()
})

onBeforeUnmount(() => abortController.abort())

</script>

<template>
    <div class="flex flex-col gap-3">
        <div v-if="task">
            <h1 class="text-center text-xl">{{ task.title }}</h1>
            <p class="mt-3 p-4 border-solid border-2 border-base-600 rounded">{{task.description}}</p>
        </div>
        <CodeEditor></CodeEditor>
        <div v-if="task">
            <CommentsList :task-id="task.id"></CommentsList>
        </div>
    </div>
</template>

<style>
</style>