<template>
  <el-menu 
    :default-active="activeIndex"
    class="navbar"
    mode="horizontal"
    @select="handleSelect"
    >
    <div>
      <img class="oem-logo" />
    </div>
    <hamburger class="hamburger-container" :toggleClick="toggleSideBar" :isActive="sidebar.opened"></hamburger>
    <!-- <breadcrumb></breadcrumb> -->
    <router-link to="/liveview">
    <el-menu-item class="menu-top" index="1">
      <i class="el-icon-view"></i>
      <span slot="title">预览</span>
    </el-menu-item>
    </router-link>
    <router-link to="/playback/index">
    <el-menu-item class="menu-top" index="2">
      <i class="el-icon-time"></i>
      <span slot="title">回放</span>
    </el-menu-item>
    </router-link>
    <router-link to="/log/index">
    <el-menu-item class="menu-top" index="3">
      <i class="el-icon-document"></i>
      <span slot="title">日志</span>
    </el-menu-item>
    </router-link>
    <router-link to="/dashboard/index">
    <el-menu-item class="menu-top" index="4">
      <i class="el-icon-setting"></i>
      <span slot="title">配置</span>
    </el-menu-item>
    </router-link>
    <el-menu-item class="menu-right" index="5">
      <i class="el-icon-circle-close-outline"></i>
      {{name}}
      <span slot="title">注销</span>
    </el-menu-item>
    <el-dropdown split-button class="language-container" trigger="click">
      <span class="el-dropdown-link">
        <span slot="title">简体中文</span>
      </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item>简体中文</el-dropdown-item>
        <el-dropdown-item>English</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
    <!-- <el-dropdown class="avatar-container" trigger="click">
      <div class="avatar-wrapper">
        <img class="user-avatar" :src="avatar+'?imageView2/1/w/80/h/80'">
        <i class="el-icon-caret-bottom"></i>
      </div>
      <el-dropdown-menu class="user-dropdown" slot="dropdown">
        <router-link class="inlineBlock" to="/">
          <el-dropdown-item>
            Home
          </el-dropdown-item>
        </router-link>
        <el-dropdown-item divided>
          <span @click="logout" style="display:block;">LogOut</span>
        </el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown> -->
  </el-menu>
</template>

<script>
import { mapGetters } from 'vuex'
// import Breadcrumb from '@/components/Breadcrumb'
import Hamburger from '@/components/Hamburger'

export default {
  props: {
    activeIndex: {
      type: String,
      default: '1'
    }
  },
  components: {
    // Breadcrumb,
    Hamburger
  },
  computed: {
    ...mapGetters([
      'sidebar',
      'name',
      'avatar'
    ])
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath)
      if (key === '5') {
        this.logout()
      }
    },
    toggleSideBar() {
      this.$store.dispatch('ToggleSideBar')
    },
    logout() {
      this.$store.dispatch('LogOut').then(() => {
        location.reload() // 为了重新实例化vue-router对象 避免bug
      })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
$oem-logo-bg: #ffffff;
$oem-logo-src:url(/static/oem_images/titleIcon.png);

.navbar {
  height: 68px;
  line-height: 68px;
  border-radius: 0px !important;
  font-weight: bold;
  .oem-logo {
    width: 180px;
    height: 68px;
    background: /*$oem-logo-bg*/ $oem-logo-src no-repeat center center;
    float: left;
  }
  .menu-top {
    width:120px;
    text-align:center;
  }
  .menu-right {
    width:fit-content;
    text-align:left;
    float: right;
    right: 165px;
  }
  .hamburger-container {
    line-height: 68px;
    height: 68px;
    float: left;
    padding: 0 10px;
  }
  .language-container {
    height: 68px;
    display: inline-block;
    position: absolute;
    right: 35px;
  }
  /* .screenfull {
    position: absolute;
    right: 90px;
    top: 16px;
    color: red;
  }
  .avatar-container {
    height: 68px;
    display: inline-block;
    position: absolute;
    right: 35px;
    .avatar-wrapper {
      cursor: pointer;
      margin-top: 5px;
      position: relative;
      .user-avatar {
        width: 40px;
        height: 40px;
        border-radius: 10px;
      }
      .el-icon-caret-bottom {
        position: absolute;
        right: -20px;
        top: 25px;
        font-size: 12px;
      }
    }
  } */
}
</style>

