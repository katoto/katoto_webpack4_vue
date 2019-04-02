//Login page
import Vue from 'vue';
import index from './views/index.vue'

import simpleAjax from '@plugins/simpleAjax'

// 初始化与公共样式
require('@/styles/lib-reset.css')

// 引入语言包
require('@/language').use(Vue)

Vue.use(simpleAjax)

new Vue({
    el: '#app',
    template: '<index />',
    components: { index }
})
