import _ from 'lodash'

export const state = () => ({
  currentCategoryId: '',
  list: []
})

export const getters = {
  list (state) {
    return state.list
  },
  currentCategoryId (state) {
    return state.currentCategoryId
  }
}

export const mutations = {
  setList (state, list) {
    state.list = list
  },
  addCategory (state, category) {
    state.list.push(category)
  },
  setCurrentCategoryId (state, categoryId) {
    state.currentCategoryId = categoryId
  }
}

export const actions = {
  setList ({ commit }, list) {
    commit('setList', list)
  },
  addCategory ({ commit }, category) {
    commit('addCategory', category)
    commit('setCurrentCategoryId', category.id)
  },
  setCurrentCategoryIdByIndex ({ commit, getters }, index) {
    const id = _.get(getters, `list.${index}.id`, null)

    if (!id) {
      return
    }

    commit('setCurrentCategoryId', id)
  },
  setCurrentCategoryId ({ commit }, categoryId) {
    commit('setCurrentCategoryId', categoryId)
  }
}
