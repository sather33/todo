import _ from 'lodash'
import build from '~/libs/store/build'
import crud from '~/libs/store/crud'

export default build(crud(), {
  getters: {
    listGroupById ({ list }) {
      return list.reduce((carry, item, index) => {
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
    },
    updateTodo (state, { index, data }) {
      const todo = state.list[index]
      if (!todo) {
        return
      }

      state.list[index] = {
        ...todo,
        ...data
      }
    },
    removeTodosByCategory (state, categoryId) {
      state.list = _.cloneDeep(state.list).filter((item) => {
        if (item.category === categoryId) {
          return false
        }

        return item
      })
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
    updateTodo ({ commit }, { index, data }) {
      commit('updateTodo', { index, data })
    },
    setData ({ commit }, todo) {
      commit('setData', todo)
    },
    removeTodosByCategory ({ commit }, categoryId) {
      commit('removeTodosByCategory', categoryId)
    }
  }
})
