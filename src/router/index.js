import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'



/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    noCache: true                if set true, the page will no be cached(default is false)
    affix: true                  if set true, the tag will affix in the tags-view
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path(.*)',
        component: () => import('@/views/redirect/index')
      }
    ]
  },
  {
    path: '/login',
    component: () => import('@/views/Login'),
    hidden: true
  },
  {
    path: '/reg',
    component: () => import('@/views/Reg'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/exception/404'),
    hidden: true
  },
  // {
  //   path: '/401',
  //   component: () => import('@/views/error-page/401'),
  //   hidden: true
  // },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        component: () => import('@/views/dashboard/index'),
        name: 'Dashboard',
        meta: { title: '首页', icon: 'dashboard', affix: true }
      }
    ]
  },
  {
    path: '/documentation',
    component: Layout,
    children: [
      {
        path: 'index',
        component: () => import('@/views/documentation/index'),
        name: 'Documentation',
        meta: { title: '文档', icon: 'documentation', affix: true }
      }
    ]
  }
]

/**
 * asyncRoutes
 * the routes that need to be dynamically loaded based on user roles
 */
export const asyncRoutes = [
  {
    path: '/system',
    component: Layout,
    redirect: '/systemc/user/list',
    name: 'System',
    meta: {
      title: '系统管理',
      icon: 'system'
    },
    children: [
      {
        path: 'UserAdd',
        component: () => import('@/views/system/user/add'),
        name: 'UserAdd',
        hidden: true,
        meta: { title: '添加用户' }
      },
      {
        path: 'UserList',
        component: () => import('@/views/system/user/list'),
        name: 'UserList',
        meta: { title: '用户管理' }
      },
      {
        path: 'RoleAdd',
        component: () => import('@/views/system/role/add'),
        name: 'RoleAdd',
        hidden: true,
        meta: { title: '添加角色' }
      },
      {
        path: 'RoleList',
        component: () => import('@/views/system/role/list'),
        name: 'RoleList',
        meta: { title: '角色管理' }
      },
      {
        path: 'SourceAdd',
        component: () => import('@/views/system/source/add'),
        name: 'SourceAdd',
        hidden: true,
        meta: { title: '新增资源' }
      },
      {
        path: 'SourceList',
        component: () => import('@/views/system/source/list'),
        name: 'SourceList',
        meta: { title: '资源管理' }
      }

    ]
  },{
    path: '/base',
    component: Layout,
    name: 'Goods',
    meta: {
      title: '基础配置',
      icon: 'base-setting'
    },
    children: [
      {
        path: 'CategoryList',
        component: () => import('@/views/base/category/list'),
        name: 'CategoryList',
        meta: { title: '商品类目管理' }
      },
      {
        path: 'ServiceList',
        component: () => import('@/views/base/service/list'),
        name: 'ServiceList',
        meta: { title: '商品服务管理' }
      },
      {
        path: 'TagList',
        component: () => import('@/views/base/tag/list'),
        name: 'TagList',
        meta: { title: '商品标签管理' }
      },
      {
        path: 'BrandList',
        component: () => import('@/views/base/brand/list'),
        name: 'BrandList',
        meta: { title: '商品品牌管理' }
      },
      {
        path: 'PropertyList',
        component: () => import('@/views/base/property/list'),
        name: 'PropertyList',
        meta: { title: '商品属性管理' }
      }

    ]
  },

  
  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
