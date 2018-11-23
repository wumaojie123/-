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
    url: '/rest/benefit/group',
    method: 'get',
    params: data
  })
}

export function equipmentList(data) {
  return request({
    url: '/rest/benefit/equipment',
    method: 'get',
    params: data
  })
}
