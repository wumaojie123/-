import request from '@/utils/request'

export function getDeviceList(data) {
  return request({
    url: '/equipment/getEquipmentList',
    method: 'get',
    params: data
  })
}

export function agentEquipmentList(data) {
  return request({
    url: '/rest/equipment/agentEquipment/query',
    method: 'get',
    params: data
  })
}
