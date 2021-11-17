<template lang="pug">
  section
    .info {{ profile }}
</template>

<script>
  import liff from '@line/liff'

  export default {
    data () {
      return {
        profile: null
      }
    },
    computed: {
      liffId () {
        return process.env.LIFF_ID || '1656218294-QrOWy7qy'
      }
    },
    async mounted () {
      await this.initLine()
    },
    methods: {
      // Init Line
      async initLine () {
        try {
          return await liff.init({ liffId: this.liffId }, this.handleLineInitSuccess, this.handleLineInitError)
        } catch (error) {
          console.log('line error', error)
        }
      },
      handleLineInitSuccess (response) {
        this.getProfile()
      },
      handleLineInitError (error) {
        console.log('handleLineInitError', error)
      },
      getProfile () {
        const _this = this
        liff.getProfile().then((profile) => {
          const { userId } = profile
          if (!userId) {
            return
          }

          _this.profile = profile
        })
      }
    }
  }
</script>
