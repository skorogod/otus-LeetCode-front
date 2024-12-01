<script setup lang="ts">
    import {ref, defineProps} from 'vue';
    const props = defineProps<
        {
            avatarSrc: string,
            username: string
            rating: number
        }
    >()
</script>

<template>
    <div class="flex flex-col gap-3">
        <div class="flex flex-row gap-3">
            <div class="avatar placeholder">
                <div class="bg-neutral text-neutral-content rounded-full w-16">
                  <span class="text-xs">{{Array.from(props.username)[0].toUpperCase()}}</span>
                </div>
            </div>
            <div class="flex flex-col justify-center items-center">
                <p>{{ props.username }}</p>
            </div>
        </div>
    </div>
</template>

<style>
</style>