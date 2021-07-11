import { mapGetters, mapActions } from 'vuex'

export default {
  computed: {
    ...mapGetters({
      isLoading: 'loading/isLoading'
    })
  },

  methods: {
    ...mapActions({
      startLoading: 'loading/startLoading',
      endLoading: 'loading/endLoading'
    })
  }
}
