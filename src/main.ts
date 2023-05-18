import '@/styles/reset.css'
import '@/styles/index.scss'
import 'uno.css'
import 'virtual:svg-icons-register'

import { createApp } from 'vue'
import App from './App.vue'
import { setupStore } from './store'
import router from './router'

async function setupApp() {
  const app = createApp(App)
  setupStore(app)
  app.use(router).mount('#app')
}

setupApp()
