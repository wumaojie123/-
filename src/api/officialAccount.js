import request from '@/utils/request'

// 查询代理商和商家列表
export function getList() {
  return request({
    url: '/rest/analysis/agentAndMerchant',
    method: 'get'
  })
}
