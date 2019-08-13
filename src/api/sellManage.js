import request from '@/utils/request'

export function fetchList(query) {
  return request({
    url: '/rest/factory/agentGroupServiceList',
    method: 'get',
    params: query
  })
}

export function childMerchants(query) {
  return request({
    url: '/merchant/childMerchants/query',
    method: 'get',
    params: query
  })
}
