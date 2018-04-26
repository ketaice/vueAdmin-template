<template>
  <div class="app-wrapper">
    <navbar :active-index="activeIndex"></navbar>
    <div class="main-container">
      <chn-list-sidebar
        :nav-active-index="activeIndex"
        v-on:clickChannel="clickChannel"
        class="sidebar-container"
      ></chn-list-sidebar>
      <app-main ref="main"></app-main>
    </div>
  </div>
</template>

<script>
import { Navbar, ChnListSidebar, AppMain } from '@/views/layout/components'

export default {
  name: 'simpleLayout',
  data() {
    // console.log(this.$route.meta)
    return {
      activeIndex: this.$route.meta.activeIndex
    }
  },
  components: {
    Navbar,
    ChnListSidebar,
    AppMain
  },
  methods: {
    clickChannel: function(id) {
      console.log('Click channel: ' + id)
      // console.log(this.$children)
      // console.log(this.$refs.main.$refs)
      this.$refs.main.$refs.content.$emit('live-play', id)
    }
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