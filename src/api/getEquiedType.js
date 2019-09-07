import request from '@/utils/request'

export function getDeviceType() {
  return request({
    url: '/equipment/getEquipmentTypes',
    method: 'get'
  })
}

export function getDeviceTypeBd() {
  return request({
    url: '/rest/equipment/equipmentType/querySHL',
    method: 'get'
  })
}

// 查询设备类型-新
export function getAllEquipment() {
  return request({
    url: '/rest/equipment/equipmentType/getAllEquipment',
    method: 'get'
  })
}
