<template lang="pug">
  .todo-item
    .title {{ title }}
</template>

<script>
  export default {
    props: {
      title: {
        type: String,
        default: ''
      }
    }
  }
</script>

<style lang="scss" scoped>
.todo-item {
  height: $todo-item-height;
  border-radius: $todo-item-border-radius;

  .title {
    color: $white;
  }
}
</style>
