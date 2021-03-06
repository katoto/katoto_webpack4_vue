// Login page
import Vue from "vue"
import index from "./views/index.vue"
import mallLanguage from "@pack/mall"
import simpleAjax from "@plugins/simpleAjax"
import commonPlugin from "@plugins/common"
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

// cookie.set("appck", "MTAwMDI3NTQ5MDBjODliYWQ4MmVjN2Y2NGI4OWUyYTQ4ZTk1NzE1")

let cookies = cookie.getAll()
cookies.ck = cookies.appck
Vue.use(commonPlugin)
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
