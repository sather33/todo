<template lang="pug">
  .complete-list(v-if="completeList.length")
    .subtitle Complete
    transition-group(name="slide-fade")
      todo-item(
        :data="item",
        :key="item.id",
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

  .subtitle {
    margin-bottom: 0.5rem;
  }
}
</style>
