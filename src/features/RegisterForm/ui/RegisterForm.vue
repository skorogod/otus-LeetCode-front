<script setup lang="ts">
import { ref, computed } from 'vue'
import IconEmail from '@/components/icons/IconEmail.vue';
import IconPassword from '@/components/icons/IconPassword.vue';
import AppField from '@/shared/ui/Field.vue'
import * as RegisterService from '../api/RegistreService'
import { useUserStore } from '@/shared/store/userStore';
import router from '@/router';

const form = ref({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
})

const loading = ref(false)
const userStore = useUserStore()
const register = async () => {
    try {
        loading.value = true;
        const data = await RegisterService.register(form.value)
        const { token, ...user } = data;
        userStore.user = user;
        userStore.token = token;
        await router.push({
            name: 'home'
        })
    } catch (eror) {
        alert('Ошибка :(')
    } finally {
        loading.value = false
    }
}

const isFormDisabled = computed(() => {
    return !form.value.username || !form.value.email || !form.value.password || !form.value.confirmPassword || loading.value || form.value.password !== form.value.confirmPassword
})
</script>
<template>
    <div class="h-screen overflow-hidden flex items-center justify-center">
      <div class="card w-96 bg-base-100 shadow-xl">
        <div class="card-body">
          <form @submit.prevent="register" class="grid gap-2">
            <AppField v-model="form.username" placeholder="Username" >
              <template #before>
                <IconEmail class="w-4 h-4 opacity-70" />
              </template>
            </AppField>
            <AppField v-model="form.email" placeholder="Email" >
              <template #before>
                <IconEmail class="w-4 h-4 opacity-70" />
              </template>
            </AppField>
            <AppField type="password"  v-model="form.password" placeholder="Password" >
              <template #before>
                <IconPassword  class="w-4 h-4 opacity-70" />
              </template>
            </AppField>
            <AppField type="password"  v-model="form.confirmPassword" placeholder="Password" >
              <template #before>
                  <IconPassword  class="w-4 h-4 opacity-70" />
              </template>
            </AppField>
            <p class="text-rose-800" v-if="form.password !== form.confirmPassword">*Пароли не совпадают</p>
            <button :disabled="isFormDisabled" class="btn btn-primary">Отправить</button>
            <p class="mx-auto mt-5"><RouterLink class="underline text-sky-700 hover:text-indigo-900" to="/login">Войти</RouterLink></p>
          </form>
        </div>
      </div>
    </div>
  </template>