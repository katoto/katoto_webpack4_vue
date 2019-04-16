// Login page
import Vue from "vue"
import index from "./views/index.vue"
import shareLanguage from "@pack/share"
import simpleAjax from "@plugins/simpleAjax"

import Toast from "@/components/toast/toast.js"

import {
    cookie
} from "@common/util"

Vue.prototype.$toast = Toast
window.$toast = Toast

// 初始化与公共样式
require("@/styles/lib-reset.css")
require("@/styles/lib-public.less")

// test  注入的是www.madcrickets.com/
// cookie.set("appck", encodeURIComponent("MTAwMTU1MjNiNGU5M2QyNTY5MzNlNTMyMTUxYWU5ZDViZTBhNDUyNA==") )
cookie.set("language", "en" )

let appLanguage = cookie.get("language") || "en"
if (appLanguage === "en" || appLanguage === "english") {
    localStorage.setItem("lang", "en")
} else {
    localStorage.setItem("lang", "hi")
}

// 引入语言包
require("@language").use(Vue, [shareLanguage])
let ck = decodeURIComponent(window._.appck)
let language = decodeURIComponent(window._._lang)

if (!ck) {
    window.$toast({
        content: "请在app中打开"
    })
}
console.log("==========")
console.log(ck)
console.log(language)
console.log("==========")

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
