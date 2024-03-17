import { createI18n } from 'vue-i18n';

import en from "@/plugins/i18n/locales/en.json"
import it from "@/plugins/i18n/locales/it.json"   

const i18n = createI18n({
    locale:  import.meta.env.VITE_DEFAULT_LOCALE || 'en',
    fallbackLocale: import.meta.env.VITE_FALLBACK_LOCALE || 'en',
    legacy: false,
    globalInjection: true,
    messages: {
        en, 
        it 
    }
});

export function setupI18n(app) {
    app.use(i18n);
}

export default i18n;