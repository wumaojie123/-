import a from './images/1.png'
import b from './images/2.png'
import c from './images/3.png'
import d from './images/4.png'
export const mapInfo = {
  XYJ: [
    [
      { title: '扫码洗衣', desc: '顾客可在公众号菜单进入扫码页面', url: 'pages/sweep-code-charging.html', label: 1 },
      { title: '我的', desc: '顾客可在公众号菜单查看钱包余额、充电记录及充值、消费记录等信息', url: 'pages/html/my-wash.html', label: 2 }
    ],
    { title: '商户管理平台', desc: '商家可在公众号菜单进入私有化商户管理平台', url: 'https://b.leyaoyao.com/group/index.html', label: 3 },
    { title: '附近洗衣机', desc: '顾客可在公众号菜单查看厂家附近的洗衣机', url: 'pages/nearby-washer-pile.html', label: 4 }
  ],
  AMY: [
    { title: '扫码按摩', desc: '用户可在商家公众号点击菜单扫码按摩', url: 'pages/sweep-code-charging.html' },
    { title: '我的按摩订单', desc: '用户可在商家公众号菜单查看按摩订单、余额、场地按摩椅在线状态等。', url: 'pages/chair-order.html' },
    { title: '商户管理平台', desc: '商家可在公众号菜单进入私有化商户管理平台', url: 'https://b.leyaoyao.com/group/index.html', label: 3 }
  ],
  CDZ: [
    [
      { title: '扫码充电', desc: '顾客可在公众号菜单进入扫码页面', url: 'pages/sweep-code-charging.html', label: 1 },
      { title: '我的', desc: '顾客可在公众号菜单查看钱包余额、洗衣记录及充值、消费记录等信息', url: 'pages/html/my-charging.html', label: 2 }
    ],
    { title: '商户管理平台', desc: '商家可在公众号菜单进入私有化商户管理平台', url: 'https://b.leyaoyao.com/group/index.html', label: 3 },
    { title: '附近充电桩', desc: '顾客可在公众号菜单查看厂家附近的充电桩', url: 'pages/nearby-charge-pile.html', label: 3 }
  ],
  DBJ: [
    { title: '扫码启动', desc: '用户可在商家公众号菜单进入扫码页面。', url: 'pages/sweep-code-charging.html' },
    { title: '消费记录', desc: '用户可通过商家公众号菜单查看启动记录。', url: 'pages/dbj-consumption-record.html' }
  ],
  WWJ: [
    { title: '扫码启动', desc: '用户可在商家公众号菜单进入扫码页面。', url: 'pages/sweep-code-charging.html' },
    { title: '消费记录', desc: '用户可通过商家公众号菜单查看启动记录。', url: 'pages/wwj-consumption-record.html' }
  ],
  SHJ: [
    { title: '扫码购物', desc: '用户可在商家公众号菜单进入扫码页面。', url: 'pages/sweep-code-charging.html' },
    { title: '我的购物订单', desc: '用户可在商家公众号菜单查看售货机订单、余额、场地设备在线状态等。', url: 'pages/vending-order-list.html' }
  ],
  SSJ: [
    { title: '扫码取水', desc: '用户可在商家公众号点击按钮开始扫码', url: 'pages/sweep-code-charging.html' },
    { title: '我的订单', desc: '用户可在商家公众号菜单查看售水订单、场地售水机在线状态等。', url: 'pages/order-ssj.html' },
    { title: '附近售水机', desc: '用户可在商家公众号菜单查看商家附近的售水机', url: 'pages/nearby-ssj.html' }
  ],
  XCJ: [
    { title: '扫码洗车', desc: '用户可在商家公众号点击按钮开始扫码', url: 'pages/sweep-code-charging.html' },
    { title: '我的订单', desc: '用户可在商家公众号菜单查看洗车订单、场地洗车机在线状态等。', url: 'pages/order-xcj.html' },
    { title: '附近洗车机', desc: '用户可在商家公众号菜单查看商家附近的洗车机', url: 'pages/nearby-xcj.html' }
  ],
  XZJ: [
    { title: '扫码启动', desc: '用户可在商家公众号点击按钮开始扫码', url: 'pages/sweep-code-charging.html' },
    { title: '消费记录', desc: '用户可通过商家公众号菜单查看消费记录。', url: 'pages/xzj-order.html' }
  ],
  NDJ: [
    { title: '扫码启动', desc: '用户可在商家公众号点击按钮开始扫码', url: 'pages/sweep-code-charging.html' },
    { title: '消费记录', desc: '用户可通过商家公众号菜单查看消费记录。', url: 'pages/ndj-order.html' }
  ]
}

export const descList = [
  {
    url: a,
    title: '沉淀粉丝',
    desc: '引导顾客关注公众号，帮助您沉淀、运营粉丝'
  },
  {
    url: b,
    title: '服务消息通知',
    desc: '客户可在公众号接收服务开始、服务结束消息通知，升级服务能力，提升用户体验，增强您的品牌影响力'
  },
  {
    url: c,
    title: '服务菜单配置',
    desc: '可配置扫码消费、我的消费订单、附近的设备菜单，同时支持自主插入链接，为顾客提供消费前、消费中、消费后服务，实现用户体验闭环，彰显品牌影响力'
  },
  {
    url: d,
    title: '私有化管理平台',
    desc: '可在公众号菜单配置私有化管理后台，实现管理后台品牌化，彰显品牌影响力'
  }
]

export const deviceMap = {
  XYJ: '洗衣机',
  AMY: '按摩类',
  CDZ: '按摩类'
}
