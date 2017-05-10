<template>
  <div class="home-index">
    <qTree :menus="menus" @leaf-click="onClick">
      <h1 slot='title'>NoManReady</h1>
    </qTree>
  </div>
</template>
<script>
import Api from '@/api'
import qTree from '@/components/Tree'
export default {
  name: "homeIndex",
  data() {
    return {
      menus: []
    }
  },
  components: {
    qTree
  },
  methods: {
    onClick(menu) {
      this.$Modal.info({
        title: `你点击了${menu.title}`,
        content: JSON.stringify(menu, null, 4)
      })
    }
  },
  beforeRouteEnter(to, from, next) {
    Api.getMenus().then((data) => {
      next(vm => {
        vm.menus = Object.freeze(data.menus)
      })
    })
  }
}
</script>
<style lang="scss" scoped>
.home-index{
  color:red;
}
</style>