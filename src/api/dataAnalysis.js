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
