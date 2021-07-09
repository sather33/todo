<template lang="pug">
  v-dialog(:value="isOpen", persistent, max-width="350")
    v-card.dialog-card
      v-form(@submit.prevent="handleCreate")
        v-card-title Create New Group
        v-card-text
          v-text-field.create-group(v-model="categoryLabel", solo, light, :messages="messages")
        v-card-actions
          v-btn(color="grey darken-1", @click="handleClose") Cancel
          v-btn(color="green darken-1", type="submit") Submit
</template>

<script>
  import { mapActions } from 'vuex'
  import { v4 as uuidv4 } from 'uuid'

  export default {
    props: {
      isOpen: {
        type: Boolean,
        default: false
      }
    },

    data () {
      return {
        categoryLabel: '',
        messages: ''
      }
    },

    watch: {
      categoryLabel () {
        if (!this.categoryLabel) {
          return
        }

        this.cleanMessage()
      }
    },

    methods: {
      ...mapActions({
        addCategory: 'category/addCategory'
      }),
      handleClose () {
        this.$emit('update:isOpen', false)
        this.cleanMessage()
        this.categoryLabel = ''
      },
      handleCreate () {
        if (!this.categoryLabel) {
          return this.emptyMessage()
        }

        this.addCategory({
          id: uuidv4(),
          label: this.categoryLabel
        })
        this.handleClose()
      },
      emptyMessage () {
        this.messages = 'Please input category label.'
      },
      cleanMessage () {
        this.messages = ''
      }
    }
  }
</script>

<style lang="scss" scoped>
.dialog-card {
  &::v-deep {
    .v-messages__message {
      color: $red;
      font-size: 1rem;
    }
  }
}
</style>
