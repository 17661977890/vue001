import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex);

const state =sessionStorage.getItem("state") ? JSON.parse(sessionStorage.getItem("state")):{
  // 存对象
  user: {
    username: ""
  }
}

const getters = {
  // 获取对象
  getUser(state){
    return state.user;
  }
}

const mutations = {
  // 同步的（只有这里可以更新）
  updateUser(state,user){
    state.user=user;
  }
} 

const actions = {
  // 异步调用（mutations的修改方法）
  asyncUpdateUser(context,user){
    context.commit('updateUser',user)
  }
}

export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions
})