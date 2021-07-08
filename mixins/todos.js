import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters({
      list: 'todos/list'
    }),
    todoList () {
      return this.list.map((item) => {
        if (!item.isCompleted) {
          return item
        }

        return null
      }).filter(i => i)
    },
    completeList () {
      return this.list.map((item) => {
        if (item.isCompleted) {
          return item
        }

        return null
      }).filter(i => i)
    }
  }
}
