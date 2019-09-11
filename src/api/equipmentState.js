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
    url: '/article/detail',
    method: 'get',
    params: query
  })
}

