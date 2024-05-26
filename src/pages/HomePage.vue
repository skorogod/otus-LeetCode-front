<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import Filter from '@/shared/Filter.vue'
import { getLevels } from '../api/getLevels'
import { getTasks } from '../api/getTasks'
import { getStatuses } from '../api/getStatuses'
import { getTags } from '../api/getTags'
import type { Ref } from 'vue'

import TasksTable from '@/features/TasksTable/ui/TasksTable.vue'
import { useTasksStore } from '@/shared/store/tasksStore'
const error = ref<null | string>(null)
const loading = ref(false)

const filters = ref<{
  status: string | null,
  level: string | null,
  title: string | null,
  tags: string[]}>
  ({
  status: null,
  level: null,
  title: null,
  tags: []
})

watch(filters.value, () => {
  let query = '';
  Object.entries(filters.value)
                      .forEach(el => {
                        if(el[1] && el[1].length) {
                            let valueStr;
                            if (el[1] instanceof Array) {
                              valueStr = el[1].join(',')
                            }
                            else {
                              valueStr = el[1]
                            }
                            if (query.length) {
                              query += `&${el[0]}=${valueStr}`
                            }
                            else{
                              query += `${el[0]}=${valueStr}`
                            }
                        }
                      });
  
})
  
</script>

<template>
  <div class="flex flex-col gap-3">
    <h1 class="text-center">Главная страница</h1>
    <TasksTable></TasksTable>
  </div>
</template>

<style>

</style>