// 对应 订单管理 菜单
import Layout from '@/views/layout/Layout'

const contentManage = {
  path: '/roleManage',
  component: Layout,
  redirect: 'noredirect',
  name: 'contentManage',
  meta: {
    title: '内容管理',
    icon: 'peoples'
  },
  children: [
    {
      path: 'agentRoleManage',
      component: () => import('@/views/charts/keyboard'),
      name: 'agentManage',
      meta: { title: '一级代理商管理', noCache: true },
      children: [
        {
          path: 'querySubAgent',
          component: () => import('@/views/charts/keyboard'),
          name: 'Menu1-1',
          meta: { title: '查看下级代理' },
          hidden: true
        },
        {
          path: 'edit',
          component: () => import('@/views/charts/keyboard'),
          name: 'Menu1-2',
          redirect: '/nested/menu1/menu1-2/menu1-2-1',
          meta: { title: '编辑' },
          hidden: true,
          children: [
            {
              path: 'add',
              component: () => import('@/views/charts/keyboard'),
              name: 'Menu1-2-1',
              meta: { title: '新增' },
              hidden: true
            },
            {
              path: 'modi',
              component: () => import('@/views/charts/keyboard'),
              name: 'modi',
              meta: { title: '修改' },
              hidden: true
            }
          ]
        }
      ]
    },
    {
      path: 'BDRoleManage',
      component: () => import('@/views/charts/keyboard'),
      name: 'BDRoleManage',
      meta: { title: 'BD人员管理', noCache: true },
      children: [
        {
          path: 'add',
          component: () => import('@/views/charts/keyboard'),
          name: 'add',
          meta: { title: '新增' },
          hidden: true
        },
        {
          path: 'modify',
          component: () => import('@/views/charts/keyboard'),
          name: 'modify',
          meta: { title: '修改' },
          hidden: true
        }
      ]
    }
  ]
}

export default contentManage
