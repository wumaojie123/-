import request from '@/utils/request'

// 查询代理商和商家列表
export function getDeviceList() {
  return request({
    url: '/rest/analysis/agentAndMerchant',
    method: 'get'
  })
}
export function getAuthUrl() {
  return request({
    url: '/rest/officialAccounts/getAuthUrl',
    method: 'get'
  })
}
export function getAllResult() {
  return request({
    url: '/rest/charging/wechatThirdConfig/getAllResult',
    method: 'get'
  })
}
