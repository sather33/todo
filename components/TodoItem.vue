<template lang="pug">
  .todo-item
    v-row.check-block(align="center")
      v-checkbox(v-model="checked")
      .label-block
        .text {{ label }}
</template>

<script>
  export default {
    props: {
      label: {
        type: String,
        default: ''
      }
    },

    data () {
      return {
        checked: false
      }
    }
  }
</script>

<style lang="scss" scoped>
.todo-item {
  display: flex;
  align-items: center;
  height: $todo-item-height;
  border-radius: $todo-item-border-radius;
  background-color: $grey-dark;
  margin-bottom: 6px;

  &:last-of-type {
    margin-bottom: 0;
  }

  .text {
    color: $white;
  }
  .check-block {
    padding: 4px 12px;
  }
}
</style>
