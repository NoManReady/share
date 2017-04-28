<template>
  <div class="app-home">
    <div class="banner">
      <div class="banner-logo">
        <img class="logo" src="../assets/logo.png" />
        <a href="javascript:;" class="texture"><span>nomanready</span></a>
      </div>
      <div class="banner-nav">
  
      </div>
    </div>
    <div class="container">
      <div class="nav">
        <iMenu></iMenu>
      </div>
      <div class="main">
        <iCrumb class="main-crumb" :crumbs="crumbs"></iCrumb>
        <div class="main-content">
          <router-view></router-view>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import iMenu from '@/components/Menu'
import iCrumb from '@/components/Crumb'
export default {
  name: 'Home',
  components: {
    iMenu,
    iCrumb
  },
  computed: {
    ...mapGetters(['crumbs'])
  }
}

</script>

<style lang="scss">
@import '../scss/variable';
@import '../scss/mixins';
$bannerHeight:60px;

.banner {
  @extend %clearfix;
  box-shadow: 0 0 2px #787a7f;
  .banner-logo {
    float: left;
    height: $bannerHeight;
    overflow: hidden;
    .logo {
      height: 100%;
      width: auto;
      display: inline-block;
      vertical-align: middle;
      margin: 0 10px;
    }
    .texture {
      color: #8c0776;
      font-size: 16px;
      display: inline-block;
      vertical-align: middle;
    }
  }

  .banner-nav {
    float: right;
  }
}

.container {
  @include absolute(60px);
  .nav {
    position: absolute;
    top: 0;
    width: 170px;
    left: 0;
    bottom: 0;
    background-color: #313540;
    overflow: hidden;
    overflow-y: auto;
  }
  .main {
    position: absolute;
    top: 0;
    left: 170px;
    right: 0;
    bottom: 0;
    .main-crumb {
      height: 42px;
    }
    .main-content {
      @include absolute(42px);
      overflow: hidden;
      overflow-y: auto;
    }
  }
}
</style>