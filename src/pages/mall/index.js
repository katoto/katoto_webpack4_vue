// Login page
import Vue from "vue"
import index from "./views/index.vue"
import mallLanguage from "@pack/mall"
import simpleAjax from "@plugins/simpleAjax"
import VueClipboard from "vue-clipboard2"
require("@common/flexble")

// 初始化与公共样式
require("@/styles/lib-reset.css")
require("@/styles/lib-public.less")
// 引入语言包
require("@language").use(Vue, [mallLanguage])
Vue.use(VueClipboard)
Vue.use(simpleAjax)

new Vue({
    el: "#app",
    template: "<index />",
    components: {
        index
    }
})
