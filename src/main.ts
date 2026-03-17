import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'
import VueDatePicker from '@vuepic/vue-datepicker';

// 스타일 imports
import '@vuepic/vue-datepicker/dist/main.css'
import './assets/tailwind.css'
import './assets/global.scss'

const app = createApp(App)

// Pinia 스토어
app.use(createPinia())

// 라우터
app.use(router)

// 데이트피커 컴포넌트
app.component('VueDatePicker', VueDatePicker);

app.mount('#app') 