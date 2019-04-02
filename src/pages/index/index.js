//Login page
import Vue from 'vue';
import index from './views/index.vue'

// 初始化与公共样式
require('@/styles/lib-reset.css')

require('@/language')

new Vue({
    el: '#app',
    template: '<index></index>',
    components: { index }
})
