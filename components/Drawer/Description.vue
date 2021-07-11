<template lang="pug">
  v-navigation-drawer.description-drawer(:value="showDescription", app, absolute, right, temporary, @input="handleDescription")
    .title {{ data.label }}
    v-form(@submit.prevent="handleUpdateTodo")
      v-textarea(no-resize, label="Description", rows="7", :value="data.description", @input="handleDescriptionChange")
      v-btn(type="submit", color="primary") Save
</template>

<script>
  import { mapGetters, mapActions } from 'vuex'

  export default {
    data () {
      return {
        description: ''
      }
    },

    computed: {
      ...mapGetters({
        data: 'todos/data',
        showDescription: 'todos/showDescription'
      })
    },

    methods: {
      ...mapActions({
        resetData: 'todos/resetData',
        updateTodo: 'todos/updateTodo',
        updateHook: 'hook/updateHook'
      }),
      handleDescription (value) {
        if (value) {
          return
        }

        this.resetData()
      },
      handleDescriptionChange (value) {
        this.description = value
      },
      handleUpdateTodo () {
        if (this.description) {
          const updateData = {
            index: this.data.index,
            data: {
              description: this.description
            }
          }

          this.updateTodo(updateData)
        }

        this.resetData()
        this.updateHook()
      }
    }
  }
</script>

<style lang="scss" scoped>
.description-drawer {
  @include padding-y(px2rem(24));
  @include padding-x(px2rem(16));

  .title {
    margin-bottom: px2rem(24);
  }
}
</style>
