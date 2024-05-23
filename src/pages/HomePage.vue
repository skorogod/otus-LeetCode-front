<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import Filter from '@/shared/Filter.vue'
import { getLevels } from '../api/getLevels'
import { getTasks } from '../api/getTasks'
import { getStatuses } from '../api/getStatuses'
import { getTags } from '../api/getTags'
import type { Ref } from 'vue'

const tags = ref<any[]>([])
const statuses = ref<any[]>([])
const levels = ref<any[]>([])
const tasks = ref<any[]>([])

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

async function fetchTags() {
  loading.value = true;

  try{
    tags.value = await getTags()
  } catch (err) {
    if (err instanceof Error)
      error.value = err.message;
  } finally {
    loading.value = false;
  }
}

async function fetchLevels() {
  loading.value = true;

  try{
    levels.value = await getLevels()
  } catch (err) {
    if (err instanceof Error)
      error.value = err.message;
  } finally {
    loading.value = false;
  }
}

async function fetchStatuses() {
  loading.value = true;

  try{
    statuses.value = await getStatuses()
  } catch (err) {
    if (err instanceof Error)
      error.value = err.message;
  } finally {
    loading.value = false;
  }
}

async function fetchTasks(query?: string) {
  loading.value = true;

  try{
    tasks.value = await getTasks(query)
  } catch (err) {
    if (err instanceof Error)
      error.value = err.message;
  } finally {
    loading.value = false;
  }
}

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
  fetchTasks(query)
})

onMounted(() => {
  fetchLevels();
  fetchStatuses();
  fetchTags();
})
  
</script>

<template>
  <div>
    <Filter>
      <select class="select select-bordered max-w-xs">
        <option disabled selected>Сложость</option>
        <option v-for="(level, index) in levels" :key="index" value="level.id">{{ level.name }}</option>
      </select>
      <select class="select select-bordered max-w-xs">
        <option disabled selected>Статус</option>
        <option v-for="(status, index) in statuses" :key="index" value="status.id">{{ status.name }}</option>
      </select>
      <details class="dropdown">
        <summary class="btn">Теги</summary>
        <div class="flex flex-col">
          <template v-if="tags.length">
              <input type="text" placeholder="Искать по заголовку" class="input input-bordered max-w-xs" />
              <ul class="flex flex-row gap-6" v-for="(tag, index) in tags" :key="index">
                <li>
                  {{ tag.name }}
                </li>
              </ul>
              <span>Раскрыть</span>
          </template>
        </div>
      </details>

      <input type="text" placeholder="Искать по заголовку" class="input input-bordered w-full max-w-xs" />
    </Filter>

    <div class="overflow-x-auto">
        <table class="table table-zebra">
          <!-- head -->
          <thead>
            <tr>
              <th></th>
              <th>Заголовок</th>
              <th>Теги</th>
              <th>Решение</th>
              <th>Сложность</th>
            </tr>
          </thead>
          <tbody>
            <!-- row 1 -->
            <tr v-for="(task, index) in tasks" :key="index">
              <th>{{index + 1}}</th>
              <td>{{task.title}}</td>
              <td>
                <ul>
                  <li v-for="(tag, index) in task.tags" :key="index">
                    {{tag.name}}
                  </li>
                </ul>
              </td>
              <td>{{task.url}}</td>
              <td>{{task.level}}</td>
            </tr>
          </tbody>
        </table>
      </div>
  </div>
      
</template>

<style>

</style>