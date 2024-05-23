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
        <div class="flex flex-row">
            <div>
                <img src="props.avatarSrc" alt="">
            </div>
            <div class="flex flex-col justify-between">
                <p>{{ props.username }}</p>
                <p>{{ props.rating }}</p>
            </div>
        </div>
        <button class="btn btn-accent w-full">Accent</button>
    </div>
</template>

<style>
</style>