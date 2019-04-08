import Vue from "vue"
import index from "./views/index.vue"
import indexLanguage from "@pack/index"

// 初始化与公共样式
require("@/styles/lib-reset.css")

// 引入语言包
require("@language").use(Vue, [indexLanguage])

new Vue({
    el: "#app",
    template: "<index />",
    components: {
        index 
    }
})
