<template lang="pug">
  .todo-item
    v-row.check-block(align="center")
      v-checkbox(:input-value="isCompleted", @change="handleCheck")
      .label-block
        .text {{ label }}
    .end-block
      v-icon.delete-icon(@click="handleDelete") mdi-delete
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
        removeTodo: 'todos/removeTodo',
        recoverTodo: 'todos/recoverTodo',
        completeTodo: 'todos/completeTodo'
      }),
      handleCheck (value) {
        if (!value) {
          return this.recoverTodo(this.index)
        }

        this.completeTodo(this.index)
      },
      handleDelete () {
        this.$confirm('Do you really want to delete?').then((res) => {
          if (!res) {
            return
          }
          this.removeTodo(this.index)
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
.todo-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
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

  .delete-icon {
    color: $grey-light;
    cursor: pointer;

    &:hover {
      color: $red;
    }
  }
}
</style>
