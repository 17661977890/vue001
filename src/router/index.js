import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
// 新建路由要导入文件地址
import Hi from '@/components/Hi'
import Login from '@/views/Login'
import Main from '@/views/Main'
import UserList from '@/views/system/user/list'
import UserAdd from '@/views/system/user/add'
import NotFound from '@/views/exception/404'

Vue.use(Router)
// 新建页面需要创建对应的路由
export default new Router({
  // 路由模式：默认hash带# 排除#改为history模式
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
      component: Main,
      children: [
        {
          // 路由传参 两种形式
          path: '/system/user/add/:id',
          name: 'UserAdd',
          component: UserAdd
        },
        {
          path: '/system/user/list/:id',
          name: 'UserList',
          component: UserList,
          props: true
        },
        {
          // 重定向
          path: '/home',
          redirect: '/main'
        }
    
      ]
    },
    {
      path: '*',
      name: 'NotFound',
      component: NotFound
    }
    
  ]
})
