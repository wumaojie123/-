import request from '@/utils/request'

export function getList(query) {
  return request({
    url: '/equipment/error/getEquipmentErrorLog',
    method: 'get',
    params: query
  })
}

export function getState(query) {
  return request({
    url: '/equipment/error/queryEquipmentType',
    method: 'get',
    params: query
  })
}

