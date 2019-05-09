import Vue from "vue"
import index from "./views/index.vue"
import simpleAjax from "@plugins/simpleAjax"
// use 组件
import "./components/theme-chalk/index.css"
import Alert from "./components/alert"

console.log(Alert)
Vue.use(Alert)
Vue.use(simpleAjax)

// 初始化与公共样式
require("@/styles/lib-reset.css")
require("@/styles/lib-public.less")

new Vue({
    el: "#app",
    template: "<index />",
    components: {
        index
    }
})
