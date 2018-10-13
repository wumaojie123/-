const _import = require('../utils/_import_' + process.env.NODE_ENV)
import Layout from '@/views/layout/Layout'
export const routerFormat = (routes) => {
  if (!Array.isArray(routes)) {
    return []
  }
  const resultRouters = []
  routes.forEach((route) => {
    const {
      parentId,
      name,
      icon
    } = route
    route.meta = {
      title: name,
      icon
    }
    route.path = route.value
    const menuResourcesList = route.menuResourcesList
    if (menuResourcesList && Array.isArray(menuResourcesList) && menuResourcesList.length !== 0) {
      route.children = routerFormat(menuResourcesList)
      // route.children = route.menuResourcesList
    }
    const component = parentId ? _import(route.htmlTemplet) : Layout
    route.component = component
    resultRouters.push(route)
  })
  return resultRouters
}
