import { defineStore } from "pinia"
import { ref } from "vue"
import type { User } from "../types/User"

export const useUserStore =  defineStore('userStore', () => {
    const user = ref<Partial<User> | null>(null)
    const token = ref<string>(localStorage.getItem('userToken') || '')

    return {
        user,
        token
    }
})