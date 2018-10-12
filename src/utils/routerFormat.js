// const lazyLoading = (name) => {
//   return (resolve) => require([`@/views/${name}`], resolve)
// }
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
      component,
      icon
    } = route
    let children = route.children
    // const component = `@/views/${parent}/${name}`
    if (children && Array.isArray(children)) {
      children = routerFormat(children)
    }
    const rerouter = {
      path,
      parent,
      redirect,
      name,
      children,
      component(resolve) {
        require([`@/views/${component}.vue`], resolve)
      },
      meta: {
        title,
        icon
      }
    }
    resultRouters.push(rerouter)
  })
  return resultRouters
}
