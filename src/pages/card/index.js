import Vue from "vue"
import index from "./views/index.vue"
import simpleAjax from "@plugins/simpleAjax"
// use 组件
import Toast from "@/components/toast/toast.js"
import {
    cookie
} from "@/common/util"
Vue.prototype.$toast = Toast
window.$toast = Toast
Vue.use(simpleAjax)

let cookies = cookie.getAll()
cookies.ck = cookies.appck
// 初始化与公共样式
require("@/styles/lib-reset.css")
require("@/styles/lib-public.less")
Vue.use(simpleAjax, {
    commonParams: {
        platform: "android",
        version: "1.0.0",
        channel: "test",
        ...cookies
    }
})
new Vue({
    el: "#app",
    template: "<index />",
    components: {
        index
    }
})
