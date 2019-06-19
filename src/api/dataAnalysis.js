import request from '@/utils/request'

// 查询代理商和商家列表
export function getAgentAndMerchant() {
  return request({
    url: '/rest/analysis/agentAndMerchant',
    method: 'get'
  })
}

// 查询区域
export function getAreaList() {
  return request({
    url: '/rest/analysis/district',
    method: 'get'
  })
}

// 查询设备类型
export function getEquipmentType(sendData) {
  return request({
    url: '/rest/analysis/equipmentType',
    method: 'get',
    params: sendData
  })
}

// 获取订单趋势
export function getOrderTrendData(sendData) {
  return request({
    url: '/rest/payment/order/analysis',
    method: 'get',
    params: sendData
  })
}

// 获取订单高峰分布
export function getOrderPeakData(sendData) {
  return request({
    url: '/rest/payment/order/peak',
    method: 'get',
    params: sendData
  })
}

// 获取支付方式数据
export function getOrderPattern(sendData) {
  return request({
    url: '/rest/payment/order/pattern',
    method: 'get',
    params: sendData
  })
}

// 获取支付结果
export function getOrderResult(sendData) {
  return request({
    url: '/rest/payment/order/result',
    method: 'get',
    params: sendData
  })
}

// 获取订单转化率信息
export function getOrderConversion(sendData) {
  return request({
    url: '/rest/payment/order/conversion',
    method: 'get',
    params: sendData
  })
}

// 获取订单报表数据
export function getOrderReportForms(sendData) {
  return request({
    url: '/rest/payment/order/pagination',
    method: 'get',
    params: sendData
  })
}
