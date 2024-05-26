import { defineStore } from 'pinia'
import { ref } from "vue"
import type { Status } from '../types/Status'
import type { TaskType } from '../types/TaskType'
import type { Level } from '../types/Level'
import { useUserStore } from './userStore'
import { TaskTypeService } from '@/entities/TaskType'
import { StatusService } from '@/entities/Status'
import { LevelService } from '@/entities/Level'
import type { TaskFilters } from '../types/TaskFilters'

export const useTasksStore = defineStore('tasksStore', () => {
    const user = useUserStore()
    const statuses = ref<Status[]>([])
    const taskTypes = ref<TaskType[]>([])
    const levels = ref<Level[]>([])

    async function fetchStatuses(signal?: AbortSignal) {
        try {
            const data = await StatusService.getStatuses({token: user.token, signal})
            statuses.value = data;
        }
        catch (err) {
            if (err instanceof Error)
                throw new Error(err.message)
        }
    }

    async function fetchTaskTypes(signal?:AbortSignal) {
        try {
            const data = await TaskTypeService.getTaskTypes({token: user.token, signal})
            taskTypes.value = data;
        }
        catch (err) {
            if (err instanceof Error)
                throw new Error(err.message)
        }
    }

    async function fetchLevels(signal?:AbortSignal) {
        try {
            const data = await LevelService.getLevels({token: user.token, signal})
            levels.value = data;
        }
        catch (err) {
            if (err instanceof Error)
                throw new Error(err.message)
        }
    }

    return (
        {
            statuses,
            levels,
            taskTypes,
            fetchLevels,
            fetchStatuses,
            fetchTaskTypes
        }
    )
})