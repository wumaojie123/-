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
      component: () => import('@/views/charts/keyboard'),
      name: 'agentsList',
      meta: { title: '代理商列表', noCache: true }
    }
  ]
}

export default agentManage
