import request from '@/utils/request'

export function getDeviceType() {
  return request({
    url: '/equipment/getEquipmentTypes',
    method: 'get'
  })
}
