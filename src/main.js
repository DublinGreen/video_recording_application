import './assets/main.css'

import { createApp } from 'vue'
// import { BootstrapVue } from 'bootstrap-vue'
import App from './App.vue'
import router from './router'

const app = createApp(App)

// app.use(BootstrapVue)
app.use(router)

app.mount('#app')

mobiscroll.setOptions({
    locale: mobiscroll.localeFr,
    theme: 'ios',
    themeVariant: 'light'
});		