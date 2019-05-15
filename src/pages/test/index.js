import Vue from "vue"
import index from "./views/index.vue"
import simpleAjax from "@plugins/simpleAjax"
import Toast from "@/components/toast/toast.js"
import Language from "@pack/card"
import {
    cookie
} from "@/common/util"

require("@language").use(Vue, [Language])
Vue.prototype.$toast = Toast
window.$toast = Toast
// cookie.set("appck", "MTAwNTQzOWM3YWIwN2UyOTJhMjZiZmIyZWVjOTc1NmIzMGJmZg")

let cookies = cookie.getAll()
cookies.ck = cookies.appck
Vue.use(simpleAjax, {
    commonParams: {
        platform: "android",
        version: "1.0.0",
        channel: "test",
        ...cookies
    }
})

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
