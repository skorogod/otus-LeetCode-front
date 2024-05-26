<script lang="ts" setup>
import {defineProps, onBeforeUnmount, onBeforeUpdate, onMounted, ref, watch} from 'vue';
import type {Task} from '@/shared/types/Task'
import TasksFilter from '@/features/TasksFilter/ui/TasksFilter.vue';
import type { Level } from '@/shared/types/Level';
import type { Status } from '@/shared/types/Status';
import type { TaskType } from '@/shared/types/TaskType';
import { useTasksStore } from '@/shared/store/tasksStore';
import { useUserStore } from '@/shared/store/userStore';
import type { TaskFilters } from '@/shared/types/TaskFilters';
import { TaskService } from '@/entities/Task';

const filters = ref<{
    statusId: number,
    typeId: number,
    levelId: number,
    title: string
}>({
    statusId: -1,
    typeId: -1,
    levelId: -1,
    title: ''
})

const tasks = ref<Task[]>([])

const tasksStore = useTasksStore();
const userStore = useUserStore()
const abortController = new AbortController()

const fetchTasks = async(filters?: TaskFilters, signal?: AbortSignal) => {
    try {
        const data = await TaskService.getTasks({filters, signal, token: userStore.token})
        tasks.value = data
    }
    catch (err) {
        alert("Ошибка")
    }
}

onMounted(() => {
    tasksStore.fetchStatuses()
    tasksStore.fetchLevels()
    tasksStore.fetchTaskTypes()
    fetchTasks()
})

onBeforeUnmount(() => {
    abortController.abort()
})

onBeforeUpdate(() => {
    abortController.abort()
})

watch(filters.value, (newValue) => {
    fetchTasks(newValue, abortController.signal)
})

</script>

<template>
<div>
    <TasksFilter 
        :statuses="tasksStore.statuses"
        :levels="tasksStore.levels"
        :types="tasksStore.taskTypes"
        :filters="filters"
        @filters-changed="filters = $event"
    />
    <div class="overflow-x-auto">
        <table class="table table-zebra">
            <!-- head -->
            <thead>
            <tr>
                <th></th>
                <th>Заголовок</th>
                <th>Решение</th>
                <th>Сложность</th>
            </tr>
            </thead>
            <tbody>
            <!-- row 1 -->
            <tr v-for="(task, index) in tasks" :key="index">
                <th>{{index + 1}}</th>
                <td>{{task.title}}</td>
                <td><router-link :to="{name: 'task', params: {id: task.id}}">Перейти</router-link></td>
                <td>{{task.level.title}}</td>
            </tr>
            </tbody>
        </table>
    </div>
</div>
</template>

<style>
</style>