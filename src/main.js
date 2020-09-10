// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
// 路由
import router from './router'
// ElementUI
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// import './styles/element-variables.scss'
// global css
import '@/styles/index.scss'
import '@/permission' // permission control
// 通信
import axios from 'axios'
// 状态管理(sessionStorage)
import Vuex from 'vuex'
import store from './store'
import { getToken, setToken, removeToken } from '@/utils/auth'
Vue.prototype.axios=axios
Vue.config.productionTip = false

Vue.use(ElementUI);
Vue.use(Vuex);

// 路由钩子函数 -- promission js文件操作
// router.beforeEach((to,from,next)=>{
//   console.log("触发路由")

//   let isLogin = sessionStorage.getItem('isLogin');

//   if(to.path == "/logout"){
//     sessionStorage.clear();
//     next({path: '/login'});
//   }else if(to.path == "/login"){
//     console.log("是否已经登录："+isLogin)
//     console.log(getToken())
//     if(isLogin == 'true'){
//       next({path: '/main'})
//     }
//   }else if(isLogin == null){
//       next({path: '/login'})
//   }
//   // next()方法转到下面的路由
//   next();
// })

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>',
  render: h => h(App)
})
