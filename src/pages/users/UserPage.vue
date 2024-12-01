<script lang="ts" setup>
import { useRoute } from 'vue-router';
import { ref, watch, computed, onBeforeUnmount } from 'vue';
import { UserService } from '@/entities/User';
import UserBadge from '@/shared/UserBadge.vue';
import UserStatistics from '@/shared/UserStatistics.vue';
import Doughnut from '@/shared/charts/Doughnut.vue';
import { useUserStore } from '@/shared/store/userStore';
import TasksTable from '@/features/TasksTable/ui/TasksTable.vue';
import TasksFilter from '@/features/TasksFilter/ui/TasksFilter.vue'

const route = useRoute();
const loading = ref(false);
const error = ref<null | string>(null);
const user = ref<any>(null);

const userId = computed(() => parseInt(route.params.id as string, 10))
const userStore = useUserStore()

async function fetchUser() {
    error.value = user.value = null;
    loading.value = true;

    try {
        const data = await UserService.getUser(userId.value, userStore.token, abortControler.signal)
        user.value = data;
        console.log(data)
    }
    catch (err) {
        if (err instanceof Error)
            error.value = err.message
    }
    finally {
        loading.value = false;
    }
}

const abortControler = new AbortController()

watch(() => route.params.id, () =>{
    console.log("FETCH USER")
    fetchUser()}, { immediate: true });

onBeforeUnmount(() => {
    abortControler.abort();
})

</script>

<template>
    <div v-if="user" class="flex gap-6">
        <!--Боковая панель-->
        <aside class="flex flex-col gap-3 pr-3 border-r-2 border-indigo-300">
            <!--Инфо о пользователе-->
            <UserBadge
                :username="user.username"
                :avatar-src="user.image"
                :rating="user.rating"
            >
            </UserBadge>
            <!--Статистика пользователя-->
           <UserStatistics
                :views="user.views"
                :solutions="user.solvedTasks.length"
                :discuss="user.discuss"
                :reputation="user.reputation"
           >
           </UserStatistics>
        </aside>
        <div class="w-full flex flex-col gap-6">
            <h1 class="text-center text-2xl">Решенные задачи</h1>
            <TasksTable class="" :tasks="user.solvedTasks"></TasksTable>
        </div>
    </div>
</template>

<style>

</style>