import request from '@/utils/request'
import { stringParse } from '@/utils/index'

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

// 获取服务套餐列表
export function configList(data) {
  return request({
    url: '/rest/setting/lyyopen/load',
    method: 'get',
    params: data
  })
}

export function query(data) {
  return request({
    url: '/rest/setting/lyyopen/query',
    method: 'post',
    data
  })
}

export function ty(data) {
  return request({
    url: '/rest/setting/setting/ty',
    method: 'get',
    params: data
  })
}

export function tyPost(data) {
  const url = `/rest/setting/setting/ty${stringParse(data)}`
  return request({
    url: url,
    method: 'post',
    data
  })
}

export function tyBtn(data) {
  return request({
    url: '/rest/setting/setting/ty',
    method: 'get',
    params: data
  })
}

export function tyBtnsetting(data) {
  // const url = `/rest/setting/setting/ty${stringParse(data)}`
  return request({
    url: '/rest/setting/setting/ty',
    method: 'post',
    data
  })
}

export function setting(data) {
  return request({
    url: '/rest/setting/button/setting',
    method: 'get',
    params: data
  })
}

export function cxNewEquipment(data) {
  return request({
    url: '/rest/setting/cxNewEquipment',
    method: 'get',
    params: data
  })
}

export function equipmentParamDef(data) {
  return request({
    url: '/rest/setting/getEquipmentParamDef',
    method: 'get',
    params: data
  })
}

export function readNewEquipment(data) {
  return request({
    url: '/rest/setting/readNewEquipment',
    method: 'get',
    params: data
  })
}

export function szNewEquipment(data) {
  return request({
    url: '/rest/setting/szNewEquipment',
    method: 'get',
    params: data
  })
}

export function verifyCode(data) {
  return request({
    url: '/userlogin/merchant/verifyCode',
    method: 'get',
    params: data
  })
}

/**
 * 根据设备查询商户下同类型的协议
 * @param {*} data
 */
export function protocolList(data) {
  return request({
    url: '/rest/factory/protocolList',
    method: 'get',
    params: data
  })
}

/**
 * 检验设备计费模式是否相同
 *
 * @param {*} data
 */
export function checkBillingModel(data) {
  return request({
    url: '/rest/factory/checkBillingModel',
    method: 'get',
    params: data
  })
}

/**
 * 更新设备类型
 * @param {*} data
 */
export function updateEquipmentModel(data) {
  return request({
    url: '/rest/factory/updateEquipmentModel',
    method: 'post',
    data
  })
}

export function validate(data) {
  return request({
    url: '/userlogin/password/verifyCode/validate',
    method: 'post',
    data
  })
}

export function setEquipment(data) {
  const url = `/rest/setting/setEquipment${stringParse(data)}`
  return request({
    url: url,
    method: 'post'
    // headers : {
    //   "Content-Type":'application/x-www-form-urlencoded; charset=UTF-8'
    // }
  })
}

/**
 * add by lss 20190903
 * 更新计费模式
 */
export async function updateChargePattern(params) {
  return request({
    url: '/rest/factory/deleteServiceByEquipment',
    method: 'get',
    params
  })
}

/**
 * 获取计费模式
 */
export async function getChargePattern(params) {
  return request({
    url: '/rest/factory/getBillingModel',
    method: 'get',
    params
  })
}

/**
 * 查询场地列表
 */
export async function factoryGroupListApi(params) {
  return request({
    url: '/rest/factory/groupList',
    method: 'get',
    params
  })
}

/**
 * 保存投放地址
 */
export async function factorySaveEquipmentGroupApi(data) {
  return request({
    url: '/rest/factory/saveEquipmentGroup',
    method: 'post',
    data
  })
}

export function equipmentBatchRegisterEquipmentApi(data) {
  const url = `/rest/equipment/registerEquipment${stringParse(data)}`
  return request({
    url: url,
    method: 'post',
    headers: {
      'Content-Type': 'application/json'
    }
  })
}
