import request from '@/utils/request'
export function queryAgents(data) {
  return request({
    url: '/rest/equipment/childAgents/query',
    method: 'get',
    params: data
  })
}
