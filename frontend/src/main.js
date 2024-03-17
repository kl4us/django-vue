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

startApp();

// async start function to enable waiting for refresh token call
async function startApp () {
    const app = createApp(App);

    app.use(createPinia());
    app.use(router);

    setupI18n(app)

    axios.defaults.baseURL = import.meta.env.VITE_API_URL;

    // attempt to auto refresh token before startup
    try {
        const authStore = useAuthStore();
        await authStore.handleRefreshToken();     
    } catch {
        // catch error to start app on success or failure
        console.log('error in refreshing token')
    }

    app.mount('#app');
}