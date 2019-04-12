// Login page
import Vue from "vue"
import index from "./views/index.vue"
import mallLanguage from "@pack/mall"
import simpleAjax from "@plugins/simpleAjax"
import VueClipboard from "vue-clipboard2"
import Toast from "@/components/toast/toast.js"
require("@common/flexble")

// 初始化与公共样式
require("@/styles/lib-reset.css")
require("@/styles/lib-public.less")
// 引入语言包
require("@language").use(Vue, [mallLanguage])
Vue.prototype.$toast = Toast

Vue.use(VueClipboard)
Vue.use(simpleAjax, {
    commonParams: {
        platform: "1",
        version: "2",
        channel: "3",
        ck: "OTk5OTM1NmVkMWUyMjczOTNiMmZkNTNiNzBiZjU1M2RjYzMyMjEw"
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
