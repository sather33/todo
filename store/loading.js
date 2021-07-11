import build from '~/libs/store/build'

export default build({
  state: {
    isLoading: true
  },
  getters: {
    isLoading (state) {
      return state.isLoading
    }
  },
  mutations: {
    setIsLoading (state, value) {
      state.isLoading = value
    }
  },
  actions: {
    startLoading ({ commit }) {
      commit('setIsLoading', true)
    },
    endLoading ({ commit }) {
      commit('setIsLoading', false)
    }
  }
})
