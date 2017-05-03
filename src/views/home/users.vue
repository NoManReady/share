<template>
  <div class="home-users">
    <h1 class="tit">User Table</h1>
    <i-table border :columns="columns" :data="users" height="400"></i-table>
    <Page show-total show-elevator show-sizer class-name="pager" 
    :total="total" 
    @on-change="onChange" 
    @on-page-size-change="onPageSizeChange"></Page>
  </div>
</template>
<script>
import Api from '@/api'
const userColumn = [{
  type: 'index',
  width: 60,
  align: 'center'
}, {
  title: '日期',
  key: 'date',
  sortable: true
},
{
  title: '姓名',
  key: 'name'
},
{
  title: '年龄',
  key: 'age',
  sortable: true
},
{
  title: '地址',
  key: 'address'
},
{
  title: '简介',
  key: 'desc'
}]
export default {
  name: "homeUers",
  data() {
    return {
      columns: Object.freeze(userColumn),
      users: Object.freeze([]),
      total: 0,
      pageSize: 20,
      pageIndex: 1
    }
  },
  created(){
    this.getUsers()
  },
  // beforeRouteEnter(to, from, next) {
  //   Api.getUsers({}).then(data => {
  //     next(vm => {
  //       vm.users = Object.freeze(data.users)
  //       vm.total = data.count
  //     })
  //   })
  // },
  methods: {
    getUsers(){
      Api.getUsers({
        pageSize: this.pageSize,
        pageIndex: this.pageIndex
      }).then(data => {
        this.users = Object.freeze(data.users)
        this.total = data.count
      })
    },
    onChange(page) {
      this.pageIndex = page
      this.getUsers()
    },
    onPageSizeChange(size) {
      this.pageSize = size
      this.getUsers()
    }
  }
}
</script>
<style lang="scss" scoped>
.home-users {
  padding: 30px;
  .tit {
    text-align: center;
    color: #222;
    margin-bottom: 20px;
  }
  .pager {
    margin-top: 20px;
  }
}
</style>