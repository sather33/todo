<template lang="pug">
  .index-page
    client-only
      .main-section
        todo-list
        complete-list
    .footer-section
      v-form(@submit.prevent="handleCrateTodo")
        v-text-field.create-todo(v-model="newTodo", solo, label="Create todo", prepend-icon="mdi-plus")
</template>

<script>
  import { v4 as uuidv4 } from 'uuid'
  import { mapActions } from 'vuex'
  import TodoList from '@/components/TodoList'
  import CompleteList from '@/components/CompleteList'

  export default {
    components: { TodoList, CompleteList },

    data () {
      return {
        newTodo: null
      }
    },

    methods: {
      ...mapActions({
        createTodo: 'todos/createTodo'
      }),
      handleCrateTodo () {
        const data = {
          id: uuidv4(),
          label: this.newTodo,
          description: '',
          isCompleted: false
        }

        this.createTodo(data)
        this.newTodo = null
      }
    }
  }
</script>

<style lang="scss" scoped>
.index-page {
  display: flex;
  flex-direction: column;
  padding: $gap;
  height: 100%;
  max-height: calc(100vh - 64px - 40px);

  .main-section {
    @include hide-scrollbar();

    display: flex;
    flex: 1 1 auto;
    padding-bottom: 1rem;
    height: 100%;
    flex-direction: column;
    overflow-y: scroll;
  }

  .footer-section {
    flex: 0 0 auto;
    height: $todo-item-height;
    background-color: $grey-darker;
    border-radius: $todo-item-border-radius;
  }

  .create-todo {
    &::v-deep .v-input__prepend-outer {
      padding-left: 0.6rem;
      height: 100%;
    }

    &::v-deep .v-input__slot {
      margin-bottom: 0;
      box-shadow: none !important;
    }

    &::v-deep .v-text-field__details {
      display: none;
    }
  }
}
</style>
