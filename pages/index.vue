<template lang="pug">
  v-row(justify="center", align="center")
    v-col(cols=12)
      untodo-list
</template>

<script>
  import UntodoList from '@/components/UntodoList'

  export default {
    components: { UntodoList }
  }
</script>
