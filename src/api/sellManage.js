import request from '@/utils/request'

export function fetchList(query) {
  return request({
    url: '/rest/factory/agentGroupServiceList',
    method: 'get',
    params: query
  })
}

export function postService(query) {
  return request({
    url: '/rest/factory/savaGroupService',
    method: 'post',
    data: query
  })
}
export function putService(query) {
  return request({
    url: '/rest/factory/updateGroupService',
    method: 'post',
    data: query
  })
}
