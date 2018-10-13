import request from '@/utils/request'

export function fetchList(query) {
  return request({
    url: '/transaction/list',
    method: 'get',
    params: query
  })
}

export function add(query) {
  return request({
    url: '/transaction/list',
    method: 'post',
    query
  })
}

export function update(query) {
  return request({
    url: '/transaction/list',
    method: 'post',
    query
  })
}
