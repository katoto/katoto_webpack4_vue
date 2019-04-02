// page 下
// import ajax from '~common/ajax'

const state = {
    'homename': '123'
}

const mutations = {
}

const actions = {
    // 首页投注列表
    getHomeBet({ commit }, params = {}) {
        return ajax.get('/home/orders/bet', params)
    }
}

export default { state, mutations, actions, namespaced: true }
