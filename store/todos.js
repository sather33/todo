import build from '~/libs/store/build'
import crud from '~/libs/store/crud'

const transList = (item, index) => ({
  ...item,
  index
})

export default build(crud(transList), {
  getters: {
    listGroupById (state) {
      return state.list.reduce((carry, item, index) => {
        carry[item.id] = {
          index,
          ...item
        }

        return carry
      }, {})
    },
    showDescription (state) {
      return !!Object.keys(state.data).length
    }
  },
  mutations: {
    completeTodo (state, index) {
      state.list[index].isCompleted = true
    },
    recoverTodo (state, index) {
      state.list[index].isCompleted = false
    },
    removeTodo (state, index) {
      state.list.splice(index, 1)
    }
  },
  actions: {
    completeTodo ({ commit }, index) {
      commit('completeTodo', index)
    },
    recoverTodo ({ commit }, index) {
      commit('recoverTodo', index)
    },
    createTodo ({ commit }, todo) {
      commit('appendToList', todo)
    },
    removeTodo ({ commit }, index) {
      commit('removeTodo', index)
    },
    setData ({ commit }, todo) {
      commit('setData', todo)
    }
  }
})
