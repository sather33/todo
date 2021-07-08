<template lang="pug">
  .untodo-list
    todo-item(
      :key="item.id",
      v-bind="item",
      v-for="item in list")
</template>

<script>
  import TodoItem from '@/components/TodoItem'

  export default {
    components: { TodoItem },
    computed: {
      list () {
        return [
          {
            id: 1,
            label: 'Test'
          },
          {
            id: 2,
            label: 'Test2',
            description: 'test'
          }
        ]
      }
    }
  }
</script>

<style lang="scss" scoped>
.untodo-list {
  padding: $gap;
}
</style>
