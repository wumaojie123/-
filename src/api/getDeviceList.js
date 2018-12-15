import request from '@/utils/request'

// 获取一级待转移设备
export function getDeviceList(data) {
  return request({
    url: '/equipment/getEquipmentList',
    method: 'get',
    params: data
  })
}

// 获取二级代理转移设备
export function getAgentDeviceList(data) {
  return request({
    url: '/equipment/getEquipmentList',
    method: 'get',
    params: data
  })
}
// 获取一级代理已转移设备
export function getFirstDeviceList(data) {
  return request({
    url: '/equipment/firstAgent/getEquipmentList',
    method: 'get',
    params: data
  })
}

// 获取二级代理已转移设备
export function getSecDeviceList(data) {
  return request({
    url: '/equipment/secondAgent/getSecondAgentEquipmentList',
    method: 'post',
    data
  })
}

// 设置设备参数
export function setEquipmentParam(data) {
  return request({
    url: '/rest/equipment/batch/setEquipmentParam',
    method: 'post',
    data
  })
}

export function agentEquipmentList(data) {
  return request({
    url: '/rest/equipment/agentEquipment/query',
    method: 'get',
    params: data
  })
}
// 设备禁用和解禁
export function equipmentStatus(data) {
  return request({
    url: '/equipment/batch/status',
    method: 'post',
    data
  })
}
