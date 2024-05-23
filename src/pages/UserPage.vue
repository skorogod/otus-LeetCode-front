<script lang="ts" setup>
    import { useRoute } from 'vue-router';
    import { ref, watch } from 'vue';
    import { getUser } from '@/api/getUser';
    import UserBadge from './shared/UserBadge.vue';
    import UserStatistics from './shared/UserStatistics.vue';
    import Doughnut from './shared/charts/Doughnut.vue';

    const route = useRoute();
    const loading = ref(false);
    const error = ref<null | string>(null);
    const user = ref<any>(null);

    watch(() => route.params.id, () => fetchUser, { immediate: true });

    async function fetchUser(id: string) {
        error.value = user.value = null;
        loading.value = true;

        try {
            user.value = await getUser(id)
        }
        catch (err) {
            if (err instanceof Error)
                error.value = err.message
        }
    }
</script>

<template>
    <div v-if="user" class="flex gap-6">
        <!--Боковая панель-->
        <aside class="flex flex-col gap-3">
            <!--Инфо о пользователе-->
            <UserBadge
                :username="user.username"
                :avatar-src="user.avatar"
                :rating="user.rating"
            >
            </UserBadge>
            <!--Статистика пользователя-->
           <UserStatistics
                :views="user.statistics.views"
                :solutions="user.statistics.solutions"
                :discuss="user.statistics.discuss"
                :reputation="user.statistics.reputation"
           >
           </UserStatistics>
        </aside>
        <!--Графики-->
        <div>
            <Doughnut
                :id="'user-stat'"
            >
            </Doughnut>
        </div>
    </div>
</template>

<style>

</style>