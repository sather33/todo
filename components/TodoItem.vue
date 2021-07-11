<template lang="pug">
  .todo-item
    v-row.check-block(align="center")
      v-checkbox(:input-value="data.isCompleted", @change="handleCheck")
      .label-block(@click="handleShowDescrition")
        .text {{ data.label }}
    .end-block
      v-icon.delete-icon(@click="handleDelete") mdi-delete
</template>

<script>
  import { mapActions } from 'vuex'

  export default {
    props: {
      data: {
        type: Object,
        default: () => {}
      }
    },

    computed: {
      index () {
        return this.data.index
      }
    },

    mounted () {
      console.log('this.data', this.data)
    },

    methods: {
      ...mapActions({
        setData: 'todos/setData',
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
      },
      handleShowDescrition () {
        this.setData(this.data)
      }
    }
  }
</script>

<style lang="scss" scoped>
.todo-item {
  @include flex(space-between);

  margin-bottom: 6px;
  padding: 4px 24px;
  height: $todo-item-height;
  border-radius: $todo-item-border-radius;
  background-color: $grey-dark;

  &:last-of-type {
    margin-bottom: 0;
  }

  .check-block {
    @include flex(flex-start);

    flex-wrap: nowrap;
  }

  .label-block {
    width: 100%;
    cursor: pointer;
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
