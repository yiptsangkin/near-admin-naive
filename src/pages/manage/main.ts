import { createApp } from 'vue'
import { createPinia } from 'pinia'
import i18n from '@colocale/lang'
// @ts-ignore
import mock from '@/custom/mock/index'

import App from './App.vue'
import router from './router'

const pinia = createPinia()
const app = createApp(App)

// @ts-ignore
app.use(mock)
app.use(router)
app.use(pinia)
app.use(i18n.i18n)

app.mount('#app')
