// 对应 订单管理 菜单
import Layout from '@/views/layout/Layout'

const insideManage = {
  path: '/insideManage',
  component: Layout,
  redirect: 'noredirect',
  name: 'insideManage',
  meta: {
    title: '内部管理',
    icon: 'peoples'
  },
  children: [
    {
      path: 'agentRoleManage',
      component: () => import('@/views/insideManage/agentManage/AgentmanageLayout'),
      name: 'agentRoleManage',
      redirect: '/insideManage/agentRoleManage/agentsList',
      meta: { title: '一级代理商管理', noCache: true },
      // alwaysShow: true,
      children: [
        {
          path: 'agentsList',
          component: () => import('@/views/insideManage/agentManage/AgentsList'),
          name: 'agentRoleList',
          meta: { title: '一级代理商列表' },
          hidden: false
        },
        {
          path: 'subAgent/:id(\\d+)',
          component: () => import('@/views/insideManage/agentManage/ShowSubAgent'),
          name: 'subAgent',
          meta: { title: '查看下级代理' },
          hidden: true
        },
        {
          path: 'createAgent',
          component: () => import('@/views/insideManage/agentManage/AddAgent'),
          name: 'createAgent',
          meta: { title: '代理商新增' },
          hidden: true
        },
        {
          path: 'agentEdit/:id(\\d+)',
          component: () => import('@/views/insideManage/agentManage/EditAgent'),
          name: 'agentEdit',
          meta: { title: '代理商编辑' },
          hidden: true
        }
      ]
    },

    {
      path: 'bdRoleManage',
      component: () => import('@/views/insideManage/bdManage/BdManageLayout'),
      redirect: '/insideManage/bdRoleManage/bdList',
      name: 'bdRoleManage',
      meta: { title: 'BD人员', noCache: true },
      children: [
        {
          path: 'bdList',
          component: () => import('@/views/insideManage/bdManage/BdList'),
          name: 'bdList',
          meta: { title: 'BD人员列表' },
          hidden: false
        },
        {
          path: 'addBD',
          component: () => import('@/views/insideManage/bdManage/AddBd'),
          name: 'addBD',
          meta: { title: '新增BD' },
          hidden: true
        }
        // {
        //   path: 'editBD/:id(\\d+)',
        //   component: () => import('@/views/insideManage/bdManage/editBd'),
        //   name: 'editBD',
        //   meta: { title: '修改BD' },
        //   hidden: true
        // }
      ]
    }
  ]
}

export default insideManage
