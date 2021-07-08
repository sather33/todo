<template lang="pug">
  v-row(justify="center", align="center")
    v-col(cols=12)
      todo-list
      complete-list
</template>

<script>
  import TodoList from '@/components/TodoList'
  import CompleteList from '@/components/CompleteList'

  export default {
    components: { TodoList, CompleteList }
  }
</script>
