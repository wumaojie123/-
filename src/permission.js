import router from './router'
import store from './store'
// import { Message } from 'element-ui'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css'// progress bar style
import { routerFormat } from './utils/routerFormat'
// import { userCenter } from './mock/router'
import { getSession } from './utils/savaSession'
// import axios from 'axios'
// import request from '@/utils/request'
NProgress.configure({ showSpinner: false })// NProgress Configuration
let getRouter
const whiteList = ['/login', '/auth-redirect']// no redirect whitelist

router.beforeEach((to, from, next) => {
  NProgress.start() // start progress bar
  if (!getRouter) {
    if (getSession('addRoute')) { // determine if there has token
      /* has token*/
      if (to.path === '/login') {
        next({ path: '/' })
        NProgress.done() // if current page is dashboard will not trigger	afterEach hook, so manually handle it
      } else {
        getRouter = routerFormat(JSON.parse(getSession('addRoute')))
        console.log(getRouter)
        store.dispatch('GenerateRoutes', getRouter).then(() => { // 根据roles权限生成可访问的路由表
          console.log(store.getters.addRouters, '-addRouters-')
          router.addRoutes(getRouter) // 动态添加可访问路由表
          next({ ...to, replace: true }) // hack方法 确保addRoutes已完成 ,set the replace: true so the navigation will not leave a   history record
        })
      }
    } else {
      // axios.get('https://www.easy-mock.com/mock/5a5da330d9b48c260cb42ca8/example/antrouter').then(res => {
      //   getRouter = userCenter // 后台拿到路由
      //   saveSession('addRoute', userCenter)
      //   getRouter = routerFormat(userCenter)
      //   store.dispatch('GenerateRoutes', getRouter).then(() => { // 根据roles权限生成可访问的路由表
      //     console.log(store.getters.addRouters, '-addRouters-')
      //     router.addRoutes(store.getters.addRouters) // 动态添加可访问路由表
      //     next({ ...to, replace: true }) // hack方法 确保addRoutes已完成 ,set the replace: true so the navigation will not leave a   history record
      //   })
      // })
      /* has no token*/
      if (whiteList.indexOf(to.path) !== -1) { // 在免登录白名单，直接进入
        next()
      } else {
        next(`/login?redirect=${to.path}`) // 否则全部重定向到登录页
        NProgress.done() // if current page is login will not trigger afterEach hook, so manually handle it
      }
    }
  } else {
    next()
  }
})
router.afterEach(() => {
  NProgress.done() // finish progress bar
})
