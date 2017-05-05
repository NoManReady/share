<script>
// functional组件不存在上下文（及独立作用域this），只是一个函数，所有数据经过context获取（在vue-devtool中看不到组件）
export default {
  functional: true,
  name: "simpleTree",
  props: ['menus'],
  render(h, c) {
    // 处理事件，阻止冒泡
    function handlerClick(menu, e) {
      e.stopPropagation()
      if (c.listeners['leaf-click'])
        c.listeners['leaf-click'](menu)
    }
    // 生成树形dom
    function generator(menus, c) {
      let _level = 1
      function iterator(list, level) {
        return list.map(lis => {
          let _innerLevel = level
          let _props = {
            props: {
              pid: lis.pid
            },
            attrs: {
              id: lis.id
            },
            on: {
              click: handlerClick.bind(c.parent, lis)
            },
            key: `${lis.id}-${lis.pid}`
          }
          if (lis.childs && lis.childs.length) {
            return (<li {..._props}>
              <span>{lis.title}</span>
              <ul class={`tree level-${_innerLevel}`}>{iterator(lis.childs, _innerLevel + 1)}</ul>
            </li>)
          } else {
            return (<li {..._props}>
              <span>{lis.title}</span>
            </li>)
          }
        })
      }
      return <ul class={`tree level-${_level}`}>{iterator(menus, _level + 1)}</ul>
    }
    let _menuJSX = generator(c.props.menus, c)
    let _slots = c.slots()
    return (
      <div class="simple-tree">
        {_slots.title ? <h2 class="tree-tit">{_slots.title}</h2> : ''}
        {_menuJSX}
      </div>
    )
  }
}
</script>
<style lang="scss">
.simple-tree {
  .tree-tit {
    color: red;
    margin: 20px 0;
  }
  .tree {
    margin-left: 15px;
    li {
      cursor: pointer;
      &>span:hover {
        color: red;
      }
    }
  } // @for $i from 1 through 10 {
  //   .level-#{$i} {
  //     margin-left: $i*10px;
  //   }
  // }
}
</style>