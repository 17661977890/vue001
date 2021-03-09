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
import SourceList from '@/views/system/source/list'
import SourceAdd from '@/views/system/source/add'
import PermissionList from '@/views/system/permission/list'
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
          // 资源管理
          path: '/system/source/add',
          name: 'SourceAdd',
          component: SourceAdd,
        },
        {
          path: '/system/source/list',
          name: 'SourceList',
          component: SourceList,
        },
        {
          // 权限管理
          path: '/system/permission/list',
          name: 'PermissionList',
          component: PermissionList,
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
