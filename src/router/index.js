import Vue from 'vue'
import Router from 'vue-router'

// 新建路由要导入文件地址
import Login from '@/views/Login'
import Reg from '@/views/Reg'
import Main from '@/views/Main'
import UserList from '@/views/system/user/list'
import UserAdd from '@/views/system/user/add'
import RoleList from '@/views/system/role/list'
import RoleAdd from '@/views/system/role/add'
import NotFound from '@/views/exception/404'
import home from '@/views/home'

Vue.use(Router)
// 新建页面需要创建对应的路由
export default new Router({
  // 路由模式：默认hash带# 排除#改为history模式
  mode: 'history',
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/Reg',
      name: 'Reg',
      component: Reg
    },
    {
      path: '/main',
      name: 'Main',
      component: Main,
      children: [
        {
          // 用户管理
          path: '/system/user/add',
          name: 'UserAdd',
          component: UserAdd,
        },
        {
          path: '/system/user/list',
          name: 'UserList',
          component: UserList,
          props: true
        },
        {
          // 角色管理
          path: '/system/role/add',
          name: 'RoleAdd',
          component: RoleAdd,
        },
        {
          path: '/system/role/list',
          name: 'RoleList',
          component: RoleList,
        },
        {
          path: '/home',
          name: 'home',
          component: home,
          props: true
        },
        // {
        //   // 重定向
        //   path: '/home',
        //   redirect: '/main'
        // }
    
      ]
    },
    {
      path: '*',
      name: 'NotFound',
      component: NotFound
    }
    
  ]
})
