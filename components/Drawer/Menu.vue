<template lang="pug">
  v-navigation-drawer.menu-drawer(v-model="drawer", app, fixed, clipped)
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

    create-group-dialog(:is-open.sync="isOpen")
</template>

<script>
  import { mapGetters, mapActions } from 'vuex'
  import loadingMixins from '@/mixins/loading'
  import CreateGroupDialog from '@/components/Dialog/CreateGroupDialog'

  export default {
    components: { CreateGroupDialog },

    mixins: [loadingMixins],

    data () {
      return {
        isOpen: false,
        drawer: true,
        selectedItem: 1
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

    methods: {
      ...mapActions({
        setCurrentCategoryIdByIndex: 'category/setCurrentCategoryIdByIndex'
      }),
      hanldeClickCategory (value) {
        this.startLoading()
        setTimeout(() => {
          this.setCurrentCategoryIdByIndex(value)
        }, 200)

        setTimeout(() => {
          this.endLoading()
        }, 300)
      },
      openCreateGroupDialog () {
        this.isOpen = true
      }
    }
  }
</script>

<style lang="scss" scoped>
.menu-drawer {
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
