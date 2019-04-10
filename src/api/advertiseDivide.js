import request from '@/utils/request'

export function agentList(query) {
  return request({
    url: '/rest/advertising/agentList',
    method: 'get',
    params: query
  })
}

export function updateAgentInfo(data) {
  return request({
    url: '/rest/advertising/updateAgentInfo',
    method: 'post',
    data
  })
}
