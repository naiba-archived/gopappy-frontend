import Vue from 'vue'
import Buefy from 'buefy'
import VueResource from "vue-resource"

import store from './store/store'
import router from './router'
import App from './App.vue';

Vue.use(Buefy);
Vue.use(router);
Vue.use(VueResource);

// Vue.http.options.root = 'http://localhost:3010/api/';
Vue.http.options.root = '/api/';

const app = new Vue({
    el: '#app',
    router,
    store,
    render: h => h(App)
});
