import { createApp } from 'vue'
// vue-router
import router from './router.js'
// pinia
import { createPinia } from 'pinia'

import App from './App.vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'



//建立 Vue 應用程式
const app = createApp(App)
app.use(router) //讓vue應用程式使用vue-router
const pinia = createPinia();
app.use(pinia); //讓vue應用程式使用pinia

app.mount('#app')