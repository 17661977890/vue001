import { asyncRoutes, constantRoutes } from '@/router'
import { querySourceByRoles } from '@/api/sys/roleSource'
/**
 * Use meta.role to determine if the current user has permission
 * @param roles
 * @param route
 */
function hasPermission(sources, route) {
  console.log(route.name)
  if (route.name) {
    console.log(sources.some(source => route.name===source))
    return sources.some(source => route.name==source)
  } else {
    return true
  }
}

/**
 * Filter asynchronous routing tables by recursion
 * @param routes asyncRoutes
 * @param roles
 */
export function filterAsyncRoutes(routes, sources) {
  const res = []
  routes.forEach(route => {
    const tmp = { ...route }
    if (hasPermission(sources, tmp)) {
      if (tmp.children) {
        tmp.children = filterAsyncRoutes(tmp.children, sources)
      }
      res.push(tmp)
    }
  })
  return res
}

const state = {
  routes: [],
  addRoutes: []
}

const mutations = {
  SET_ROUTES: (state, routes) => {
    state.addRoutes = routes
    if(routes){
      state.routes = constantRoutes.concat(routes)
    }else{
      state.routes = constantRoutes
    }
    
    console.log("登录用户所有可见资源:",state.routes)
  }
}

const actions = {
  generateRoutes({ commit }, res) {
    const roles = [];
    const sources = [];
    res.roleVoList.forEach(element => {
      roles.push(element.id);
    });
    res.sourceList.forEach(element =>{
      sources.push(element.sourceCode)
    })
    return new Promise(resolve => {
      let accessedRoutes;
      console.log("登录用户角色：",roles,"授权资源：",sources)
      if(roles){
        //roles.includes('admin')
        if (roles.includes("1")) {
          accessedRoutes = asyncRoutes || []
        } else {
          accessedRoutes = filterAsyncRoutes(asyncRoutes, sources)
        }
        
      }
      commit('SET_ROUTES', accessedRoutes)
      resolve(accessedRoutes)
      
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
