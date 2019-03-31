// store 全局公共
const state = {
    testCommon: '1234'
}

const mutations = {
    settestCommon(state, data) {
        state.testCommon = data
    }
}

const actions = {
}

const getters = {
}

export default {
    state,
    mutations,
    actions,
    getters
}