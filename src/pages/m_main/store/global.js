// 自动获取common 下的state getter mutations actions
const msCommon = require.context('@pages/m_main/store/ms_common', true, /\.js$/)
let common = { state: {}, mutations: {}, getters: {}, actions: {} }
msCommon.keys().forEach(function (commonPath) {
    common = combimeStore(common, msCommon(commonPath).default)
})

function combimeStore(store, newStore) {
    return {
        state: { ...store.state, ...newStore.state },
        mutations: { ...store.mutations, ...newStore.mutations },
        actions: { ...store.actions, ...newStore.actions },
        getters: { ...store.getters, ...newStore.getters }
    }
}

const state = {
    version: '0.1',
    testname: null,
    ...common.state
}

const mutations = {
    setTestname(state, data) {
        state.testname = data
    },
    ...common.mutations
}

const actions = {
    getTestUrl() {

    },
    ...common.actions
}

const getters = {
    ...common.getters
}

export default {
    state,
    mutations,
    actions,
    getters
}