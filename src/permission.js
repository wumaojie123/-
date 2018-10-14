import router from './router'
import store from './store'
// import { Message } from 'element-ui'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css'// progress bar style
import { routerFormat } from './utils/routerFormat'
// import { userCenter } from './mock/router'
import { getSession } from './utils/savaSession'

// import businessChartsRouter from '@/router/modules/businessCharts'
// import agentManageRouter from '@/router/modules/agentManage'
// import deviceManageRouter from '@/router/modules/deviceManage'
// import userCenterRouter from '@/router/modules/userCenter'
// import insideManageRouter from '@/router/modules/insideManage'
// const routerArr = [insideManageRouter, businessChartsRouter, agentManageRouter, deviceManageRouter, userCenterRouter ]
// console.log(routerArr, 'routerArr')
// store.dispatch('GenerateRoutes', routerArr).then(() => { // 根据roles权限生成可访问的路由表
//   // router.addRoutes(getRouter) // 动态添加可访问路由表
//   router.addRoutes(routerArr) // 动态添加可访问路由表
// }, err => {
//   console.log(err)
// })

// import axios from 'axios'
// import request from '@/utils/request'
NProgress.configure({ showSpinner: false })// NProgress Configuration
let getRouter
const whiteList = ['/login', '/auth-redirect']// no redirect whitelist
router.beforeEach((to, from, next) => {
  NProgress.start() // start progress bar
  if (!getRouter) {
    if (getSession('addRoute')) {
      if (to.path === '/login') {
        next({ path: '/' })
        NProgress.done() // if current page is dashboard will not trigger	afterEach hook, so manually handle it
      } else {
        getRouter = routerFormat(JSON.parse(getSession('addRoute')))
        console.log(getRouter)
        if (store.getters.loaded) {
          next()
          return
        }
        store.dispatch('GenerateRoutes', getRouter).then(() => { // 根据roles权限生成可访问的路由表
          router.addRoutes(getRouter) // 动态添加可访问路由表
          // router.addRoutes(routerArr) // 动态添加可访问路由表
          next({ ...to, replace: true }) // hack方法 确保addRoutes已完成 ,set the replace: true so the navigation will not leave a   history record
        }, err => {
          console.log(err)
        })
      }
    } else {
      if (whiteList.indexOf(to.path) !== -1) { // 在免登录白名单，直接进入
        next()
      } else {
        next(`/login?redirect=${to.redirectedFrom || to.path || '/'}`)// 否则全部重定向到登录页
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
