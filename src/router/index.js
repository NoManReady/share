import Vue from 'vue'
import Router from 'vue-router'
import homeRouter from './home'

const Login = r => require(['@/common/Login'], r)
const Home = r => require(['@/common/Home'], r)

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
