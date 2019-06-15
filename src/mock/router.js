// 对应 用户中心 菜单

const userCenter = [
  {
    'adResourcesId': 1102156,
    'parentId': null,
    'name': '经营统计',
    'value': '/businessCharts',
    'selected': true,
    'htmlTemplet': 'businessCharts',
    'icon': 'chart',
    'seq': 1,
    'menuResourcesList': [{
      'adResourcesId': 1102157,
      'parentId': 1102156,
      'name': '经营报表',
      'value': 'businessStatistics',
      'selected': true,
      'htmlTemplet': 'managerstatis/ManagerReport',
      'icon': null,
      'seq': 0,
      'buttonResourcesList': null
    }]
  },
  {
    'adResourcesId': 1102160,
    'parentId': null,
    'name': '代理商管理',
    'value': '/agentManage',
    'selected': true,
    'htmlTemplet': 'agentManage',
    'icon': 'superagent',
    'seq': 2,
    'menuResourcesList': [{
      'adResourcesId': 1102161,
      'parentId': 1102160,
      'name': '代理列表',
      'value': 'agentList',
      'selected': true,
      'htmlTemplet': 'agentManage/AgentsList',
      'icon': null,
      'seq': 0,
      'buttonResourcesList': null
    }]
  },
  {
    'adResourcesId': 1102287,
    'parentId': null,
    'name': '商家管理',
    'value': '/businessManage',
    'selected': true,
    'htmlTemplet': 'businessManage',
    'icon': 'component',
    'seq': 3,
    'menuResourcesList': [{
      'adResourcesId': 1102288,
      'parentId': 1102287,
      'name': '商家列表',
      'value': 'businessList',
      'selected': true,
      'htmlTemplet': 'businessManage/BusinessList',
      'icon': null,
      'seq': 0,
      'buttonResourcesList': null
    }]
  },
  {
    'adResourcesId': 1102167,
    'parentId': null,
    'name': '设备管理',
    'value': '/deviceManage',
    'selected': true,
    'htmlTemplet': 'deviceManage',
    'icon': 'list',
    'seq': 4,
    'menuResourcesList': [{
      'adResourcesId': 1102168,
      'parentId': 1102167,
      'name': '已转移设备',
      'value': 'deviceList',
      'selected': true,
      'htmlTemplet': 'deviceManage/DeviceList',
      'icon': null,
      'seq': 0,
      'buttonResourcesList': null
    }, {
      'adResourcesId': 1102244,
      'parentId': 1102167,
      'name': '待转移设备',
      'value': 'transfer',
      'selected': true,
      'htmlTemplet': 'deviceManage/deviceTransfer',
      'icon': null,
      'seq': 0,
      'buttonResourcesList': null
    }]
  },
  {
    'adResourcesId': 1102170,
    'parentId': null,
    'name': '用户中心',
    'value': '/userCenter',
    'selected': true,
    'htmlTemplet': 'userCenter',
    'icon': 'user',
    'seq': 5,
    'menuResourcesList': [{
      'adResourcesId': 1102171,
      'parentId': 1102170,
      'name': '基本资料',
      'value': 'userInfo',
      'selected': true,
      'htmlTemplet': 'userCenter/baseInfo',
      'icon': null,
      'seq': 0,
      'buttonResourcesList': null
    }, {
      'adResourcesId': 1102172,
      'parentId': 1102170,
      'name': '修改密码',
      'value': 'ModifyPassword',
      'selected': true,
      'htmlTemplet': 'userCenter/ModifyPassword',
      'icon': null,
      'seq': 0,
      'buttonResourcesList': null
    }]
  },
  {
    'adResourcesId': 1102678,
    'parentId': null,
    'name': '广告分成',
    'value': '/advertiseDivideOne',
    'selected': true,
    'htmlTemplet': 'advertiseDivideOne',
    'icon': 'addivide',
    'seq': null,
    'menuResourcesList': [{
      'adResourcesId': 1102679,
      'parentId': 1102678,
      'name': '广告分成',
      'value': 'withdrawRecord',
      'selected': true,
      'htmlTemplet': 'advertiseDivideOne/WithdrawRecord',
      'icon': null,
      'seq': null,
      'buttonResourcesList': null
    }]
  }, {
    'adResourcesId': 1102826,
    'parentId': null,
    'name': '品牌信息配置',
    'value': '/brand',
    'selected': true,
    'htmlTemplet': 'brand',
    'icon': 'component',
    'seq': null,
    'menuResourcesList': [{
      'adResourcesId': 1102828,
      'parentId': 1102826,
      'name': '消费者前台配置',
      'value': 'toCBrand',
      'selected': true,
      'htmlTemplet': 'brand/ToCBrand',
      'icon': null,
      'seq': null,
      'buttonResourcesList': null
    }, {
      'adResourcesId': 1102827,
      'parentId': 1102826,
      'name': '运营商后台配置',
      'value': 'toB',
      'selected': true,
      'htmlTemplet': 'brand/ToBBrand',
      'icon': null,
      'seq': null,
      'buttonResourcesList': null
    }]
  },
  {
    value: '/dataAnalysis',
    name: '数据分析',
    htmlTemplet: 'dataAnalysis',
    icon: 'chart',
    menuResourcesList: [
      {
        htmlTemplet: 'dataAnalysis/client/index',
        value: '/dataAnalysis/client',
        name: '客户分析',
        parentId: '/dataAnalysis'
      },
      {
        htmlTemplet: 'dataAnalysis/equipment/index',
        value: '/dataAnalysis/equipment',
        name: '设备分析',
        parentId: '/dataAnalysis'
      },
      {
        htmlTemplet: 'dataAnalysis/order/index',
        name: '订单分析',
        value: '/dataAnalysis/order',
        parentId: '/dataAnalysis'
      }
    ]
  }
]

export default {
  getMenu: config => {
    return {
      result: 0,
      description: '',
      data: userCenter
    }
  }
}
