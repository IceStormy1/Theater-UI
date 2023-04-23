import { createApp } from "vue";
import App from "./App.vue";

import PrimeVue from 'primevue/config'; // here

import router from "./router";

import "primevue/resources/themes/saga-blue/theme.css"; //theme
import "primevue/resources/primevue.min.css"; //core CSS
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';

createApp(App)
    .use(router)
    .use(PrimeVue)
    .mount("#app");
