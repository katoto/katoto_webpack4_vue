// Login page
import Vue from "vue"
import index from "./views/index.vue"
import shareLanguage from "@pack/share"
import simpleAjax from "@plugins/simpleAjax"

import Toast from "@/components/toast/toast.js"

import {
    cookie,
    getURLParams
} from "@common/util"

Vue.prototype.$toast = Toast
window.$toast = Toast

// 初始化与公共样式
require("@/styles/lib-reset.css")
require("@/styles/lib-public.less")

// test  注入的是www.madcrickets.com/
// cookie.set("appck", encodeURIComponent("MTAwMDI3NTI5N2I2MWIyMGIwOTQ1YjRmMTUzYTcwMDZmZTE1YjEy") )
// cookie.set("language", "en" )

let language = cookie.get("language") || "en"

let ck = cookie.get("appck")
if (!ck || ck === "undefined") {
    ck = getURLParams().appck
}
// 引入语言包
require("@language").use(Vue, [shareLanguage])
if (!ck || ck === "undefined") {
    window.$toast({
        content: "please use madsport open this pages"
    })
}

console.log("==========")
console.log(ck)
console.log(language)
console.log("==========")

Vue.use(simpleAjax, {
    commonParams: {
        ck,
        ...cookie.getAll()
    }
})

new Vue({
    el: "#app",
    template: "<index />",
    components: {
        index
    }
})
