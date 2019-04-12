// Login page
import Vue from "vue"
import index from "./views/index.vue"
import mallLanguage from "@pack/mall"
import simpleAjax from "@plugins/simpleAjax"
import Toast from "@/components/toast/toast.js"
import {
    cookie
} from "@/common/util"
require("@common/flexble")
// 初始化与公共样式
require("@/styles/lib-reset.css")
require("@/styles/lib-public.less")
// 引入语言包
require("@language").use(Vue, [mallLanguage])
Vue.prototype.$toast = Toast
window.$toast = Toast
let cookies = cookie.getAll()
cookies.appck = decodeURIComponent(cookies.appck)
cookies.ck = cookies.appck
Vue.use(simpleAjax, {
    commonParams: {
        platform: "android",
        version: "1.0.0",
        channel: "test",
        ...cookies
        // ck: "MTAwMTUxMDM3ZWFhYjgyNGM1MGM3OWVhYjMzNWM2M2E2MWI1NTlmOA=="
    }
})
new Vue({
    el: "#app",
    template: "<index />",
    components: {
        index
    }
})
