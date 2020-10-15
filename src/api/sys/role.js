import request from '@/utils/request'


// 查询角色列表
export function listRole(query) {
  return request({
    url: '/qd-mall-usercenter/sys-role/queryPage',
    method: 'post',
    data: query
  })
}


// 查询角色详细
export function getRoleInfo(id) {
  return request({
    url: '/qd-mall-usercenter/sys-role/getById',
    method: 'post',
    data: {
      body:{
        id
      },
      header:{}
    }
  })
}

// 新增角色
export function addRole(body) {
  return request({
    url: '/qd-mall-usercenter/sys-role/add',
    method: 'post',
    data: {
      body,
      header:{}
    }
  })
}

// 修改角色
export function updateRole(body) {
  return request({
    url: '/qd-mall-usercenter/sys-role/updateById',
    method: 'post',
    data: {
      body,
      header:{}
    }
  })
}

// 删除角色
export function delRole(id) {
  return request({
    url: '/qd-mall-usercenter/sys-role/deleteById',
    method: 'post',
    data: {
      body:{
        id
      },
      header:{}
    }
  })
}





