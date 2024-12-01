<script lang="ts" setup>
import { UserService } from '@/entities/User';
import {useUserStore} from './store/userStore';
import { onMounted, watch } from 'vue';
import { useRoute } from 'vue-router';

const userStore = useUserStore()
const route = useRoute()

const fetchProfile = async () => {
  try {
    const data = await UserService.getProfile(userStore.token);
    console.log(data)
    userStore.user = data;
  }
  catch (err) {
    alert('Ошибка ')
  }
}

onMounted(() => {
  fetchProfile()
})

</script>

<template>
  <div class="navbar  bg-base-300 mb-5 ">
    <div class="navbar-start">
      <div class="dropdown">
        <div tabindex="0" role="button" class="btn btn-ghost lg:hidden">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
        </div>
        <ul tabindex="0" class="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
          <li><router-link :to="{name: 'home'}">Home</router-link></li>
        </ul>
      </div>
      <router-link class="btn btn-ghost text-xl" :to="{name: 'home'}">MyLeetCode</router-link>
    </div>
    <div class="navbar-center hidden lg:flex">
      <ul class="menu menu-horizontal px-1">
        <li><a>Item 1</a></li>
        <li>
          <details>
            <summary>Parent</summary>
            <ul class="p-2">
              <li><a>Submenu 1</a></li>
              <li><a>Submenu 2</a></li>
            </ul>
          </details>
        </li>
        <li><a>Item 3</a></li>
      </ul>
    </div>
    <div class="navbar-end" v-if="userStore.user">
      <router-link :to="{name: 'user', params: {id: userStore.user.id}}">Профиль</router-link>
    </div>
  </div>
</template>
<style>
</style>