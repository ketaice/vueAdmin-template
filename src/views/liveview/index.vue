<template>
  <div class="liveview-container">
      <div class="liveview-text">Name: {{pageTitle}}</div>
  </div>
</template>

<script>
export default {
  name: 'liveview',
  data() {
    return {
      pageTitle: 'Live View Page.'
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
