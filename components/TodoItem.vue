<template lang="pug">
  .todo-item
    v-row.check-block(align="center")
      v-checkbox(:input-value="isCompleted", @change="handleCheck")
      .label-block
        .text {{ label }}
</template>

<script>
  import { mapActions } from 'vuex'

  export default {
    props: {
      label: {
        type: String,
        default: ''
      },
      isCompleted: {
        type: Boolean,
        default: false
      },
      index: {
        type: Number,
        default: 0
      }
    },

    methods: {
      ...mapActions({
        recoverTodo: 'todos/recoverTodo',
        completeTodo: 'todos/completeTodo'
      }),
      handleCheck (value) {
        if (!value) {
          return this.recoverTodo(this.index)
        }

        this.completeTodo(this.index)
      }
    }
  }
</script>

<style lang="scss" scoped>
.todo-item {
  display: flex;
  align-items: center;
  margin-bottom: 6px;
  padding: 4px 24px;
  height: $todo-item-height;
  border-radius: $todo-item-border-radius;
  background-color: $grey-dark;

  &:last-of-type {
    margin-bottom: 0;
  }

  .text {
    color: $white;
  }
}
</style>
