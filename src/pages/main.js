import Vue from 'vue'
import $x from '../js/$x'
import router from '../router/routerMain.js'
import main from '../modules/main.vue'
import { initThemeColor } from '../js/changeThemeColor'
require('../css/index.scss');

// 通用组件，便于处理
Vue.prototype.$x = Vue.$x = $x;

initThemeColor()
new Vue({
    el: '#app',
    router,
    render: h => h(main),
});

