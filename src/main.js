import {createApp} from "vue";
import App from "./App.vue";

import PrimeVue from 'primevue/config'; // here
import router from "./router";
import store from './auth';

import "primevue/resources/themes/saga-blue/theme.css"; //theme
import "primevue/resources/primevue.min.css"; //core CSS
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';
 import {FontAwesomeIcon} from '@fortawesome/vue-fontawesome';
import {library} from '@fortawesome/fontawesome-svg-core';
import {
    faHome,
    faUser,
    faUserPlus,
    faSignInAlt,
    faSignOutAlt
} from '@fortawesome/free-solid-svg-icons';

import './axios';

library.add(faHome, faUser, faUserPlus, faSignInAlt, faSignOutAlt);

createApp(App)
    .component('font-awesome-icon', FontAwesomeIcon)
    .use(router)
    .use(store)
    .use(PrimeVue)
    .mount("#app");
