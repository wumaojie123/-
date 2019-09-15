import request from '@/utils/request'

var url = {
  'coin': '/query/coinOrders', // 投币订单
  'start': '/query/startupOrders', // 启动订单
  'pay': '/query/paymentOrders' // 支付订单
}
export function queryOrder(data, type) {
  return request({
    url: url[type],
    method: 'post',
    data
  })
}
export function queryMerchant() {
  return request({
    url: '/query/merchants',
    method: 'get'
  })
}
export function queryOrderDetail(param) {
  return request({
    url: '/query/order',
    method: 'get',
    params: param
  })
}

/**
* 商户号
*/
export async function getMerchantList() {
  var merchantList = []
  var result = await queryMerchant()
  if (result.result === 0) {
    var list = result.data || []
    list.forEach(item => {
      merchantList.push({
        adOrgId: item.adOrgId,
        label: `${item.name}(${item.account})`
      })
    })
  }
  return merchantList
}
/**
 * 获取订单状态
 */
export function getStateName(state) {
  var str = ''
  switch (state) {
    case -3:
      str = '启动超时'
      break
    case -2:
      str = '启动结束'
      break
    case -1:
      str = '已结束'
      break
    case 0:
      str = '启动中'
      break
    case 1:
      str = '工作中'
      break
    case 2:
      str = '已终止'
      break
  }
  return str
}

export function chargingOrderPowerList(param) {
  return request({
    url: '/query/charging/orderPowerList',
    method: 'get',
    params: param
  })
}

export function queryPowerListByTradeno(param) {
  return request({
    url: '/query/charging/getPowerListByTradeno',
    method: 'get',
    params: param
  })
}
