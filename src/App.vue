<template>
  <div id="app">
    <Loading :loading="loading" />
    <router-view></router-view>
  </div>
</template>

<script>
import Loading from '@/components/Loading2'
import { mapGetters } from 'vuex'
export default {
  name: 'App',
  computed: {
    ...mapGetters(['loading'])
  },
  components: {
    Loading
  }
}

</script>

<style lang="scss">
@import './scss/scroll';
@import './scss/utils';

html,
body {
  overflow: hidden;
}

#app {
  @include absolute;
  min-width: 768px;
}
</style>