<template lang="pug">
  .todo-list(v-if="todoList.length")
    transition-group(name="slide-fade")
      todo-item(
        :key="item.id",
        v-bind="item",
        v-for="item in todoList")
</template>

<script>
  import todosMixins from '@/mixins/todos'
  import TodoItem from '@/components/TodoItem'

  export default {
    components: { TodoItem },
    mixins: [todosMixins]
  }
</script>
