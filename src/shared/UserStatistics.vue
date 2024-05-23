<script setup lang="ts">
import { defineProps } from 'vue';

const props = defineProps<
    {
        views: number,
        solutions: number,
        discuss: number,
        reputation: number,
    }
>()

</script>

<template>
    <div>
        <h2>Статистика пользователя</h2>
        <ul>
            <li class="flex flex-col">
                <div class="flex gap-3">
                    <i class="fa-regular fa-eye"></i>
                    <p>Просмотров</p>
                    <p>{{ props.views }}</p>
                </div>
                <p>За неделю</p>
            </li>
            <li class="flex flex-col">
                <div class="flex gap-3">
                    <i class="fa-regular fa-eye"></i>
                    <p>Решений</p>
                    <p>{{ props.solutions }}</p>
                </div>
                <p>За неделю</p>
            </li>
            <li class="flex flex-col">
                <div class="flex gap-3">
                    <i class="fa-regular fa-eye"></i>
                    <p>Обсуждений</p>
                    <p>{{props.discuss }}</p>
                </div>
                <p>За неделю</p>
            </li>
            <li class="flex flex-col">
                <div class="flex gap-3">
                    <i class="fa-regular fa-eye"></i>
                    <p>Репутация</p>
                    <p>{{ props.reputation }}</p>
                </div>
                <p>За неделю</p>
            </li>
        </ul>
    </div>
</template>

<style>
</style>