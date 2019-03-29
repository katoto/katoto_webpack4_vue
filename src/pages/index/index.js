//Login page

import Vue from 'vue';
import login from './views/login.vue'
require('@/styles/index.scss');

new Vue({
    el: '#app',
    template: '<login></login>',
    components: { login }
})
