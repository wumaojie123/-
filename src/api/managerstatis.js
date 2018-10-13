import request from '@/utils/request'

export function fetchList(query) {
  console.log(JSON.stringify(query))
  return request({
    url: '/transaction/list',
    method: 'get',
    params: query
  })
}
