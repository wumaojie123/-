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
export function transfer(data) {
  return request({
    url: '/rest/equipment/batch/transfer',
    method: 'post',
    data
  })
}

