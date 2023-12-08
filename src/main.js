import {createApp} from "vue";
import App from "./App.vue";

import PrimeVue from 'primevue/config'; // here
import router from "./router";

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

import Axios from "./axios";

import 'uikit/dist/css/uikit.min.css';
import BookTicket from "../src/components/BookTicket.vue";
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";

import 'uikit';

import axios from 'axios'
import VueAxios from 'vue-axios'

import idsrvAuth from './idsrvAuth'

const vuetify = createVuetify({
    components,
    directives,
})

library.add(faHome, faUser, faUserPlus, faSignInAlt, faSignOutAlt);

idsrvAuth.startup().then(ok => {
    if (ok) {
        Axios.configure();
        const app = createApp(App);
        app.config.globalProperties.$oidc = idsrvAuth
        app.component('font-awesome-icon', FontAwesomeIcon)
            .component('BookTicket', BookTicket)
            .use(router)
            .use(PrimeVue)
            .use(Toast)
            .use(vuetify)
            .use(VueAxios, axios)
            .mount("#app");
    } else {
        console.log('Startup was not ok')
    }
})
