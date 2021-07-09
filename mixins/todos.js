import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters({
      list: 'todos/list',
      currentCategoryId: 'category/currentCategoryId'
    }),
    todoList () {
      return this.list.map((item) => {
        if (item.category !== this.currentCategoryId) {
          return
        }

        if (item.isCompleted) {
          return
        }

        return item
      }).filter(i => i)
    },
    completeList () {
      return this.list.map((item) => {
        if (item.category !== this.currentCategoryId) {
          return
        }

        if (!item.isCompleted) {
          return
        }

        return item
      }).filter(i => i)
    }
  }
}
