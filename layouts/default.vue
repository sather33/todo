<template lang="pug">
  v-app.main-app(dark)
    v-navigation-drawer(v-model="drawer", app, fixed, clipped)
      .navigation-main
        v-list.navigation-top(dense, nav)
          v-list-item-group(:value="selectedItem", @change="hanldeClickCategory")
            v-list-item(
              :key="index",
              v-for="(item, index) in items")
              v-list-item-action
                v-icon {{ item.icon }}
              v-list-item-content
                v-list-item-title(v-text="item.label")
        v-list.navigation-bottom(nav, flat)
          v-list-item-group
            v-list-item.add-group-button(@click="openCreateGroupDialog")
              v-list-item-action
                v-icon mdi-plus
              v-list-item-content
                v-list-item-title Create group

    v-app-bar(app, fixed, clipped-left)
      v-app-bar-nav-icon(@click.stop="drawer = !drawer")
      v-toolbar-title(v-text="title")

    v-main
      nuxt

    v-footer(app, :absolute="!fixed")
      span &copy; {{ new Date().getFullYear() }}

    create-group-dialog(:is-open.sync="isOpen")
</template>

<script>
  import { mapGetters, mapActions } from 'vuex'
  import CreateGroupDialog from '@/components/Dialog/CreateGroupDialog'

  export default {
    components: { CreateGroupDialog },

    data () {
      return {
        fixed: false,
        drawer: true,
        isOpen: false,
        selectedItem: 0,
        title: 'TODO LIST'
      }
    },

    computed: {
      ...mapGetters({
        categories: 'category/list'
      }),
      items () {
        return this.categories.map(category => ({
          icon: 'mdi-apps',
          id: category.id,
          label: category.label
        }))
      }
    },

    mounted () {
      this.updateHook()
    },

    methods: {
      ...mapActions({
        updateHook: 'hook/updateHook',
        setCurrentCategoryIdByIndex: 'category/setCurrentCategoryIdByIndex'
      }),
      handleVariant () {
        this.miniVariant = !this.miniVariant
      },
      hanldeClickCategory (value) {
        this.setCurrentCategoryIdByIndex(value)
      },
      openCreateGroupDialog () {
        this.isOpen = true
      }
    }
  }
</script>

<style lang="scss" scoped>
.main-app {
  .navigation-main {
    display: flex;
    flex-direction: column;
    height: 100%;
  }

  .navigation-top {
    @include hide-scrollbar();

    height: 100%;
    overflow-y: scroll;
  }
}
</style>
