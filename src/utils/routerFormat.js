// const lazyLoading = (name) => {
//   return (resolve) => require([`@/views/${name}`], resolve)
// }
const _import = require('../utils/_import_dev')
import Layout from '@/views/layout/Layout'
// const lazyLoading = file => require('@/views' + file + '.vue').default
// const lazyLoading = (name) => `@/views/${name}`
export const routerFormat = (routes) => {
  if (!Array.isArray(routes)) {
    return []
  }
  const resultRouters = []
  routes.forEach((route) => {
    const {
      path = '/',
      parent,
      redirect = 'noredirect',
      name,
      title,
      icon
    } = route
    let children = route.children
    // const component = `@/views/${parent}/${name}`
    if (children && Array.isArray(children)) {
      children = routerFormat(children)
    }
    const component = parent ? _import(route.component) : Layout
    const rerouter = {
      path,
      parent,
      redirect,
      name,
      children,
      component: component,
      // component(resolve) {
      //   console.log(`@/views/${component}.vue`)
      //   require([`@/views/${component}.vue`], resolve)
      // },
      meta: {
        title,
        icon
      }
    }
    resultRouters.push(rerouter)
  })
  return resultRouters
}
