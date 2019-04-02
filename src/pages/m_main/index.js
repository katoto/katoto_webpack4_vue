import Vue from 'vue'
import router from '../../router/routerMain.js'
import main from './views/main.vue'
import storeFactory from './store/index'

// 初始化与公共样式
require('@/styles/lib-reset.css')

const store = storeFactory()

// 引入语言包
require('@/language').use(Vue)

const app = new Vue(Object.assign({
    router,
    store
}, main))

app.$mount('#app')

export {
    app,
    router,
    store
}
