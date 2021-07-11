<template lang="pug">
  v-navigation-drawer(:value="showDescription", app, absolute, right, temporary, @input="handleDescription")
</template>

<script>
  import { mapGetters, mapActions } from 'vuex'

  export default {
    computed: {
      ...mapGetters({
        showDescription: 'todos/showDescription'
      })
    },

    methods: {
      ...mapActions({
        resetData: 'todos/resetData'
      }),
      handleDescription (value) {
        if (value) {
          return
        }

        this.resetData()
      }
    }
  }
</script>
