'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  // 基础入口：后台网关 ---- 如果后台架构采用统一网关，则只用这一个就可以，如果web端需要支持访问多个服务端地址，可以配置多个，让后在api js模块用下边的值覆盖BASE_API
  BASE_API: '"http://localhost:8888"',
  // 用户中心服务API
  USER_CENTER: '"http://localhost:9002"',
  // 认证鉴权服务API
  UAA_CENTER: '"http://localhost:8088"',

})
