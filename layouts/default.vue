<template lang="pug">
  v-app(dark)
    v-navigation-drawer(app, fixed, clipped, :mini-variant="miniVariant")
      v-list
        v-list-item(
          exact,
          router,
          :to="item.to",
          :key="item.title",
          v-for="item in items")
          v-list-item-action
            v-icon {{ item.icon }}
          v-list-item-content
            v-list-item-title(v-text="item.title")

    v-app-bar(app, fixed, clipped-left)
      v-btn(icon, @click.stop="handleVariant")
        v-icon mdi-{{ `chevron-${miniVariant ? 'right' : 'left'}` }}
      v-toolbar-title(v-text="title")

    v-main
      nuxt

    v-footer(app, :absolute="!fixed")
      span &copy; {{ new Date().getFullYear() }}
</template>

<script>
  export default {
    data () {
      return {
        fixed: false,
        miniVariant: false,
        title: 'TODO LIST'
      }
    },

    computed: {
      items () {
        return [
          {
            icon: 'mdi-apps',
            title: 'Welcome',
            to: '/'
          }
        ]
      }
    },

    methods: {
      handleVariant () {
        this.miniVariant = !this.miniVariant
      }
    }
  }
</script>
