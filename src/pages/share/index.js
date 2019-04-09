// Login page
import Vue from "vue"
import index from "./views/index.vue"
import shareLanguage from "@pack/share"
import simpleAjax from "@plugins/simpleAjax"
import {
    cookie
} from "@common/util"

// 初始化与公共样式
require("@/styles/lib-reset.css")
require("@/styles/lib-public.less")

localStorage.setItem("lang", "india")

// 引入语言包
require("@language").use(Vue, [shareLanguage])

cookie.set("appck", "MTAwMTUxMDM3ZWFhYjgyNGM1MGM3OWVhYjMzNWM2M2E2MWI1NTlmOA==")

let ck = decodeURIComponent(cookie.get("appck"))
let language = cookie.get("language")

Vue.use(simpleAjax, {
    commonParams: {
        ck,
        language,
        platform: "1",
        version: "2",
        channel: "3"
    }
})

new Vue({
    el: "#app",
    template: "<index />",
    components: {
        index
    }
})
