import request from '@/utils/request'

export default class transferAPI {
  static async transfer(data) {
    return request({
      url: '/rest/equipment/batch/transfer',
      method: 'post',
      data
    })
  }
}
// 代理转商家
export function transfer(data) {
  return request({
    url: '/rest/equipment/batch/transfer',
    method: 'post',
    data
  })
}
// 代理转代理
export function transferAgent(data) {
  return request({
    url: '/rest/equipment/batch/transferToAgent',
    method: 'post',
    data
  })
}
// 退换设备
export function rebackEquipment(data) {
  return request({
    url: '/rest/equipment/batch/rebackEquipment',
    method: 'post',
    data
  })
}
