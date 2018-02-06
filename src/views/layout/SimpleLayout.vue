<template>
  <div class="app-wrapper">
    <navbar :active-index="activeIndex"></navbar>
    <div class="main-container">
      <app-main></app-main>
    </div>
  </div>
</template>

<script>
import { Navbar, AppMain } from '@/views/layout/components'

export default {
  name: 'liveLayout',
  data() {
    console.log(this.$route.meta)
    return {
      activeIndex: this.$route.meta.activeIndex
    }
  },
  components: {
    Navbar,
    AppMain
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
@import "src/styles/mixin.scss";
.app-wrapper {
  @include clearfix;
  position: relative;
  height: 100%;
  width: 100%;
}
</style>