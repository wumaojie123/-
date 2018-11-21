import request from '@/utils/request'

export function fetchList(data) {
  return request({
    url: '/rest/reportFroms/query',
    method: 'post',
    data
  })
}

export function fetchPlaceList(data) {
  return request({
    url: '/rest/reportFroms/query',
    method: 'post',
    data
  })
}

export function equipmentList(data) {
  return request({
    url: '/rest/reportFroms/query',
    method: 'post',
    data
  })
}
