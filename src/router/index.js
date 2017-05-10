import Vue from 'vue'
import Router from 'vue-router'
import homeRouter from './home'

const Login = r => require(['@/common/Login'], r)
const Home = r => require(['@/common/Home'], r)
// import Login from '@/common/Login'
// import Home from '@/common/Home'

// 去中心化配置
// let router = (r => {
//   console.log(r)
//   return r.keys().map(k => {
//     return r(k).default
//   })
// })(require.context('./', true, /^\.\/modules\/(?!\/)[\s\S]+\/router\.js$/))

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: Login
    }, {
      path: '/home',
      name: 'Home',
      alias: '/topic',
      mate: {
        auth: true
      },
      component: Home,
      children: homeRouter
    }, {
      path: '*',
      name: 'Redirect',
      redirect: '/login'
    }
  ]
})
