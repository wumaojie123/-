import request from '@/utils/request'

export function fetchList(query) {
  return request({
    url: '/agentManage/queryAgents',
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
    url: '/agentManage/updateAgent',
    method: 'post',
    data
  })
}

export function addAngent(data) {
  return request({
    url: '/agentManage/addAgent',
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

// 查询二级代理列表（一级代理查）
export function getSecList(query) {
  return request({
    url: '/agentManage/secondAgents/querySecondAgents',
    method: 'get',
    params: query
  })
}

// 获取一级代理新增代理商 是否显示短信通知
export function getIsShowSMSNotification() {
  return request({
    url: '/agentManage/getIssend',
    method: 'get'
  })
}

// 删除代理数据
export function deleteAgent(data) {
  return request({
    url: '/agentManage/deleteAgent',
    method: 'post',
    data
  })
}

