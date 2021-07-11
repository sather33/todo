import _ from 'lodash'

export default (...mixins) => {
  const store = _.reduce(
    mixins,
    (store, mixin) => {
      return _.reduce(
        mixin,
        (carry, part, key) => {
          return {
            ...carry,
            [key]: {
              ...(carry[key] || {}),
              ...part
            }
          }
        },
        store
      )
    },
    {}
  )

  return {
    ...store,
    state: () => store.state
  }
}
