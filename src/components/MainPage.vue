<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import Filter from './shared/Filter.vue'
import { getLevels } from '../api/getLevels.ts'
import { getTasks } from '../api/getTasks.ts'
import { getStatuses } from '../api/getStatuses.ts'
import { getLTags } from '../api/getTags.ts'

const tags = ref([])
const statuses = ref([])
const levels = ref([])
const tasks = ref([])

const error = ref(null)
const loading = ref(false)

const filters: Ref<{
  status: string | null,
  level: string | null,
  title: string | null,
  tags: string[]
}> = ref({
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
    error.value = err.toString();
  } finally {
    loading.value = false;
  }
}

async function fetchLevels() {
  loading.value = true;

  try{
    levels.value = await getLevels()
  } catch (err) {
    error.value = err.toString();
  } finally {
    loading.value = false;
  }
}

async function fetchStatuses() {
  loading.value = true;

  try{
    statuses.value = await getStatuses()
  } catch (err) {
    error.value = err.toString();
  } finally {
    loading.value = false;
  }
}

async function fetchTasks(query?: string) {
  loading.value = true;

  try{
    tasks.value = await getTasks(query)
  } catch (err) {
    error.value = err.toString();
  } finally {
    loading.value = false;
  }
}

watch(filters.value, () => {
  let query = '';
  console.log(Object.Entries(filters.value))
  Object.Entries(filters.value)
                      .forEach((key, value) => {
                        if(value.length) {
                            let valueStr = '';
                            if (value instanceof Array) {
                              valueStr = value.join(',')
                            }
                            else {
                              valueStr = value
                            }
                            if (query.length) {
                              query += `&${key}=${valueStr}`
                            }
                            else{
                              query += `${key}=${valueStr}`
                            }
                        }
                      });
  fetchTasks(query)
})
  
</script>

<template>
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
      
</template>

<style>

</style>