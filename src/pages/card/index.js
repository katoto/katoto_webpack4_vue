import Vue from "vue"
import index from "./views/index.vue"
import simpleAjax from "@plugins/simpleAjax"
// use 组件
import Toast from "@/components/toast/toast.js"
import mallLanguage from "@pack/card"
import commonPlugin from "@plugins/common"
import {
    cookie, copy
} from "@/common/util"
require("@/styles/lib-reset.css")
require("@/styles/lib-public.less")
require("@language").use(Vue, [mallLanguage])
Vue.prototype.$toast = Toast
window.$toast = Toast
cookie.set("appck", "MTAwNTQzOWM3YWIwN2UyOTJhMjZiZmIyZWVjOTc1NmIzMGJmZg==")

let cookies = cookie.getAll()
cookies.ck = cookies.appck
// 初始化与公共样式
copy(cookies.ck)
Vue.use(simpleAjax, {
    commonParams: {
        platform: "android",
        version: "1.0.0",
        channel: "test",
        ...cookies
    }
})
Vue.use(commonPlugin)
new Vue({
    el: "#app",
    template: "<index />",
    components: {
        index
    }
})
