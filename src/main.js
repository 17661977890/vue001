// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// 通信
import axios from 'axios'
// 状态管理(sessionStorage)
import Vuex from 'vuex'
import store from './store'

Vue.prototype.axios=axios
Vue.config.productionTip = false

Vue.use(ElementUI);
Vue.use(Vuex);

// 路由钩子函数
router.beforeEach((to,from,next)=>{
  console.log("触发路由")

  let isLogin = sessionStorage.getItem('isLogin');

  if(to.path == "/logout"){
    sessionStorage.clear();
    next({path: '/login'});
  }else if(to.path == "/login"){
    if(isLogin == 'true'){
      next({path: '/main'})
    }
  }else if(isLogin == null){
      next({path: '/login'})
  }
  // next()方法转到下面的路由
  next();
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>',
  render: h => h(App)
})
