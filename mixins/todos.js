import { mapGetters, mapState } from 'vuex'

export default {
  computed: {
    ...mapState('todos', ['list']),
    ...mapGetters({
      count: 'hook/count',
      currentCategoryId: 'category/currentCategoryId'
    }),
    todoList () {
      if (this.count < 0) {
        return []
      }

      return this.list.map((item, index) => {
        if (item.category !== this.currentCategoryId) {
          return
        }

        if (item.isCompleted) {
          return
        }

        return { ...item, index }
      }).filter(i => i)
    },
    completeList () {
      if (this.count < 0) {
        return []
      }

      return this.list.map((item, index) => {
        if (item.category !== this.currentCategoryId) {
          return
        }

        if (!item.isCompleted) {
          return
        }

        return { ...item, index }
      }).filter(i => i)
    }
  }
}
