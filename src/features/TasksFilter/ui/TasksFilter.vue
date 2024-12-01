<script lang="ts" setup>
import Filter from '@/shared/Filter.vue'
import type { Level } from '@/shared/types/Level';
import type { Status } from '@/shared/types/Status';
import type { TaskType } from '@/shared/types/TaskType';
import {computed, defineProps, watch, ref} from 'vue';

const props = defineProps<
    {
        levels: Level[],
        statuses: Status[],
        types: TaskType[],
        filters: {
            statusId: number,
            levelId: number,
            typeId: number,
            title: string
        }
    }
>()
const emit = defineEmits(['filtersChanged'])

const localFilters = ref(props.filters)

watch(localFilters.value, (newValue) => {
    emit('filtersChanged')
})

</script>

<template>
<Filter>
    <select v-model="localFilters.levelId" class="select select-bordered max-w-xs">
        <option disabled selected value='-1'>Сложость</option>
        <option v-for="(level, index) in props.levels" :key="index" :value="level.id">{{ level.title }}</option>
    </select>
    <select v-model="localFilters.statusId" class="select select-bordered max-w-xs">
        <option disabled value="-1">Статус</option>
        <option v-for="(status, index) in props.statuses" :key="index" :value="status.id">{{ status.title }}</option>
    </select>
    <select v-model="localFilters.typeId" class="select select-bordered max-w-xs">
        <option disabled selected value="-1">Тип</option>
        <option v-for="(type, index) in props.types" :key="index" :value="type.id">{{ type.title }}</option>
    </select>
    <input v-model="localFilters.title" type="text" placeholder="Искать по заголовку" class="input input-bordered w-full max-w-xs" />
</Filter>
</template>

<style>
</style>