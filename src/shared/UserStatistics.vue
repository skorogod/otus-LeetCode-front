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
        <h2 class="mb-3">Статистика:</h2>
        <ul>
            <li class="flex flex-row">
                <div class="flex gap-3">
                    <i class="fa-regular fa-eye w-1"></i>
                    <p class="ml-2">Просмотров</p>
                    <p>{{ props.views }}</p>
                </div>
            </li>
            <li class="flex flex-row">
                <div class="flex gap-3">
                    <i class="fa-solid fa-square-check w-1"></i>
                    <p class="ml-2">Решений</p>
                    <p>{{ props.solutions }}</p>
                </div>
            </li>
            <li class="flex flex-row">
                <div class="flex gap-3">
                    <i class="fa-solid fa-comment w-1"></i>
                    <p class="ml-2">Обсуждений</p>
                    <p>{{props.discuss }}</p>
                </div>
            </li>
            <li class="flex flex-row">
                <div class="flex gap-3">
                    <i class="fa-solid fa-star w-1"></i>
                    <p class="ml-2">Репутация</p>
                    <p>{{ props.reputation }}</p>
                </div>
            </li>
        </ul>
    </div>
</template>

<style>
</style>