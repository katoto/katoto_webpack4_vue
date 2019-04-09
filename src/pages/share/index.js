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

// localStorage.setItem("lang", "india")
localStorage.setItem("lang", "en")

// 引入语言包
require("@language").use(Vue, [shareLanguage])
let ck = decodeURIComponent(window._.appck)
let language = decodeURIComponent(window._._lang)
console.log(ck)
console.log(language)

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
