import request from '@/utils/request'

export function getWithdrawalRecordList(query) {
  return request({
    url: '/rest/advertising/withdrawalRecord',
    method: 'get',
    params: query
  })
}

export function getEarningsData(query) {
  return request({
    url: '/rest/advertising/earnings',
    method: 'get',
    params: query
  })
}

export function getAccountInfo(query) {
  return request({
    url: '/rest/advertising/accountInfo',
    method: 'get',
    params: query
  })
}

export function getQRCode(query) {
  return request({
    url: '/rest/advertising/bindLink',
    method: 'get',
    params: query
  })
}

export function postWithdrawal(data) {
  return request({
    url: '/rest/advertising/withdrawal',
    method: 'post',
    data
  })
}
