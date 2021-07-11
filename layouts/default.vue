<template lang="pug">
  v-app.main-app(dark)
    menu-drawer
    description-drawer

    v-app-bar(app, fixed, clipped-left)
      v-app-bar-nav-icon(@click.stop="drawer = !drawer")
      v-toolbar-title(v-text="title")

    v-main
      v-overlay(absolute, :opacity="1", :value="isLoading")
        v-progress-circular(indeterminate, color="primary")
      nuxt

    v-footer(app, absolute)
      span &copy; {{ new Date().getFullYear() }}
</template>

<script>
  import { mapActions } from 'vuex'
  import loadingMixins from '@/mixins/loading'
  import MenuDrawer from '@/components/Drawer/Menu'
  import DescriptionDrawer from '@/components/Drawer/Description'

  export default {
    components: { MenuDrawer, DescriptionDrawer },

    mixins: [loadingMixins],

    data () {
      return {
        title: 'TODO LIST'
      }
    },

    mounted () {
      this.updateHook()

      setTimeout(() => {
        this.endLoading()
      }, 1000)
    },

    methods: {
      ...mapActions({
        updateHook: 'hook/updateHook'
      })
    }
  }
</script>
