import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import VueCodemirror from 'vue-codemirror'
import { basicSetup } from 'codemirror'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(VueCodemirror, {
    // optional default global options
    autofocus: true,
    disabled: false,
    indentWithTab: true,
    tabSize: 2,
    placeholder: 'Code goes here...',
    extensions: [basicSetup]
    // ...
  })

app.mount('#app')
