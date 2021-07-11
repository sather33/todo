import _ from 'lodash'

const normalizeTransform = (transform) => {
  if (typeof transform === 'function') {
    return transform
  }

  return data => data
}

export const removeId = (list, id) => {
  return _.cloneDeep(list).filter((item) => {
    if (item.id === id) {
      return false
    }

    if (item.children) {
      item.children = removeId(item.children, id)
    }

    return item
  })
}

export default (transform) => {
  transform = normalizeTransform(transform)

  return {
    state: {
      list: [],
      data: {}
    },
    mutations: {
      setList (state, list) {
        state.list = list
      },
      setData (state, data) {
        state.data = data
      },
      appendToList (state, list) {
        state.list = state.list.concat(list)
      },
      updateDataToList (state, data) {
        if (!data.id) {
          return
        }

        state.list = state.list.map((item) => {
          if (item.id !== data.id) {
            return item
          }

          return data
        })
      },
      removeDataFromList (state, id) {
        state.list = removeId(state.list, id)
      }
    },
    getters: {
      list ({ list }) {
        return list.map((data, index) => transform(data, index))
      },
      data ({ data }) {
        return transform(data)
      }
    },
    actions: {
      resetList ({ commit }) {
        commit('setList', [])
      },
      resetData ({ commit }) {
        commit('setData', {})
      }
    }
  }
}
