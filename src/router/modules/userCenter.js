// 对应 用户中心 菜单
import Layout from '@/views/layout/Layout'

const userCenter = {
  path: '/userCenter',
  component: Layout,
  redirect: 'noredirect',
  name: 'userCenter',
  meta: {
    title: '用户中心',
    icon: 'user'
  },
  children: [
    {
      path: 'userInfo',
      component: () => import('@/views/baseInfo/baseInfo'),
      name: 'userInfo',
      meta: { title: '基本资料', noCache: true }
    },
    {
      path: 'editPassword',
      component: () => import('@/views/modifyPassword/ModifyPassword'),
      name: 'editPassword',
      meta: { title: '修改密码', noCache: true }
    }
    // { // 暂时不做
    //   path: 'myPack',
    //   component: () => import('@/views/charts/mixChart'),
    //   name: 'MixChart',
    //   meta: { title: '我的钱包', noCache: true }
    // }
  ]
}

export default userCenter
