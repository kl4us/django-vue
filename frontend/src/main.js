import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from '@/App.vue'
import router from '@/router'
import axios from 'axios';
import { useAuthStore } from '@/stores/auth.store';

import 'bootstrap/dist/js/bootstrap';
import "bootstrap/dist/css/bootstrap.min.css"
import 'bootstrap-icons/font/bootstrap-icons.css'

import { setupI18n } from './plugins/i18n';

axios.defaults.baseURL = import.meta.env.VITE_API_URL;

const app = createApp(App);
const pinia = createPinia()
app.use(pinia);
setupI18n(app)

const authStore = useAuthStore();
await authStore.handleRefreshToken();    

app.use(router);
app.mount('#app');