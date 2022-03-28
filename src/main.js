import { createApp } from 'vue';
import App from './App.vue';
import router from './router';

// Fontawesome
import { library, dom } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
library.add(fas);
library.add(fab);
library.add(far);
dom.watch();

// Primevue
import PrimeVue from 'primevue/config';
import ToastService from 'primevue/toastservice';
import ConfirmationService from 'primevue/confirmationservice';

createApp(App)
    .use(PrimeVue, { ripple: true })
    .use(ToastService)
    .use(ConfirmationService)
    .use(router)
    .component('font-awesome-icon', FontAwesomeIcon)
    .mount('#app');
