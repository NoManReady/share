<template>
  <div class="home-users">
    <Modal v-model="isView" width="500">
      <p slot="header" style="color:#f60;text-align:center">
        <Icon type="person"></Icon>
        <span>{{view&&view.name}}</span>
      </p>
      <div style="text-align:center">
        {{JSON.stringify(view&&view,null,4)}}
      </div>
      <div slot="footer">
        <Button type="success" size="large" long @click="isView=false">关闭</Button>
      </div>
    </Modal>
    <h1 class="tit">User Table</h1>
    <i-table border :columns="columns" :data="users" height="400"></i-table>
    <Page show-total show-elevator show-sizer class-name="pager" :total="total" @on-change="onChange" @on-page-size-change="onPageSizeChange"></Page>
  </div>
</template>
<script>
import Api from '@/api'
const userColumn = [{
  type: 'index',
  width: 60,
  align: 'center'
}, {
  title: '姓名',
  key: 'name',
  render(row, col, index) {
    return `<Icon type="person"></Icon> <strong>${row.name}</strong>`
  }
}, {
  title: '日期',
  key: 'date',
  sortable: true
}, {
  title: '状态',
  key: 'status',
  sortable: true,
  filters: [{
    label: '在线',
    value: 1
  }, {
    label: '繁忙',
    value: 2
  }, {
    label: '下线',
    value: 3
  }],
  filterMultiple: false,
  filterMethod(value, row) {
    return row.status === value
  },
  render(row, col, index) {
    let _color = ''
    let _text = ''
    switch (row.status) {
      case 1:
        _color = 'blue'
        _text = '在线'
        break
      case 2:
        _color = 'yellow'
        _text = '繁忙'
        break
      default:
        _text = '下线'
    }
    return _color ? `<tag color="${_color}">${_text}</tag>` : `<tag>${_text}</tag>`
  }
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
}, {
  title: '操作',
  key: 'action',
  align: 'center',
  width: 160,
  render(row, col, index) {
    return `<i-button type="primary" size="small" @click="onView(${index})">查看</i-button>  <i-button type="error" size="small" @click="onDel(${index})">删除</i-button>`
  }
}]
export default {
  name: "homeUers",
  data() {
    return {
      columns: Object.freeze(userColumn),
      users: Object.freeze([]),
      total: 0,
      pageSize: 10,
      pageIndex: 1,
      isView: false,
      view: null
    }
  },
  created() {
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
    getUsers() {
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
    },
    onDel(index) {
      let _item = this.users[index]
      let _self = this
      this.$Modal.confirm({
        content: `确定删除${_item.name}？`,
        title: '警告',
        okValue: '删除',
        cancelValue: '取消',
        onOk: () => {
          this.$Message.info('删除成功')
          _self.getUsers()
        }
      })
    },
    onView(index) {
      let _item = this.users[index]
      this.view = _item
      this.isView = true
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