import { constantRouterMap } from '@/router'

const permission = {
  state: {
    routers: constantRouterMap,
    addRouters: []
  },
  mutations: {
    SET_ROUTERS: (state, routers) => {
      state.addRouters = routers
      state.routers = constantRouterMap.concat(routers)
    }
  },
  actions: {
    GenerateRoutes({ commit }, routes) {
      return new Promise(resolve => {
        console.log(routes)
        // const accessedRouters = routes
        commit('SET_ROUTERS', routes)
        resolve()
      })
    }
  }
}

export default permission
