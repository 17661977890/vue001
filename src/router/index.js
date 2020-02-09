import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
// 新建路由要导入文件地址
import Hi from '@/components/Hi'
import Login from '@/views/Login'
import Main from '@/views/Main'

Vue.use(Router)
// 新建页面需要创建对应的路由
export default new Router({
  // 访问地址排除#
  mode: 'history',
  routes: [
    // {
    //   path: '/',
    //   name: 'HelloWorld',
    //   component: HelloWorld
    // },
    // {
    //   path: '/his',
    //   name: 'Hi',
    //   component: Hi
    // },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/main',
      name: 'Main',
      component: Main
    }

  ]
})
