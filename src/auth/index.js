import { createApp } from 'vue' // import a function
import App from '../App.vue'
import Vuex from 'vuex';

import { auth } from './auth.module';

// create an instance using the function
const app = createApp(App)
app.use(Vuex)

export default new Vuex.Store({
    modules: {
        auth
    }
});
