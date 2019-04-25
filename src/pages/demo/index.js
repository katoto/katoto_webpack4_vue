import Vue from "vue"
import index from "./views/index.vue"

// use 组件
import "./components/theme-chalk/index.css"
import Alert from "./components/alert"

console.log(Alert)
Vue.use(Alert)

// 初始化与公共样式
require("@/styles/lib-reset.css")

new Vue({
    el: "#app",
    template: "<index />",
    components: {
        index
    }
})
