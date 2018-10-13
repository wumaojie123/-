// 对应 用户中心 菜单

export const userCenter = [
  {
    parentId: null,
    value: '/userCenter',
    name: '用户中心',
    icon: 'user',
    htmlTemplet: 'userCenter',
    adResourcesId: 1102846,
    selected: true,
    seq: 0,
    menuResourcesList: [
      {
        htmlTemplet: 'userCenter/baseInfo',
        parentId: 'userCenter',
        value: 'baseInfo',
        name: '基本资料'
      },
      {
        parentId: 'userCenter',
        htmlTemplet: 'userCenter/ModifyPassword',
        value: 'ModifyPassword',
        name: '修改密码'
      }
    ]
  },
  {
    value: '/agentManage',
    htmlTemplet: 'agentManage',
    alwaysShow: true,
    name: '代理商管理',
    icon: 'component',
    menuResourcesList: [
      {
        value: 'angentList',
        parentId: 'agentManage',
        htmlTemplet: 'angentManage/AngentList',
        redirect: '/agentManage/angentList/list',
        name: '代理商列表',
        menuResourcesList: [
          {
            value: 'list',
            parentId: 'angentList',
            htmlTemplet: 'angentManage/AngentList',
            name: '代理商列表'
          },
          {
            value: 'edit',
            parentId: 'angentList',
            htmlTemplet: 'angentManage/EditAngent',
            name: '编辑代理商'
          },
          {
            value: 'add',
            parentId: 'angentList',
            htmlTemplet: 'angentManage/NewAngent',
            name: '新增代理商'
          }
        ]
      }
    ]
  },
  {
    value: '/businessCharts',
    name: '经营统计',
    htmlTemplet: 'businessCharts',
    alwaysShow: true,
    icon: 'chart',
    menuResourcesList: [
      {
        value: 'businessList',
        htmlTemplet: 'managerstatis/ManagerReport',
        parentId: 'businessCharts',
        name: '经营报表'
      }
    ]
  }
]
