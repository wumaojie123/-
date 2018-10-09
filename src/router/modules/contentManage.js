// 对应 订单管理 菜单
import Layout from '@/views/layout/Layout'

const contentManage = {
  path: '/roleManage',
  component: Layout,
  redirect: 'noredirect',
  name: 'contentManage',
  meta: {
    title: '内部管理',
    icon: 'peoples'
  },
  children: [
    {
      path: 'agentRoleManage',
      component: () => import('@/views/charts/keyboard'),
      name: 'agentRoleManage',
      redirect: '/roleManage/agentRoleManage/agentRoleList',
      meta: { title: '一级代理商管理', noCache: true },
      // alwaysShow: true,
      children: [
        {
          path: 'agentRoleList',
          component: () => import('@/views/charts/keyboard'),
          name: 'agentRoleList',
          meta: { title: '代理商列表' },
          hidden: false
        },
        {
          path: 'querySubAgent/:id(\\d+)',
          component: () => import('@/views/charts/keyboard'),
          name: 'querySubAgent',
          meta: { title: '查看下级代理' },
          hidden: true
        },
        {
          path: 'edit/add',
          component: () => import('@/views/charts/keyboard'),
          name: 'add',
          meta: { title: '代理商新增' },
          hidden: true
        },
        {
          path: 'edit/modify/:id(\\d+)',
          component: () => import('@/views/charts/keyboard'),
          name: 'agentModify',
          meta: { title: '代理商编辑' },
          hidden: true
        }
      ]
    },

    {
      path: 'bdRoleManage',
      component: () => import('@/views/charts/keyboard'),
      redirect: '/roleManage/bdRoleManage/bdList',
      name: 'bdRoleManage',
      meta: { title: 'BD管理', noCache: true },
      children: [
        {
          path: 'bdList',
          component: () => import('@/views/charts/keyboard'),
          name: 'bdList',
          meta: { title: 'BD人员列表' },
          hidden: false
        },
        {
          path: 'edit/dbAdd',
          component: () => import('@/views/charts/keyboard'),
          name: 'dbAdd',
          meta: { title: '新增BD' },
          hidden: true
        },
        {
          path: 'edit/dbModify/:id(\\d+)',
          component: () => import('@/views/charts/keyboard'),
          name: 'dbModify',
          meta: { title: '修改BD' },
          hidden: true
        }
      ]
    }
  ]
}

export default contentManage
