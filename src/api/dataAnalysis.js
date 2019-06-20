import request from '@/utils/request'
import { param, exportFile } from '@/utils'

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

// 商品销售趋势
export function analysisMaterialSaleTrendApi(data) {
  return request({
    url: '/rest/analysis/material/saleTrend',
    method: 'get',
    params: data
  })
}

// 商品成交分析
export function analysisMaterialByMaterialApi(data) {
  return request({
    url: '/rest/analysis/material/byMaterial',
    method: 'get',
    params: data
  })
}

// 商品销售排行榜
export function analysisMaterialRankingApi(data) {
  return request({
    url: '/rest/analysis/material/ranking',
    method: 'get',
    params: data
  })
}

// 商品销售排行榜导出
export function analysisExportMaterialSaleRankingApi(data) {
  const url = '/rest/analysis/export/material/saleRanking'
  const downloadUrl = `${process.env.BASE_API}${url}?${param(data)}`
  exportFile(downloadUrl)
}

// 订单数据导出
export function exportOrderAnalysisData(data) {
  const url = '/rest/analysis/export/payment/order'
  const downloadUrl = `${process.env.BASE_API}${url}?${param(data)}`
  exportFile(downloadUrl)
}
