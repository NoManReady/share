import Vue from 'vue'
import VueRouter from 'vue-router'

import iView from 'iview'

import App from './App'
import router from './router'
import store from './store'
import filters from './filters'
import directives from './directives'
import plugins from './plugins'
import '@/mock'

import '@/theme/_theme.less'


// 引用iview
Vue.use(iView)
Vue.config.productionTip = process.env.NODE_ENV === 'production'

//引用插件
Vue.use(plugins, {
  lifecircle: false
})
// 注册过滤器
for (let filter in filters) {
  Vue.filter(filter, filters[filter])
}
//注册指令
for (let directive in directives) {
  Vue.directive(directive, directives[directive])
}

/* eslint-disable no-new */
new Vue({
  store,
  router,
  ...App,
}).$mount('#app')
