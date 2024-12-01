<script lang="ts" setup>
import { defineComponent } from 'vue'
import { Codemirror } from 'vue-codemirror'
import { javascript } from '@codemirror/lang-javascript'


import { ref } from 'vue';

const code = ref('')
const result = ref('')

const extensions = [javascript()]

const evaluateCode = () => {
  console.clear();
  try {
    result.value = Function(code.value)().toString();
  } catch (err) {
    console.error(err);
  }
};

</script>

<template>
    <div class="flex gap-3">
        <codemirror
            v-model="code"
            placeholder="Code goes here..."
            :style="{ height: '400px', width: '50%' }"
            :autofocus="true"
            :indent-with-tab="true"
            :tab-size="2"
            :extensions="extensions"
            @change="console.log('change', $event)"
            @focus="console.log('focus', $event)"
            @blur="console.log('blur', $event)"
        />
        <codemirror
            v-model="result"
            placeholder="result will be here..."
            :style="{ height: '400px', width: '50%' }"
            :autofocus="true"
            :disabled="true"
            :indent-with-tab="true"
            :tab-size="2"
            :extensions="extensions"
            @change="console.log('change', $event)"
            @focus="console.log('focus', $event)"
            @blur="console.log('blur', $event)"
        />
    </div>
    <div class="mt-3">
        <button :onclick="(e:Event) => evaluateCode()" class="btn btn-active">Выполнить</button>
    </div>
</template>

<style>
</style>