import request from '@/utils/request'

export function getAdConsumersConfig(data) {
  return request({
    url: '/rest/agentTitalReport/agentTotalData', // 假地址 自行替换
    method: 'get',
    params: data
  })
}

export function getAgent(data) {
  return request({
    url: '/agentManage/getAgent', // 假地址 自行替换
    method: 'get',
    params: data
  })
}

export function getCurrentOnlineCoins(data) {
  return request({
    url: '/rest/agentTitalReport/getCurrentOnlineCoins', // 假地址 自行替换
    method: 'get',
    params: data
  })
}

export function getTrendChartData(data) {
  return request({
    url: '/rest/agentTitalReport/getTrendChartData', // 假地址 自行替换
    method: 'get',
    params: data
  })
}

export function getCityTopByDistributorId(data) {
  return request({
    url: '/rest/agentTitalReport/getCityTopByDistributorId', // 假地址 自行替换
    method: 'get',
    params: data
  })
}
export function querySHL() {
  return request({
    url: '/equipment/getEquipmentTypes', // 假地址 自行替换
    method: 'get'
  })
}
export function getTradeTypeCount(data) {
  return request({
    url: '/rest/agentTitalReport/getTradeTypeCount', // 假地址 自行替换
    method: 'get',
    params: data
  })
}
export function getGroupTypeByDistributorId(data) {
  return request({
    url: '/rest/agentTitalReport/getGroupTypeByDistributorId', // 假地址 自行替换
    method: 'get',
    params: data
  })
}
export function storage(data) {
  return request({
    url: '/rest/agentTitalReport/storage', // 假地址 自行替换
    method: 'get',
    params: data
  })
}
