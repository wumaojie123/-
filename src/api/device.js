import request from '@/utils/request'

// 解绑设备
export function unbundling(data) {
  return request({
    url: '/rest/factory/unbundling',
    method: 'post',
    data
  })
}
// 添加设备服务套餐
export function saveEquipmentService(data) {
  return request({
    url: '/rest/factory/savaEquipmentService',
    method: 'post',
    data
  })
}
// 查询是否套餐重复
export function equipmentServiceRepeat(data) {
  return request({
    url: '/rest/factory/equipmentServiceRepeat',
    method: 'post',
    data
  })
}
// 批量注册设备
export function batchRegisteredEquipment(data) {
  return request({
    url: '/rest/factory/batchRegisteredEquipment',
    method: 'post',
    data
  })
}
// 批量注册设备
export function merchants() {
  return request({
    url: '/query/merchants',
    method: 'get'
  })
}
// 批量注册设备
export function dateleEquipmentService(data) {
  return request({
    url: '/rest/factory/dateleEquipmentService',
    method: 'post',
    data
  })
}
// 更新设备服务套餐
export function updateEquipmentService(data) {
  return request({
    url: '/rest/factory/updateEquipmentService',
    method: 'post',
    data
  })
}

// 获取设备服务套餐
export function groupServiceList(data) {
  return request({
    url: '/rest/factory/groupServiceList',
    method: 'get',
    params: data
  })
}
// 查询设备注册纪录列表
export function registeredLogList(data) {
  return request({
    url: '/rest/factory/registeredLogList',
    method: 'get',
    params: data
  })
}
// 查询注册详情
export function registeredDetailList(data) {
  return request({
    url: '/rest/factory/registeredDetailList',
    method: 'get',
    params: data
  })
}
// 查询注册详情
export function registeredList(data) {
  return request({
    url: '/rest/factory/registeredList',
    method: 'get',
    params: data
  })
}
// 获取服务套餐列表
export function agentGroupServiceList(data) {
  return request({
    url: '/rest/factory/agentGroupServiceList',
    method: 'get',
    params: data
  })
}
