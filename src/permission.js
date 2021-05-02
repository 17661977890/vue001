import router from './router'
import store from './store'
import NProgress from 'nprogress' // Progress 进度条
import 'nprogress/nprogress.css'// Progress 进度条样式
import { Message } from 'element-ui'
import { getToken } from '@/utils/auth' // 验权

const whiteList = ['/login','/reg'] // 不重定向白名单
// 路由钩子函数
router.beforeEach((to, from, next) => {
  NProgress.start()
  if (getToken()) {
    if (to.path === '/login') {
      next({ path: '/' })
      NProgress.done() // if current page is dashboard will not trigger	afterEach hook, so manually handle it
    } else {
      console.log("非登录请求")
      if (store.getters.roles.length === 0) {
        store.dispatch('GetInfo').then(res => { // 拉取用户信息
          console.log("登录用户信息："+JSON.stringify(res))
          const roles = []
          res.roleVoList.forEach(element => {
            roles.push(element.roleCode);
          });
          // 获取路由
          store.dispatch('permission/generateRoutes',roles).then(res=> {
            const accessRoutes =res;
            // dynamically add accessible routes
            router.addRoutes(accessRoutes)
          }).catch((e)=>{
            console.log("获取登录用户权限路由信息失败:"+e)
          })
          
          next()
        }).catch((err) => {
          store.dispatch('FedLogOut').then(() => {
            Message.error(err || 'Verification failed, please login again')
            next({ path: '/' })
          })
        })
      } else {
        next()
      }
    }
  } else {
    // 前端调试 不加后端token拦截验证，联调环境放开
    if (whiteList.indexOf(to.path) !== -1) {
      console.log("白名单页面")

    // 测试先把路由都放开
    // const roles = ['admin']
    // // 获取路由
    // store.dispatch('permission/generateRoutes', roles).then(res=> {
    //   const accessRoutes =res;
    //   router.addRoutes(accessRoutes)
    // }).catch({
            
    // })
    
      next()
    } else {
      next('/login')
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  NProgress.done() // 结束Progress
})
