import { login, smslogin,logout, getInfo } from '@/api/sys/login'
import { getToken, setToken, removeToken } from '@/utils/auth'

const user = {
  state: {
    token: getToken(),
    name: '',
    avatar: '',
    menus: [],
    roles: []
  },

  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_NAME: (state, name) => {
      state.name = name
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    },
    SET_MENUS: (state, menus) => {
      state.menus = menus
    },
    SET_ISLOGIN: (state,isLogin) => {
      state.isLogin = isLogin
    }
  },

  actions: {
    // 登录
    Login({ commit }, userInfo) {
      const username = userInfo.username.trim()
      return new Promise((resolve, reject) => {
        login(username, userInfo.password).then(response => {
            // console.log("请求结果："+response)
            if (response.access_token) {
                setToken(response.access_token);
                commit('SET_TOKEN', response.access_token);
                resolve()
            }
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 手机短信登录
    SmsLogin({ commit }, userInfo) {
      return new Promise((resolve, reject) => {
        smslogin(userInfo.phone,userInfo.code,userInfo.smsCodeId,userInfo.platformType,userInfo.businessType,userInfo.receiveTerminalType).then(response => {
            // console.log("请求结果："+response)
            if (response.access_token) {
                setToken(response.access_token);
                commit('SET_TOKEN', response.access_token);
                resolve()
            }
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 获取用户信息
    GetInfo({ commit, state }) {
      return new Promise((resolve, reject) => {
        getInfo().then(response => {
          // console.log("获取用户信息返回："+JSON.stringify(response))
          const data = response
              // es6 解构语法
              // const { roles } = response;
              // //等价于
              // const roles = response.roles
          // if (data.roles && data.roles.length > 0) { // 验证返回的roles是否是一个非空数组
          //   commit('SET_ROLES', data.roles)
          // } else {
          //   reject('getInfo: roles must be a non-null array !')
          // }
          commit('SET_NAME', data.username)
          commit('SET_AVATAR', data.headImgUrl)
          resolve(response)
        }).catch(error => {
          console.log(error.message)
          reject(error)
        })
      })
    },

    // 登出
    LogOut({ commit, state }) {
      return new Promise((resolve, reject) => {
        logout(state.token).then(() => {
          commit('SET_TOKEN', '')
          commit('SET_ROLES', [])
          commit('SET_MENUS', [])
          removeToken()
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 前端 登出
    FedLogOut({ commit }) {
      return new Promise(resolve => {
        commit('SET_TOKEN', '')
        removeToken()
        resolve()
      })
    }
  }
}

export default user
