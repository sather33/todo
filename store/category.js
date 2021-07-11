import _ from 'lodash'
import build from '~/libs/store/build'
import crud, { removeId } from '~/libs/store/crud'

export default build(crud(), {
  state: {
    currentCategoryId: ''
  },
  getters: {
    currentCategoryId (state) {
      return state.currentCategoryId
    }
  },
  mutations: {
    addCategory (state, category) {
      state.list.push(category)
    },
    setCurrentCategoryId (state, categoryId) {
      state.currentCategoryId = categoryId
    },
    updateCategoryLabel (state, { id, label }) {
      state.list = state.list.map((category) => {
        if (category.id !== id) {
          return category
        }

        return {
          ...category,
          label
        }
      })
    },
    removeCategory (state, id) {
      state.list = removeId(state.list, id)
      if (state.list.length) {
        state.currentCategoryId = state.list[0].id
        return
      }

      state.currentCategoryId = ''
    }
  },
  actions: {
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
    },
    removeCategory ({ commit }, id) {
      commit('removeCategory', id)
    },
    updateCategoryLabel ({ commit }, { id, label }) {
      commit('updateCategoryLabel', { id, label })
    }
  }
})
