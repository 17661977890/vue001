import request from '@/utils/request'

// 账号密码登录
export function login(username, password) {
  return request({
    url: '/qd-mall-uaaserver/api/oauth/user/token',
    method: 'post',
    data: {
      username,
      password
    }
  })
}
// 手机密码登录
export function mobilelogin(phone, password) {
  return request({
    url: '/qd-mall-uaaserver/api/oauth/mobile/token',
    method: 'post',
    data: {
      phone,
      password
    }
  })
}
// 手机短信验证码登录
export function smslogin(phone, code) {
  return request({
    url: '/qd-mall-uaaserver/api/oauth/sms/token',
    method: 'post',
    data: {
      phone,
      code
    }
  })
}

export function reg(username, password,code,confimpassword) {
    return request({
        url: '/qd-mall-usercenter/sys-user/reg',
        method: 'post',
        data: {
            username,
            confimpassword,
            code,
            password
        }
    })
}

export function getSmsCode(username) {
  return request({
      url: '/qd-mall-messageserver/sms/getCode',
      method: 'post',
      data: {
          username,
          confimpassword,
          code,
          password
      }
  })
}

export function getInfo() {
  return request({
    url: 'qd-mall-uaaserver/api/oauth/user/info',
    method: 'post',
  })
}

// 目前后端采用的是jwt token由客户端存储，所以登出方法 不需要调用后台，后台无法移除token，
// 如果使用redis 或者其他方式 由服务端存储 token ，则后台可以移除，可以调用后台登出
export function logout() {
  return request({
    url: '/qd-mall-uaaserver/api/oauth/user/logout',
    method: 'post'
  })
}
export function codes(username) {
    return request({
        url: '/api-user/sys/sysUser/sms/codes/'+username,
        method: 'get'
    })
}

