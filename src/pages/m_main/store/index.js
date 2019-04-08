import Vue from "vue"
import Vuex from "vuex"
import Global from "./global"

Vue.use(Vuex)

let modules = {
}

const csPageModules = require.context("@pages/m_main/store/ms_page", true, /\.js$/)
if (csPageModules && csPageModules.keys().length > 0) {
    csPageModules.keys().forEach((modulesPath) => {
        const modulesname = modulesPath.replace(/(\.\/)|(\.js$)/g, "")
        modules[modulesname] = csPageModules(modulesPath).default
    })
}

export default () => new Vuex.Store({
    ...Global,
    modules: {
        ...modules
    }
})
