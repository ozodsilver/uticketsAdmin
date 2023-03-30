import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import naive from 'naive-ui'
import router from '../routes/router.js'
import base from '../src/base.js'




window.base = base

const app = createApp(App);

app.use(naive)
app.use(router)


app.mount('#app')
