// 对应 设备管理 菜单
import Layout from '@/views/layout/Layout'

const agentManage = {
  path: '/agentManage',
  component: Layout,
  redirect: 'noredirect',
  name: 'agentManage',
  alwaysShow: true,
  meta: {
    title: '代理商管理',
    icon: 'component'
  },
  children: [
    {
      path: 'agentsList',
      component: () => import('@/views/angentManage/AngentList'),
      name: 'agentsList',
      meta: { title: '代理商列表', noCache: true }
    },
    {
      path: 'agentsList/editAgent',
      hidden: true,
      component: () => import('@/views/angentManage/EditAngent'),
      name: 'editAgent',
      meta: { title: '编辑代理商', noCache: true }
    },
    {
      path: 'agentsList/addAgent',
      hidden: true,
      component: () => import('@/views/angentManage/NewAngent'),
      name: 'addAgent',
      meta: { title: '新增代理商', noCache: true }
    }
  ]
}

export default agentManage
