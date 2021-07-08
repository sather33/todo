<template lang="pug">
  .complete-list(v-if="completeList.length")
    .title Complete
    todo-item(
      :key="item.id",
      v-bind="item",
      v-for="item in completeList")
</template>

<script>
  import todosMixins from '@/mixins/todos'
  import TodoItem from '@/components/TodoItem'

  export default {
    components: { TodoItem },
    mixins: [todosMixins]
  }
</script>

<style lang="scss" scoped>
.complete-list {
  margin-top: 1rem;
}
</style>
