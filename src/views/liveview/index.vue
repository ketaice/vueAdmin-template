<template>
  <div class="liveview-container">
      <div class="liveview-text">Name: {{pageTitle}}</div>
      <div class="liveview-text">Channel: {{channel}}</div>
  </div>
</template>

<script>
export default {
  name: 'liveview',
  data() {
    return {
      pageTitle: 'Live View Page.',
      channel: 1
    }
  },
  mounted() {
    this.$on('play', function(val) {
      this.channel = val
      this.playChannel(val)
    })
  },
  methods: {
    playChannel(data) {
      console.log(data)
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.liveview {
    &-container {
        margin: 30px
    }
    &-text {
        font-size: 60px;
    }
}
</style>
