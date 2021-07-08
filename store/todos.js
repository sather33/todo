export const state = () => ({
  list: []
})

export const getters = {
  list (state) {
    return state.list.map((item, index) => ({
      ...item,
      index
    }))
  },
  listGroupById (state) {
    return state.list.reduce((carry, item, index) => {
      carry[item.id] = {
        index,
        ...item
      }

      return carry
    }, {})
  }
}

export const mutations = {
  setList (state, list) {
    state.list = list
  },
  completeTodo (state, index) {
    state.list[index].isCompleted = true
  },
  recoverTodo (state, index) {
    state.list[index].isCompleted = false
  },
  createTodo (state, todo) {
    state.list.push(todo)
  }
}

export const actions = {
  setList ({ commit }, list) {
    commit('setList', list)
  },
  completeTodo ({ commit }, index) {
    commit('completeTodo', index)
  },
  recoverTodo ({ commit }, index) {
    commit('recoverTodo', index)
  },
  createTodo ({ commit }, todo) {
    commit('createTodo', todo)
  }
}
