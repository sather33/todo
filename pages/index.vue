<template lang="pug">
  .index-page
    client-only
      .title-block
        .title-edit-block
          v-form.edit-form(v-if="isEdit", @submit.prevent="handleUpdateNewCategoryLabel")
            v-text-field(:value="categoryLabel", @input="updateNewCategoryLabel")
            v-btn.edit-save(color="primary", type="submit") Save
          .title(v-else) {{ categoryLabel }}
          v-icon.edit-icon(v-if="!isEdit", @click="isEdit = true") mdi-pencil
        v-btn(color="primary", @click="handleDeleteCategory") Delete
      .main-section
        todo-list
        complete-list
    .footer-section
      v-form(@submit.prevent="handleCreateTodo")
        v-text-field.create-todo(v-model="newTodo", solo, label="Create todo", prepend-icon="mdi-plus")
</template>

<script>
  import _ from 'lodash'
  import { v4 as uuidv4 } from 'uuid'
  import { mapActions, mapGetters } from 'vuex'
  import TodoList from '@/components/TodoList'
  import CompleteList from '@/components/CompleteList'

  export default {
    components: { TodoList, CompleteList },

    data () {
      return {
        newTodo: null,
        newCategoryLabel: null,
        isEdit: false
      }
    },

    computed: {
      ...mapGetters({
        categories: 'category/list',
        currentCategoryId: 'category/currentCategoryId'
      }),
      categoryLabel () {
        return _.get(this.categoryGroupById, `${this.currentCategoryId}.label`, '')
      },
      categoryGroupById () {
        return this.categories.reduce((carry, item, index) => {
          carry[item.id] = {
            index,
            ...item
          }

          return carry
        }, {})
      }
    },

    methods: {
      ...mapActions({
        createTodo: 'todos/createTodo',
        removeTodosByCategory: 'todos/removeTodosByCategory',
        removeCategory: 'category/removeCategory',
        updateCategoryLabel: 'category/updateCategoryLabel'
      }),
      handleCreateTodo () {
        const data = {
          id: uuidv4(),
          label: this.newTodo,
          description: '',
          category: this.currentCategoryId,
          isCompleted: false
        }

        this.createTodo(data)
        this.newTodo = ''
      },
      handleDeleteCategory () {
        this.$confirm('Do you really want to delete "Category"?\nAll the todo will be delete.').then((res) => {
          if (!res) {
            return
          }

          this.removeCategory(this.currentCategoryId)
          this.removeTodosByCategory(this.currentCategoryId)
        })
      },
      updateNewCategoryLabel (value) {
        this.newCategoryLabel = value
      },
      handleUpdateNewCategoryLabel () {
        if (!this.newCategoryLabel) {
          return
        }

        this.updateCategoryLabel({ id: this.currentCategoryId, label: this.newCategoryLabel })
        this.isEdit = false
        this.newCategoryLabel = null
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

  .title-block {
    @include flex(space-between);

    margin-bottom: px2rem(12);
  }

  .title-edit-block {
    @include flex;
  }

  .edit-icon {
    margin-left: px2rem(12);
    cursor: pointer;

    &:hover {
      color: $primary;
    }
  }

  .edit-save {
    margin-left: px2rem(8);
  }
  .edit-form {
    @include flex;
  }
}
</style>
