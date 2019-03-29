import Vue from 'vue'
import $x from '@/assets/$x'
import router from '../../router/routerMain.js'
import main from './views/main.vue'
require('@/styles/index.scss');

// window.Vue = Vue

// 通用组件，便于处理
Vue.prototype.$x = Vue.$x = $x;

new Vue({
    el: '#app',
    router,
    render: h => h(main),
});

