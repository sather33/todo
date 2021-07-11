export const state = () => ({
  count: 0
})

export const getters = {
  count ({ count }) {
    return count
  }
}

export const mutations = {
  updateHook (state) {
    state.count += 1
  }
}

export const actions = {
  updateHook ({ commit }) {
    commit('updateHook')
  }
}
