import request from '@/utils/request'

// 查询代理商和商家列表
export function getDeviceList() {
  return request({
    url: '/rest/analysis/agentAndMerchant',
    method: 'get'
  })
}
export function getAuthUrl(param) {
  return request({
    url: '/rest/officialAccounts/getAuthUrl',
    method: 'get',
    params: param
  })
}
export function getAllResult() {
  return request({
    url: '/rest/charging/wechatThirdConfig/getAllResult',
    method: 'get'
  })
}
export function getConfig(param) {
  return request({
    url: '/rest/charging/wechatThirdConfig/getConfig',
    method: 'get',
    params: param
  })
}
export function updateConfig(data) {
  return request({
    url: '/rest/charging/wechatThirdConfig/updateConfig',
    method: 'post',
    data
  })
}
