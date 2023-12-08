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

// Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

const vuetify = createVuetify({
    components,
    directives,
})

import Axios from "./axios";

library.add(faHome, faUser, faUserPlus, faSignInAlt, faSignOutAlt);

import 'uikit/dist/css/uikit.min.css';
import BookTicket from "../src/components/BookTicket.vue";
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";

import 'uikit';

import axios from 'axios'
import VueAxios from 'vue-axios'
import Vuex from "vuex";

import idsrvAuth from './idsrvAuth'

idsrvAuth.startup().then(ok => {
    if (ok) {
        Axios.configure();
        const app = createApp(App);
        app.component('font-awesome-icon', FontAwesomeIcon)
            .component('BookTicket', BookTicket)
            .use(router)
            .use(store)
            .use(PrimeVue)
            .use(Toast)
            .use(Vuex)
            .use(vuetify)
            .use(VueAxios, axios)
            .mount("#app");

        app.config.globalProperties.$oidc = idsrvAuth
    } else {
        console.log('Startup was not ok')
    }
})
