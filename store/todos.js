export const state = () => ({
  list: [
    {
      id: 2323,
      label: 'Test',
      isCompleted: false
    },
    {
      id: 23213213,
      label: 'Test2',
      description: 'test',
      isCompleted: false
    },
    {
      id: 23423432,
      label: 'Test2',
      description: 'test',
      isCompleted: true
    }
  ]
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
  }
}
