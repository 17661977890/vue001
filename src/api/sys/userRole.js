import request from '@/utils/request'


// 查询用户拥有的角色列表
export function queryRoleByUser(userId) {
  return request({
    url: '/qd-mall-usercenter/sys-user-role/queryRoleByUser',
    method: 'post',
    data: {
      body:{
        userId
      },
      header:{}
    }
  })
}


// 保存用户角色关系数据
export function saveUserRole(body) {
  return request({
    url: '/qd-mall-usercenter/sys-user-role/saveUserRole',
    method: 'post',
    data: {
      body,
      header:{}
    }
  })
}






