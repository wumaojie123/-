// 对应 用户中心 菜单

export const userCenter = [{
  path: '/userCenter',
  component: '/layout/Layout',
  parent: null,
  redirect: 'noredirect',
  name: 'userCenter',
  title: '用户中心',
  icon: 'user',
  children: [
    {
      path: 'baseInfo',
      parent: 'userCenter',
      name: 'baseInfo',
      title: '基本资料',
      component: 'userCenter/baseInfo',
      noCache: true
    },
    {
      parent: 'userCenter',
      path: 'ModifyPassword',
      name: 'ModifyPassword',
      component: 'userCenter/ModifyPassword',
      title: '修改密码',
      noCache: true
    }
  ]
}]
