import request from '@/utils/request'


// 查询角色拥有的资源列表
export function querySourceByRole(roleId) {
  return request({
    url: '/qd-mall-usercenter/sys-role-source/querySourceByRole',
    method: 'post',
    data: {
      body:{
        roleId
      },
      header:{}
    }
  })
}

export function querySourceByRoles(roleIds) {
  return request({
    url: '/qd-mall-usercenter/sys-role-source/querySourceByRoles',
    method: 'post',
    data: {
      body:{
        roleIds
      },
      header:{}
    }
  })
}


// 保存用户角色关系数据
export function saveRoleSource(body) {
  return request({
    url: '/qd-mall-usercenter/sys-role-source/saveRoleSource',
    method: 'post',
    data: {
      body,
      header:{}
    }
  })
}






