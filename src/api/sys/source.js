import request from '@/utils/request'


// 查询资源列表Tree
export function TreelistSource(query) {
  return request({
    url: '/qd-mall-usercenter/sys-source/getTreeList',
    method: 'post',
    data: query
  })
}


// 查询资源列表
export function listSource(query) {
  return request({
    url: '/qd-mall-usercenter/sys-source/getListBy',
    method: 'post',
    data: query
  })
}


// 查询资源详细
export function getSourceInfo(id) {
  return request({
    url: '/qd-mall-usercenter/sys-source/getById',
    method: 'post',
    data: {
      body:{
        id
      },
      header:{}
    }
  })
}

// 新增资源
export function addSource(body) {
  return request({
    url: '/qd-mall-usercenter/sys-source/add',
    method: 'post',
    data: {
      body,
      header:{}
    }
  })
}

// 修改资源
export function updateSource(body) {
  return request({
    url: '/qd-mall-usercenter/sys-source/updateById',
    method: 'post',
    data: {
      body,
      header:{}
    }
  })
}
// 修改显示状态
export function updateShowStatus(body) {
  return request({
    url: '/qd-mall-usercenter/sys-source/updateShowStatus',
    method: 'post',
    data: {
      body,
      header:{}
    }
  })
}

// 删除资源
export function delSource(id) {
  return request({
    url: '/qd-mall-usercenter/sys-source/deleteById',
    method: 'post',
    data: {
      body:{
        id
      },
      header:{}
    }
  })
}





