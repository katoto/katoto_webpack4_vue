import Vue from "vue"
import index from "./views/index.vue"
import simpleAjax from "@plugins/simpleAjax"
// use 组件
import Toast from "@/components/toast/toast.js"
import Language from "@pack/card"
import commonPlugin from "@plugins/common"
import {
    cookie
} from "@/common/util"
require("@/styles/lib-reset.css")
require("@/styles/lib-public.less")
require("@/styles/animate.css")
require("@language").use(Vue, [Language])
Vue.prototype.$toast = Toast
window.$toast = Toast
cookie.set("appck", "MTAwMTg1MTk0N2Y4ZDBmZmYwYWM5ZGVmOTZkMGVhZDMzODA2Yg%3D%3D")

let cookies = cookie.getAll()
cookies.ck = cookies.appck
// 初始化与公共样式
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
