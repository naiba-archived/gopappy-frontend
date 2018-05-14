import Vue from 'vue'
import Buefy from 'buefy'
import VueResource from "vue-resource"
import 'buefy/lib/buefy.css';

import store from './store/store'
import router from './router'
import App from './App.vue';

Vue.use(Buefy);

Vue.use(router);

Vue.use(VueResource);

const app = new Vue({
    el: '#app',
    router,
    store,
    render: h => h(App)
});
