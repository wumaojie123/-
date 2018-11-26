import request from '@/utils/request'

export function fetchList(data) {
  return request({
    url: '/merchant/manage/query',
    method: 'post',
    data
  })
}

export function childMerchants(query) {
  return request({
    url: '/merchant/childMerchants/query',
    method: 'get',
    params: query
  })
}
export function getCode(query) {
  return request({
    url: '/agentManage/sendCode',
    method: 'get',
    params: query
  })
}

export function update(data) {
  return request({
    url: '/agentManage/updateMerchant',
    method: 'post',
    data
  })
}

export function add(data) {
  return request({
    url: '/agentManage/addMerchant',
    method: 'post',
    data
  })
}

export function getAngent(query) {
  return request({
    url: '/agentManage/getAgent',
    method: 'get',
    params: query
  })
}

export function getMerchant(query) {
  return request({
    url: '/agentManage/getMerchant',
    method: 'get',
    params: query
  })
}
