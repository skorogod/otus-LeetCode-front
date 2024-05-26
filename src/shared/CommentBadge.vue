<script setup lang="ts">
    import {ref, defineProps} from 'vue';
    const props = defineProps<
        {
            avatarSrc: string,
            username: string,
            date: string,
            text: string
        }
    >()
</script>

<template>
    <div class="flex flex-col gap-3 border-solid border-2 border-indigo-600">
        <div class="flex flex-row gap-3">
            <div class="avatar placeholder">
                <div class="bg-neutral text-neutral-content rounded-full w-12">
                  <span class="text-xs">{{Array.from(props.username)[0].toUpperCase()}}</span>
                </div>
            </div>
            <div class="flex flex-col gap-1">
                <div class="flex flex-row justify-between items-center">
                    <p>{{ props.username }}</p>
                    <p>{{ props.date }}</p>
                </div>
            </div>
            <div class="min-w-3.5">
                <p>{{ props.text }}</p>
            </div>
        </div>
    </div>
</template>

<style>
</style>