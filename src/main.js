import { createApp } from "vue";
import App from "./App.vue";

import PrimeVue from 'primevue/config'; // here

import router from "./router";

import "primevue/resources/themes/saga-blue/theme.css"; //theme
import "primevue/resources/primevue.min.css"; //core CSS
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';

import 'uikit/dist/css/uikit.min.css';

import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";


import 'uikit';

import axios from 'axios'
import VueAxios from 'vue-axios'

createApp(App)
    .use(router)
    .use(PrimeVue)
    .use(Toast)
    .use(VueAxios, axios)
    .mount("#app");
