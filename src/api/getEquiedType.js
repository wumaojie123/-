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
